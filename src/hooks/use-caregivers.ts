import { toast } from 'react-hot-toast';
import useRequest from '../hooks/use-requests';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Caregiver, Appointment } from '../interfaces';

export const useCaregivers = ( id?: string ) => {
	const request = useRequest();
	const queryClient = useQueryClient();
	const handleError = ( error: unknown ) => toast.error( 'An error occurred' );

	const { data: allCaregivers, isLoading: isLoadingAllCaregivers } = useQuery<Caregiver[]>( {
		queryKey: ['caregivers'],
		queryFn: () => request.get( '/caregivers' ).then( ( res ) => res.data?.data ),
	} );

	const { data: caregiverAppointments, isLoading: isLoadingCaregiverAppointments } = useQuery<
		Appointment[]
	>( {
		queryKey: ['caregiverAppointments', id],
		queryFn: () => request.get( `/caregivers/${id}/appointments` ).then( ( res ) => res.data?.data ),
		enabled: !!id,
	} );

	const { data: caregiver, isLoading: isLoadingCaregiver } = useQuery<Caregiver>( {
		queryKey: ['caregiver', id],
		queryFn: () => request.get( `/caregivers/${id}` ).then( ( res ) => res.data?.data ),
		enabled: !!id,
	} );

	const banCaregiverMutation = useMutation( {
		mutationFn: () => request.patch( `/admin/caregivers/${id}/ban` ),
		onSuccess: ( response ) => {
			queryClient.setQueryData( ['caregiver', id], response.data?.data );
			toast.success( response.data.message );
		},
		onError: handleError,
	} );

	const verifyCaregiverMutation = useMutation( {
		mutationFn: () => request.patch( `/admin/caregivers/${id}/verify` ),
		onSuccess: ( response ) => {
			queryClient.setQueryData( ['caregiver', id], response.data?.data );
			toast.success( response.data.message );
		},
		onError: handleError,
	} );

	return {
		allCaregivers,
		caregiverAppointments,
		caregiver,
		isLoadingAllCaregivers,
		isLoadingCaregiverAppointments,
		isLoadingCaregiver,
		getIndividualCaregiver: () => queryClient.invalidateQueries( { queryKey: ['caregiver', id] } ),
		banCaregiverAccount: () => banCaregiverMutation.mutate(),
		verifyCaregiverAccount: () => verifyCaregiverMutation.mutate(),
		getCaregiverAppointments: () =>
			queryClient.invalidateQueries( { queryKey: ['caregiverAppointments', id] } ),
		getAllCaregivers: () => queryClient.invalidateQueries( { queryKey: ['caregivers'] } ),
	};
};
