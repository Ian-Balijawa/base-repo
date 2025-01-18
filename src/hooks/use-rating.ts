import { toast } from 'react-hot-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useRequest from './use-requests';
import { Rating } from '../interfaces';

export const useRatings = ( id?: string ) => {
	const request = useRequest();
	const queryClient = useQueryClient();
	const handleError = ( error: unknown ) => console.error( 'An error occurred:', error );

	const { data: allRatings, isLoading: isLoadingAllRatings } = useQuery<Rating[]>( {
		queryKey: ['ratings'],
		queryFn: () => request.get( '/ratings' ).then( ( res ) => res.data?.data ),
	} );

	const { data: caregiverRatings, isLoading: isLoadingCaregiverRatings } = useQuery<Rating[]>( {
		queryKey: ['caregiverRatings', id],
		queryFn: () => request.get( `/ratings/${id}/caregiver` ).then( ( res ) => res.data?.data ),
		enabled: !!id,
	} );

	const { data: rating, isLoading: isLoadingRating } = useQuery<Rating>( {
		queryKey: ['rating', id],
		queryFn: () => request.get( `/ratings/${id}` ).then( ( res ) => res.data?.data ),
		enabled: !!id,
	} );

	const deleteRatingMutation = useMutation( {
		mutationFn: ( ratingId: string ) => request.delete( `/ratings/${ratingId}/delete` ),
		onSuccess: ( _data, variables ) => {
			queryClient.setQueryData<Rating[]>( ['caregiverRatings', id], ( old ) =>
				old?.filter( ( rating ) => rating.id !== variables )
			);
			toast.success( 'Rating deleted successfully' );
		},
		onError: handleError,
	} );

	const postRatingMutation = useMutation( {
		mutationFn: () => request.patch( `/ratings/${id}/verify` ),
		onSuccess: ( data ) => {
			queryClient.setQueryData( ['rating', id], data.data?.data );
			toast.success( 'Rating posted successfully' );
		},
		onError: handleError,
	} );

	return {
		allRatings,
		caregiverRatings,
		rating,
		isLoadingAllRatings,
		isLoadingCaregiverRatings,
		isLoadingRating,
		getAllRatings: () => queryClient.invalidateQueries( { queryKey: ['ratings'] } ),
		getCaregiverRatings: () =>
			queryClient.invalidateQueries( { queryKey: ['caregiverRatings', id] } ),
		getIndividualRating: () => queryClient.invalidateQueries( { queryKey: ['rating', id] } ),
		deleteRating: ( ratingId: string ) => deleteRatingMutation.mutate( ratingId ),
		postRating: () => postRatingMutation.mutate(),
	};
};
