import { toast } from 'react-hot-toast';
import useRequest from '../hooks/use-requests';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Patient, Appointment } from '../interfaces';

export const usePatients = ( id?: string ) => {
	const request = useRequest();
	const queryClient = useQueryClient();
	const handleError = ( error: unknown ) => console.error( 'An error occurred:', error );

	const { data: allPatients, isLoading: isLoadingAllPatients } = useQuery<Patient[]>( {
		queryKey: ['patients'],
		queryFn: () => request.get( '/patients' ).then( ( res ) => res.data?.data ),
	} );

	const { data: patientAppointments, isLoading: isLoadingAppointments } = useQuery<Appointment[]>(
		{
			queryKey: ['patientAppointments', id],
			queryFn: () =>
				request.get( `/patients/${id}/appointments` ).then( ( res ) => res.data?.data ),
			enabled: !!id,
		}
	);

	const { data: patient, isLoading: isLoadingPatient } = useQuery<Patient>( {
		queryKey: ['patient', id],
		queryFn: () => request.get( `/patients/${id}` ).then( ( res ) => res.data?.data ),
		enabled: !!id,
	} );

	const banPatientMutation = useMutation( {
		mutationFn: () => request.patch( `/admin/patients/${id}/ban` ),
		onSuccess: ( data ) => {
			queryClient.setQueryData( ['patient', id], data.data?.data );
			toast.success( 'Patient account banned successfully' );
		},
		onError: handleError,
	} );

	const verifyPatientMutation = useMutation( {
		mutationFn: () => request.patch( `/admin/patients/${id}/verify` ),
		onSuccess: ( data ) => {
			queryClient.setQueryData( ['patient', id], data.data?.data );
			toast.success( 'Patient account verified successfully' );
		},
		onError: handleError,
	} );

	return {
		allPatients,
		patientAppointments,
		patient,
		isLoadingAllPatients,
		isLoadingAppointments,
		isLoadingPatient,
		getIndividualPatient: () => queryClient.invalidateQueries( { queryKey: ['patient', id] } ),
		banPatientAccount: () => banPatientMutation.mutate(),
		verifyPatientAccount: () => verifyPatientMutation.mutate(),
		getPatientAppointments: () =>
			queryClient.invalidateQueries( { queryKey: ['patientAppointments', id] } ),
		getAllPatients: () => queryClient.invalidateQueries( { queryKey: ['patients'] } ),
	};
};
