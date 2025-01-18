import { useParams, useNavigate } from "react-router-dom";
import { useAppointments } from "@/hooks/use-appointments";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FaSpinner, FaCheck, FaBan, FaExternalLinkAlt } from "react-icons/fa";
import { toast } from "sonner";
import { format } from "date-fns";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { LocationInfo } from "@/components/location-info";

export default function AppointmentDetails() {
	const { id } = useParams();
	const navigate = useNavigate();
	const { appointment, isLoadingAppointment, confirmAppointment, cancelAppointment } =
		useAppointments(id);

	if (isLoadingAppointment) {
		return (
			<div className="flex items-center justify-center h-screen">
				<FaSpinner className="h-8 w-8 animate-spin" />
			</div>
		);
	}

	if (!appointment) {
		return (
			<div className="p-6">
				<h1 className="text-2xl font-bold">Appointment not found</h1>
			</div>
		);
	}

	const handleConfirm = async () => {
		try {
			await confirmAppointment();
			toast.success("Appointment confirmed successfully");
		} catch (error) {
			toast.error("Failed to confirm appointment");
		}
	};

	const handleCancel = async () => {
		try {
			await cancelAppointment();
			toast.success("Appointment cancelled successfully");
		} catch (error) {
			toast.error("Failed to cancel appointment");
		}
	};

	return (
		<div className="p-6">
			<div className="flex justify-between items-center mb-6">
				<div>
					<h1 className="text-3xl font-bold">Appointment Details</h1>
					<p className="text-muted-foreground">
						{format(new Date(appointment.date), "PPP")}
					</p>
				</div>
				{appointment.status.toLowerCase() === "pending" && (
					<div className="space-x-2">
						<Button onClick={handleConfirm}>
							<FaCheck className="mr-2 h-4 w-4" />
							Confirm
						</Button>
						<Button variant="destructive" onClick={handleCancel}>
							<FaBan className="mr-2 h-4 w-4" />
							Cancel
						</Button>
					</div>
				)}
			</div>

			<div className="grid gap-6 md:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle>Patient Information</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex items-center justify-between mb-4">
							<div className="flex items-center gap-4">
								<Avatar>
									<AvatarFallback>
										{appointment.patient.firstName[0]}
										{appointment.patient.lastName[0]}
									</AvatarFallback>
								</Avatar>
								<div>
									<p className="font-medium">
										{appointment.patient.firstName}{" "}
										{appointment.patient.lastName}
									</p>
									<p className="text-sm text-muted-foreground">Patient</p>
								</div>
							</div>
							<Button
								variant="ghost"
								size="sm"
								onClick={() => navigate(`/patients/${appointment.patient.id}`)}
							>
								<FaExternalLinkAlt className="h-4 w-4" />
								<span className="sr-only">View Patient Details</span>
							</Button>
						</div>
						<dl className="space-y-2">
							<div>
								<dt className="text-sm font-medium text-muted-foreground">Phone</dt>
								<dd>{appointment.patient.phone}</dd>
							</div>
							<LocationInfo location={appointment.patient.location} />
						</dl>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Caregiver Information</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex items-center justify-between mb-4">
							<div className="flex items-center gap-4">
								<Avatar>
									<AvatarImage
										src={appointment.caregiver.imgUrl}
										alt={appointment.caregiver.firstName}
									/>
									<AvatarFallback>
										{appointment.caregiver.firstName[0]}
										{appointment.caregiver.lastName[0]}
									</AvatarFallback>
								</Avatar>
								<div>
									<p className="font-medium">
										{appointment.caregiver.firstName}{" "}
										{appointment.caregiver.lastName}
									</p>
									<p className="text-sm text-muted-foreground">Caregiver</p>
								</div>
							</div>
							<Button
								variant="ghost"
								size="sm"
								onClick={() => navigate(`/caregivers/${appointment.caregiver.id}`)}
							>
								<FaExternalLinkAlt className="h-4 w-4" />
								<span className="sr-only">View Caregiver Details</span>
							</Button>
						</div>
						<dl className="space-y-2">
							<div>
								<dt className="text-sm font-medium text-muted-foreground">Phone</dt>
								<dd>{appointment.caregiver.phone}</dd>
							</div>
							<LocationInfo location={appointment.caregiver.location} />
						</dl>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Appointment Details</CardTitle>
					</CardHeader>
					<CardContent>
						<dl className="space-y-4">
							<div>
								<dt className="text-sm font-medium text-muted-foreground">
									Status
								</dt>
								<dd>
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
								</dd>
							</div>
							<div>
								<dt className="text-sm font-medium text-muted-foreground">
									Symptoms
								</dt>
								<dd>
									{appointment.symptoms.length > 0 ? (
										<div className="flex gap-2 flex-wrap">
											{appointment.symptoms.map((symptom, index) => (
												<Badge key={index} variant="outline">
													{symptom}
												</Badge>
											))}
										</div>
									) : (
										<p className="text-muted-foreground">No symptoms listed</p>
									)}
								</dd>
							</div>
							{appointment.description && (
								<div>
									<dt className="text-sm font-medium text-muted-foreground">
										Description
									</dt>
									<dd>{appointment.description}</dd>
								</div>
							)}
							{appointment.status === "CANCELLED" &&
								appointment.cancellationReason && (
									<div>
										<dt className="text-sm font-medium text-muted-foreground">
											Cancellation Reason
										</dt>
										<dd>{appointment.cancellationReason}</dd>
									</div>
								)}
						</dl>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
