import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppointments } from "@/hooks/use-appointments";
import { FaCalendarCheck, FaSpinner, FaClock, FaBan } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";

export default function AppointmentsDashboard() {
	const { allAppointments, isLoadingAllAppointments } = useAppointments();

	if (isLoadingAllAppointments) {
		return (
			<div className="flex items-center justify-center h-screen">
				<FaSpinner className="h-8 w-8 animate-spin" />
			</div>
		);
	}

	const stats = {
		total: allAppointments?.length || 0,
		completed: allAppointments?.filter((a) => a.status === "COMPLETED").length || 0,
		pending: allAppointments?.filter((a) => a.status === "PENDING").length || 0,
		cancelled: allAppointments?.filter((a) => a.status === "CANCELLED").length || 0,
	};

	return (
		<div className="p-6">
			<h1 className="text-3xl font-bold mb-6">Appointments Overview</h1>
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
						<CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
						<FaCalendarCheck className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{stats.total}</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
						<CardTitle className="text-sm font-medium">Completed</CardTitle>
						<FaCalendarCheck className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{stats.completed}</div>
						<Badge variant="default" className="mt-2">
							{((stats.completed / stats.total) * 100).toFixed(1)}% Success Rate
						</Badge>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
						<CardTitle className="text-sm font-medium">Pending</CardTitle>
						<FaClock className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{stats.pending}</div>
						<Badge variant="secondary" className="mt-2">
							{((stats.pending / stats.total) * 100).toFixed(1)}% Awaiting
						</Badge>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
						<CardTitle className="text-sm font-medium">Cancelled</CardTitle>
						<FaBan className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{stats.cancelled}</div>
						<Badge variant="destructive" className="mt-2">
							{((stats.cancelled / stats.total) * 100).toFixed(1)}% Cancellation Rate
						</Badge>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
