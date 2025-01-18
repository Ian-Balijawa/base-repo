import { useNavigate } from "react-router-dom";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { useAdmins } from "@/hooks/use-admins";
import { Badge } from "@/components/ui/badge";
import { FaPlus } from "react-icons/fa";
import { type ColumnDef } from "@tanstack/react-table";
import { Admin } from "@/interfaces";

export default function AdminsList() {
	const navigate = useNavigate();
	const { allAdmins, isLoadingAllAdmins } = useAdmins();

	const columns: ColumnDef<Admin>[] = [
		{
			accessorKey: "name",
			header: "Name",
			cell: ({ row }) => (
				<div>
					{row.original.firstName} {row.original.lastName}
				</div>
			),
		},
		{
			accessorKey: "status",
			header: "Status",
			cell: ({ row }) => (
				<Badge
					variant={
						row.original.isBanned
							? "destructive"
							: row.original.isEmailVerified
							? "secondary"
							: "outline"
					}
				>
					{row.original.isBanned
						? "Banned"
						: row.original.isEmailVerified
						? "Verified"
						: "Pending"}
				</Badge>
			),
		},
		{
			id: "actions",
			cell: ({ row }) => (
				<Button variant="ghost" onClick={() => navigate(`/admins/${row.original.id}`)}>
					View Details
				</Button>
			),
		},
	];

	return (
		<div className="p-6">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-3xl font-bold">Administrators</h1>
				<Button onClick={() => navigate("/admins/new")}>
					<FaPlus className="mr-2 h-4 w-4" /> Add Admin
				</Button>
			</div>

			<DataTable
				columns={columns}
				data={allAdmins || []}
				isLoading={isLoadingAllAdmins}
				enableSelection
			/>
		</div>
	);
}
