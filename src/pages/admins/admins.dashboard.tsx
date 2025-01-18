import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdmins } from "@/hooks/use-admins";
import { FaUserShield, FaCalendarCheck, FaUserCheck, FaBan } from "react-icons/fa";

export default function AdminsDashboard() {
	const { allAdmins } = useAdmins();

	const stats = {
		total: allAdmins?.length || 0,
		active: allAdmins?.filter((a) => !a.isBanned).length || 0,
		verified: allAdmins?.filter((a) => a.isEmailVerified).length || 0,
		banned: allAdmins?.filter((a) => a.isBanned).length || 0,
	};

	return (
		<div className="p-6">
			<h1 className="text-3xl font-bold mb-6">Administrators Overview</h1>
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
						<CardTitle className="text-sm font-medium">Total Admins</CardTitle>
						<FaUserShield className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{stats.total}</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
						<CardTitle className="text-sm font-medium">Active Admins</CardTitle>
						<FaCalendarCheck className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{stats.active}</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
						<CardTitle className="text-sm font-medium">Verified Admins</CardTitle>
						<FaUserCheck className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{stats.verified}</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
						<CardTitle className="text-sm font-medium">Banned Admins</CardTitle>
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
