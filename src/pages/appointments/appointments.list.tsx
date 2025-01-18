import { useNavigate } from "react-router-dom";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { useAppointments } from "@/hooks/use-appointments";
import { Badge } from "@/components/ui/badge";
import { type ColumnDef } from "@tanstack/react-table";
import { Appointment } from "@/interfaces";
import { format } from "date-fns";

export default function AppointmentsList() {
	const navigate = useNavigate();
	const { allAppointments, isLoadingAllAppointments } = useAppointments();

	const columns: ColumnDef<Appointment>[] = [
		{
			accessorKey: "date",
			header: "Date",
			cell: ({ row }) => format(new Date(row.original.date), "PPP"),
		},
		{
			accessorKey: "patient",
			header: "Patient",
			cell: ({ row }) => (
				<div>
					{row.original.patient.firstName} {row.original.patient.lastName}
				</div>
			),
		},
		{
			accessorKey: "caregiver",
			header: "Caregiver",
			cell: ({ row }) => (
				<div>
					{row.original.caregiver.firstName} {row.original.caregiver.lastName}
				</div>
			),
		},
		{
			accessorKey: "status",
			header: "Status",
			cell: ({ row }) => (
				<Badge
					variant={
						row.original.status === "COMPLETED"
							? "default"
							: row.original.status === "CANCELLED"
							? "destructive"
							: "secondary"
					}
				>
					{row.original.status}
				</Badge>
			),
		},
		{
			id: "actions",
			cell: ({ row }) => (
				<Button
					variant="ghost"
					onClick={() => navigate(`/appointments/${row.original.id}`)}
				>
					View Details
				</Button>
			),
		},
	];

	return (
		<div className="p-6">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-3xl font-bold">Appointments</h1>
			</div>

			<DataTable
				columns={columns}
				data={allAppointments || []}
				isLoading={isLoadingAllAppointments}
				enableSelection
			/>
		</div>
	);
}
