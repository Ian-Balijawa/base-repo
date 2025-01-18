import { useRoutes } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { ProtectedRoute } from "@/components/auth/protected-route";
import Signin from "@/pages/Signin";
import CreateAccount from "@/pages/CreateAccount";
import GetOTP from "@/pages/GetOtp";
import Unauthorized from "@/pages/unauthorized";
import NotFound from "@/pages/NotFound";
import Dashboard from "@/pages/Dashboard";
import PatientsDashboard from "@/pages/patients/patients.dashboard";
import PatientsDetails from "@/pages/patients/patients.details";
import PatientsList from "@/pages/patients/patients.list";
import PatientsNew from "@/pages/patients/patients.new";
import CaregiversDashboard from "@/pages/caregivers/caregivers.dashboard";
import CaregiversDetails from "@/pages/caregivers/caregivers.details";
import CaregiversList from "@/pages/caregivers/caregivers.list";
import CaregiversNew from "@/pages/caregivers/caregivers.new";
import AdminsDashboard from "@/pages/admins/admins.dashboard";
import AdminsDetails from "@/pages/admins/admins.details";
import AdminsList from "@/pages/admins/admins.list";
import AdminsNew from "@/pages/admins/admins.new";
import AppointmentsDashboard from "@/pages/appointments/appointments.dashboard";
import AppointmentsDetails from "@/pages/appointments/appointments.details";
import AppointmentsList from "@/pages/appointments/appointments.list";

export function AppRoutes() {
	const routes = useRoutes([
		{
			path: "/auth",
			children: [
				{
					path: "signin",
					element: <Signin />,
				},
				{
					path: "login",
					element: <Signin />,
				},
				{
					path: "signup",
					element: <CreateAccount />,
				},
				{
					path: "verify-email",
					element: <GetOTP />,
				},
			],
		},
		{
			path: "/",
			element: (
				<ProtectedRoute>
					<AppLayout />
				</ProtectedRoute>
			),
			children: [
				{
					index: true,
					element: <Dashboard />,
				},
				{
					path: "patients",
					children: [
						{ index: true, element: <PatientsDashboard /> },
						{ path: "list", element: <PatientsList /> },
						{ path: "new", element: <PatientsNew /> },
						{ path: ":id", element: <PatientsDetails /> },
					],
				},
				{
					path: "caregivers",
					children: [
						{ index: true, element: <CaregiversDashboard /> },
						{ path: "list", element: <CaregiversList /> },
						{ path: "new", element: <CaregiversNew /> },
						{ path: ":id", element: <CaregiversDetails /> },
					],
				},
				{
					path: "admins",
					children: [
						{ index: true, element: <AdminsDashboard /> },
						{ path: "list", element: <AdminsList /> },
						{ path: "new", element: <AdminsNew /> },
						{ path: ":id", element: <AdminsDetails /> },
					],
				},
				{
					path: "appointments",
					children: [
						{ index: true, element: <AppointmentsDashboard /> },
						{ path: "list", element: <AppointmentsList /> },
						{ path: ":id", element: <AppointmentsDetails /> },
					],
				},
				{
					path: "unauthorized",
					element: <Unauthorized />,
				},
				{
					path: "*",
					element: <NotFound />,
				},
			],
		},
	]);

	return routes;
}
