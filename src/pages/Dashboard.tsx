import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePatients } from "@/hooks/use-patients";
import { useCaregivers } from "@/hooks/use-caregivers";
import { useAdmins } from "@/hooks/use-admins";
import { useAppointments } from "@/hooks/use-appointments";
import { useDashboard } from "@/hooks/use-dashboard";
import {
	FaUserInjured,
	FaUserNurse,
	FaUserShield,
	FaCalendarCheck,
	FaSpinner,
	FaBan,
	FaUserCheck,
	FaChartLine,
} from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

export default function Dashboard() {
	const { allPatients, isLoadingAllPatients } = usePatients();
	const { allCaregivers, isLoadingAllCaregivers } = useCaregivers();
	const { allAdmins, isLoadingAllAdmins } = useAdmins();
	const { allAppointments, isLoadingAllAppointments } = useAppointments();
	const { fetchedStats, isLoading } = useDashboard();

	if (
		isLoadingAllPatients ||
		isLoadingAllCaregivers ||
		isLoadingAllAdmins ||
		isLoadingAllAppointments ||
		isLoading
	) {
		return (
			<div className="flex items-center justify-center h-screen">
				<FaSpinner className="h-8 w-8 animate-spin" />
			</div>
		);
	}

	const patientStats = {
		total: allPatients?.length || 0,
		active: allPatients?.filter((p) => !p.isBanned).length || 0,
		verified: allPatients?.filter((p) => p.isVerified).length || 0,
	};

	const caregiverStats = {
		total: allCaregivers?.length || 0,
		active: allCaregivers?.filter((c) => !c.isBanned).length || 0,
		verified: allCaregivers?.filter((c) => c.isVerified).length || 0,
	};

	const adminStats = {
		total: allAdmins?.length || 0,
		active: allAdmins?.filter((a) => !a.isBanned).length || 0,
		verified: allAdmins?.filter((a) => a.isEmailVerified).length || 0,
	};

	return (
		<div className="p-6">
			<h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

			{/* Main Stats */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
						<CardTitle className="text-sm font-medium">Total Patients</CardTitle>
						<FaUserInjured className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{patientStats.total}</div>
						<div className="flex gap-2 mt-2">
							<Badge variant="secondary">{patientStats.active} Active</Badge>
							<Badge variant="outline">{patientStats.verified} Verified</Badge>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
						<CardTitle className="text-sm font-medium">Total Caregivers</CardTitle>
						<FaUserNurse className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{caregiverStats.total}</div>
						<div className="flex gap-2 mt-2">
							<Badge variant="secondary">{caregiverStats.active} Active</Badge>
							<Badge variant="outline">{caregiverStats.verified} Verified</Badge>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
						<CardTitle className="text-sm font-medium">Total Admins</CardTitle>
						<FaUserShield className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{adminStats.total}</div>
						<div className="flex gap-2 mt-2">
							<Badge variant="secondary">{adminStats.active} Active</Badge>
							<Badge variant="outline">{adminStats.verified} Verified</Badge>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
						<CardTitle className="text-sm font-medium">Appointments</CardTitle>
						<FaCalendarCheck className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{fetchedStats?.appointments || 0}</div>
						<div className="flex gap-2 mt-2">
							<Badge variant="default">
								{allAppointments?.filter((a) => a.status === "COMPLETED").length}{" "}
								Completed
							</Badge>
							<Badge variant="secondary">
								{allAppointments?.filter((a) => a.status === "PENDING").length}{" "}
								Pending
							</Badge>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Recent Activity */}
			<div className="grid gap-4 md:grid-cols-2">
				{/* Recent Appointments */}
				<Card>
					<CardHeader>
						<CardTitle className="text-lg font-medium">Recent Appointments</CardTitle>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Date</TableHead>
									<TableHead>Patient</TableHead>
									<TableHead>Status</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{allAppointments?.slice(0, 5).map((appointment) => (
									<TableRow key={appointment.id}>
										<TableCell>
											{format(new Date(appointment.date), "MMM dd, yyyy")}
										</TableCell>
										<TableCell>
											{appointment.patient.firstName}{" "}
											{appointment.patient.lastName}
										</TableCell>
										<TableCell>
											<Badge
												variant={
													appointment.status === "COMPLETED"
														? "default"
														: appointment.status === "CANCELLED"
														? "destructive"
														: "secondary"
												}
											>
												{appointment.status}
											</Badge>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>

				{/* System Stats */}
				<Card>
					<CardHeader>
						<CardTitle className="text-lg font-medium">System Overview</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<div className="flex items-center">
									<FaUserCheck className="mr-2 h-4 w-4 text-muted-foreground" />
									<span>Verified Users</span>
								</div>
								<span className="font-bold">
									{patientStats.verified + caregiverStats.verified}
								</span>
							</div>
							<div className="flex items-center justify-between">
								<div className="flex items-center">
									<FaBan className="mr-2 h-4 w-4 text-muted-foreground" />
									<span>Banned Users</span>
								</div>
								<span className="font-bold">
									{(allPatients?.filter((p) => p.isBanned).length || 0) +
										(allCaregivers?.filter((c) => c.isBanned).length || 0)}
								</span>
							</div>
							<div className="flex items-center justify-between">
								<div className="flex items-center">
									<FaChartLine className="mr-2 h-4 w-4 text-muted-foreground" />
									<span>Total Users</span>
								</div>
								<span className="font-bold">
									{patientStats.total + caregiverStats.total + adminStats.total}
								</span>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
