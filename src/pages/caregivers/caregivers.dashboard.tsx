import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCaregivers } from "@/hooks/use-caregivers";
import { FaUserNurse, FaCalendarCheck, FaUserCheck, FaBan } from "react-icons/fa";

export default function CaregiversDashboard() {
	const { allCaregivers } = useCaregivers();

	const stats = {
		total: allCaregivers?.length || 0,
		active: allCaregivers?.filter((c) => !c.isBanned).length || 0,
		verified: allCaregivers?.filter((c) => c.isVerified).length || 0,
		banned: allCaregivers?.filter((c) => c.isBanned).length || 0,
	};

	return (
		<div className="p-6">
			<h1 className="text-3xl font-bold mb-6">Caregivers Overview</h1>
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
						<CardTitle className="text-sm font-medium">Total Caregivers</CardTitle>
						<FaUserNurse className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{stats.total}</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
						<CardTitle className="text-sm font-medium">Active Caregivers</CardTitle>
						<FaCalendarCheck className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{stats.active}</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
						<CardTitle className="text-sm font-medium">Verified Caregivers</CardTitle>
						<FaUserCheck className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{stats.verified}</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
						<CardTitle className="text-sm font-medium">Banned Caregivers</CardTitle>
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
