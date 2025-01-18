import useRequest from './use-requests';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Stats } from '../interfaces';

export const useDashboard = () => {
	const queryClient = useQueryClient();
	const request = useRequest();

	const handleError = ( error: unknown ) => console.error( 'An error occurred:', error );

	const { data: fetchedStats, isLoading } = useQuery<Stats>( {
		queryKey: ['dashboardStats'],
		queryFn: () => request.get( '/dashboard' ).then( ( res ) => res.data?.data ),
	} );

	return {
		fetchedStats,
		isLoading,
		getDashboardStats: () => queryClient.invalidateQueries( { queryKey: ['dashboardStats'] } ),
	};
};
