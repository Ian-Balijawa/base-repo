import { toast } from 'react-hot-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useRequest from '../hooks/use-requests';
import { Appointment } from '../interfaces';

export const useAppointments = ( id?: string ) => {
	const request = useRequest();
	const queryClient = useQueryClient();
	const handleError = ( error: unknown ) => toast.error( 'An error occurred' );

	const { data: allAppointments, isLoading: isLoadingAllAppointments } = useQuery<Appointment[]>( {
		queryKey: ['appointments'],
		queryFn: () => request.get( '/appointments' ).then( ( res ) => res.data?.data ),
	} );

	const { data: appointment, isLoading: isLoadingAppointment } = useQuery<Appointment>( {
		queryKey: ['appointment', id],
		queryFn: () => request.get( `/appointments/${id}` ).then( ( res ) => res.data?.data ),
		enabled: !!id,
	} );

	const confirmAppointmentMutation = useMutation( {
		mutationFn: () => request.patch( `/appointments/${id}/confirm` ),
		onSuccess: ( data ) => {
			queryClient.setQueryData( ['appointment', id], data.data?.data );
			toast.success( 'Appointment confirmed successfully' );
		},
		onError: handleError,
	} );

	const cancelAppointmentMutation = useMutation( {
		mutationFn: () => request.patch( `/appointments/${id}/cancel` ),
		onSuccess: ( data ) => {
			queryClient.setQueryData( ['appointment', id], data.data?.data );
			toast.success( 'Appointment cancelled successfully' );
		},
		onError: handleError,
	} );

	return {
		allAppointments,
		appointment,
		isLoadingAllAppointments,
		isLoadingAppointment,
		getAllAppointments: () => queryClient.invalidateQueries( { queryKey: ['appointments'] } ),
		getIndividualappointment: () => queryClient.invalidateQueries( { queryKey: ['appointment', id] } ),
		confirmAppointment: () => confirmAppointmentMutation.mutate(),
		cancelAppointment: () => cancelAppointmentMutation.mutate(),
	};
};
