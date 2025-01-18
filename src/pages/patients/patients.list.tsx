import { useNavigate } from "react-router-dom";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { usePatients } from "@/hooks/use-patients";
import { Badge } from "@/components/ui/badge";
import { FaPlus } from "react-icons/fa";
import { type ColumnDef } from "@tanstack/react-table";
import { Patient } from "@/interfaces";

export default function PatientsList() {
	const navigate = useNavigate();
	const { allPatients, isLoadingAllPatients } = usePatients();

	const columns: ColumnDef<Patient>[] = [
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
							: row.original.isVerified
							? "secondary"
							: "outline"
					}
				>
					{row.original.isBanned
						? "Banned"
						: row.original.isVerified
						? "Verified"
						: "Pending"}
				</Badge>
			),
		},
		{
			id: "actions",
			cell: ({ row }) => (
				<Button variant="ghost" onClick={() => navigate(`/patients/${row.original.id}`)}>
					View Details
				</Button>
			),
		},
	];

	return (
		<div className="p-6">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-3xl font-bold">Patients</h1>
				<Button onClick={() => navigate("/patients/new")}>
					<FaPlus className="mr-2 h-4 w-4" /> Add Patient
				</Button>
			</div>

			<DataTable
				columns={columns}
				data={allPatients || []}
				isLoading={isLoadingAllPatients}
				enableSelection
			/>
		</div>
	);
}
