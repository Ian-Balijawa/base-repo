import axios, { AxiosInstance, AxiosError } from 'axios';
import { __prod__ } from '@/utils/__prod__';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import toast from 'react-hot-toast';
import { signout } from '@/app/slices/auth';

const BASE_URL = __prod__
	? import.meta.env.VITE_APP_BASE_URL_PROD
	: import.meta.env.VITE_APP_BASE_URL_DEV;

export default function useRequest( _requireAuth: boolean = false ): AxiosInstance {
	const accessToken = useSelector( ( state: RootState ) => state.auth.accessToken );

	const dispatch = useDispatch();

	const instance = axios.create( {
		baseURL: BASE_URL,
		headers: { Authorization: `Bearer ${accessToken}` },
	} );

	instance.interceptors.response.use(
		( response ) => {
			if ( Array.isArray( response.data ) ) {
				return response;
			}

			if ( !response.data.message ) {
				return response;
			}

			toast.success(
				typeof response?.data?.message === 'object' ? 'Success' : response.data.message
			);
			return response;
		},
		( error: AxiosError ) => {
			// @ts-ignore
			toast.error( error.response.data?.message || 'Operation failed' );

			// @ts-ignore
			if ( error.response?.data.message === 'Invalid token' ) {
				dispatch( signout() );
			}
			return Promise.reject( error );
		}
	);

	return instance;
}
