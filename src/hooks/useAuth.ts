import { useMutation, useQuery } from '@tanstack/react-query';
import useRequest from './use-requests';
import { useDispatch } from 'react-redux';
import { signin } from '../app/slices/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { AxiosError } from 'axios';
import { useAppSelector } from '@/app/hooks';

interface SignUpData {
	email: string;
	firstName: string;
	lastName: string;
	password: string;
	designation: string;
}

interface SignInData {
	email: string;
	password: string;
}

interface VerifyOTPData {
	email: string;
	otp: string;
}

export const useAuth = () => {
	const request = useRequest();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const user = useAppSelector( ( state ) => state.auth.user );

	const handleError = ( error: unknown ) => {
		if ( error instanceof AxiosError ) {
			toast.error( error.response?.data?.message );
		} else {
			toast.error( 'An unexpected error occurred' );
		}
	};

	const signUpMutation = useMutation( {
		mutationFn: ( data: SignUpData ) =>
			request.post( '/auth/admin/signup', data ),
		onSuccess: ( response ) => {
			dispatch( signin( response.data.data ) );
			navigate( '/' );
			toast.success( 'Account created successfully' );
		},
		onError: handleError,
	} );

	const signInMutation = useMutation( {
		mutationFn: ( data: SignInData ) =>
			request.post( '/auth/admin/signin', data ),
		onSuccess: ( response ) => {
			dispatch( signin( response.data.data ) );
			navigate( '/' );
			toast.success( 'Signed in successfully' );
		},
		onError: handleError,
	} );

	const { data: otpResponse, refetch: requestOtpEmail, isFetching: isLoadingOtpResponse } = useQuery( {
		queryKey: ['email-otp'],
		queryFn: () =>
			request.get( `/mail?email=${user?.email}` ).then( ( res ) => res.data?.data ),
		enabled: false,
		// @ts-ignore
		onError: handleError,
	} );

	const verifyOtpMutation = useMutation( {
		mutationFn: ( data: VerifyOTPData ) =>
			request.post( `/mail/verify?email=${data.email}&otp=${data.otp}` ),
		onSuccess: ( response ) => {
			toast.success( response.data.message );
			dispatch( signin( response.data.data ) );
			navigate( '/' );
		},
		onError: handleError,
	} );

	return {
		otpResponse,
		isLoadingOtpResponse,
		isLoadingSignUp: signUpMutation.isPending,
		isLoadingSignIn: signInMutation.isPending,
		isLoadingVerifyOtp: verifyOtpMutation.isPending,
		error: signUpMutation.error,
		signUp: ( data: SignUpData ) => signUpMutation.mutate( data ),
		signIn: ( data: SignInData ) => signInMutation.mutate( data ),
		requestOTP: ( email: string ) => requestOtpEmail(),
		verifyOTP: ( data: VerifyOTPData ) => verifyOtpMutation.mutate( data ),
	};
};
