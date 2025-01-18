import { toast } from 'react-hot-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useRequest from '../hooks/use-requests';
import { Admin } from '../interfaces';
import { AxiosError } from 'axios';

export const useAdmins = ( id?: string ) => {
	const request = useRequest();
	const queryClient = useQueryClient();
	const handleError = ( error: unknown ) => {
		if ( error instanceof AxiosError ) {
			toast.error( error.response?.data.message );
		} else {
			toast.error( 'An unexpected error occurred' );
		}
	};

	const { data: allAdmins, isLoading: isLoadingAllAdmins } = useQuery<Admin[]>( {
		queryKey: ['admins'],
		queryFn: () => request.get( '/admins' ).then( ( res ) => res.data?.data ),
	} );

	const { data: admin, isLoading: isLoadingAdmin } = useQuery<Admin>( {
		queryKey: ['admin', id],
		queryFn: () => request.get( `/admins/${id}` ).then( ( res ) => res.data?.data ),
		enabled: !!id,
	} );

	const banAdminMutation = useMutation( {
		mutationFn: () => request.patch( `/admins/${id}/ban` ),
		onSuccess: ( response ) => {
			queryClient.setQueryData( ['admin', id], response.data?.data );
			toast.success( response.data.message );
		},
		onError: handleError,
	} );

	return {
		allAdmins,
		admin,
		isLoadingAllAdmins,
		isLoadingAdmin,
		getIndividualAdmin: () => queryClient.invalidateQueries( { queryKey: ['admin', id] } ),
		banAdminAccount: () => banAdminMutation.mutate(),
		getAllAdmins: () => queryClient.invalidateQueries( { queryKey: ['admins'] } ),
	};
};
