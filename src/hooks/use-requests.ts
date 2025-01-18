import axios from 'axios';
import { useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import { __PROD__ } from '../constants/__PROD__';

export default function useRequest() {
	const accessToken = useAppSelector( ( state: RootState ) => state.auth.accessToken );

	return axios.create( {
		baseURL: __PROD__
			? import.meta.env.VITE_APP_BASE_URL_PROD
			: import.meta.env.VITE_APP_BASE_URL_DEV,
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	} );
}
