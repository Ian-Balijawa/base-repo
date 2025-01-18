import { useParams } from "react-router-dom";
import { usePatients } from "@/hooks/use-patients";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { FaUserCheck, FaBan, FaSpinner } from "react-icons/fa";
import { toast } from "sonner";

export default function PatientDetails() {
	const { id } = useParams();
	const {
		patient,
		patientAppointments,
		isLoadingPatient,
		banPatientAccount,
		verifyPatientAccount,
	} = usePatients(id);

	if (isLoadingPatient) {
		return (
			<div className="flex items-center justify-center h-screen">
				<FaSpinner className="h-8 w-8 animate-spin" />
			</div>
		);
	}

	if (!patient) {
		return (
			<div className="p-6">
				<h1 className="text-2xl font-bold">Patient not found</h1>
			</div>
		);
	}

	const handleBanAccount = async () => {
		try {
			await banPatientAccount();
			toast.success("Patient account banned successfully");
		} catch (error) {
			toast.error("Failed to ban patient account");
		}
	};

	const handleVerifyAccount = async () => {
		try {
			await verifyPatientAccount();
			toast.success("Patient account verified successfully");
		} catch (error) {
			toast.error("Failed to verify patient account");
		}
	};

	return (
		<div className="p-6">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-3xl font-bold">Patient Details</h1>
				<div className="space-x-2">
					{!patient.isVerified && (
						<Button onClick={handleVerifyAccount}>
							<FaUserCheck className="mr-2 h-4 w-4" />
							Verify Account
						</Button>
					)}
					{!patient.isBanned && (
						<Button variant="destructive" onClick={handleBanAccount}>
							<FaBan className="mr-2 h-4 w-4" />
							Ban Account
						</Button>
					)}
				</div>
			</div>

			<div className="grid gap-6 md:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle>Personal Information</CardTitle>
					</CardHeader>
					<CardContent>
						<dl className="space-y-2">
							<div>
								<dt className="text-sm font-medium text-muted-foreground">Name</dt>
								<dd>
									{patient.firstName} {patient.lastName}
								</dd>
							</div>
							<div>
								<dt className="text-sm font-medium text-muted-foreground">
									Status
								</dt>
								<dd>
									{patient.isBanned ? (
										<Badge variant="destructive">Banned</Badge>
									) : patient.isVerified ? (
										<Badge variant="default">Verified</Badge>
									) : (
										<Badge variant="secondary">Pending</Badge>
									)}
								</dd>
							</div>
						</dl>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Appointments</CardTitle>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Date</TableHead>
									<TableHead>Status</TableHead>
									<TableHead>Caregiver</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{patientAppointments?.length === 0 ? (
									<TableRow>
										<TableCell colSpan={3} className="text-center">
											No appointments found
										</TableCell>
									</TableRow>
								) : (
									patientAppointments?.map((appointment) => (
										<TableRow key={appointment.id}>
											<TableCell>
												{format(new Date(appointment.date), "MMM dd, yyyy")}
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
											<TableCell>
												{appointment.caregiver.firstName}{" "}
												{appointment.caregiver.lastName}
											</TableCell>
										</TableRow>
									))
								)}
							</TableBody>
						</Table>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
