import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePatients } from "@/hooks/use-patients";
import { FaUserInjured, FaCalendarCheck, FaUserCheck, FaBan } from "react-icons/fa";

export default function PatientsDashboard() {
	const { allPatients } = usePatients();

	const stats = {
		total: allPatients?.length || 0,
		active: allPatients?.filter((p) => !p.isBanned).length || 0,
		verified: allPatients?.filter((p) => p.isVerified).length || 0,
		banned: allPatients?.filter((p) => p.isBanned).length || 0,
	};

	return (
		<div className="p-6">
			<h1 className="text-3xl font-bold mb-6">Patients Overview</h1>
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
						<CardTitle className="text-sm font-medium">Total Patients</CardTitle>
						<FaUserInjured className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{stats.total}</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
						<CardTitle className="text-sm font-medium">Active Patients</CardTitle>
						<FaCalendarCheck className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{stats.active}</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
						<CardTitle className="text-sm font-medium">Verified Patients</CardTitle>
						<FaUserCheck className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{stats.verified}</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
						<CardTitle className="text-sm font-medium">Banned Patients</CardTitle>
						<FaBan className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{stats.banned}</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
