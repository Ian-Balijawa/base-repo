import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "@/app/hooks";

interface ProtectedRouteProps {
	children: React.ReactNode;
	requiredPermissions?: {
		action: string;
		subject: string;
	}[];
}

export function ProtectedRoute({ children, requiredPermissions = [] }: ProtectedRouteProps) {
	const { user, accessToken } = useAppSelector((state) => state.auth);
	const location = useLocation();

	if (!accessToken || !user) {
		return <Navigate to="/auth/signin" state={{ from: location }} replace />;
	}

	if (!user.isEmailVerified) {
		return <Navigate to="/auth/verify-email" state={{ from: location }} replace />;
	}

	// Simple permission check - you should implement your own logic
	const hasPermission =
		requiredPermissions.length === 0 ||
		requiredPermissions.every(() => {
			// Add your permission check logic here
			// For now, we'll just return true
			return true;
		});

	if (!hasPermission) {
		return <Navigate to="/unauthorized" replace />;
	}

	return <>{children}</>;
}
