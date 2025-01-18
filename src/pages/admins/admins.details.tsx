import { useParams } from "react-router-dom";
import { useAdmins } from "@/hooks/use-admins";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FaBan, FaSpinner } from "react-icons/fa";
import { toast } from "sonner";

export default function AdminDetails() {
	const { id } = useParams();
	const { admin, isLoadingAdmin, banAdminAccount } = useAdmins(id);

	if (isLoadingAdmin) {
		return (
			<div className="flex items-center justify-center h-screen">
				<FaSpinner className="h-8 w-8 animate-spin" />
			</div>
		);
	}

	if (!admin) {
		return (
			<div className="p-6">
				<h1 className="text-2xl font-bold">Administrator not found</h1>
			</div>
		);
	}

	const handleBanAccount = async () => {
		try {
			await banAdminAccount();
			toast.success("Administrator account banned successfully");
		} catch (error) {
			toast.error("Failed to ban administrator account");
		}
	};

	return (
		<div className="p-6">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-3xl font-bold">Administrator Details</h1>
				<div className="space-x-2">
					{!admin.isBanned && (
						<Button variant="destructive" onClick={handleBanAccount}>
							<FaBan className="mr-2 h-4 w-4" />
							Ban Account
						</Button>
					)}
				</div>
			</div>

			<div className="max-w-2xl">
				<Card>
					<CardHeader>
						<CardTitle>Personal Information</CardTitle>
					</CardHeader>
					<CardContent>
						<dl className="space-y-4">
							<div>
								<dt className="text-sm font-medium text-muted-foreground">Name</dt>
								<dd>
									{admin.firstName} {admin.lastName}
								</dd>
							</div>
							<div>
								<dt className="text-sm font-medium text-muted-foreground">Email</dt>
								<dd>{admin.email}</dd>
							</div>
							<div>
								<dt className="text-sm font-medium text-muted-foreground">
									Status
								</dt>
								<dd>
									{admin.isBanned ? (
										<Badge variant="destructive">Banned</Badge>
									) : admin.isEmailVerified ? (
										<Badge variant="default">Verified</Badge>
									) : (
										<Badge variant="secondary">Pending</Badge>
									)}
								</dd>
							</div>
							<div>
								<dt className="text-sm font-medium text-muted-foreground">
									Designation
								</dt>
								<dd className="capitalize">{admin.designation.toLowerCase()}</dd>
							</div>
							<div>
								<dt className="text-sm font-medium text-muted-foreground">
									Joined Date
								</dt>
								<dd>{new Date(admin.createdAt).toLocaleDateString()}</dd>
							</div>
						</dl>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
