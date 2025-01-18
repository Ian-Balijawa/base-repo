import { useParams } from "react-router-dom";
import { useCaregivers } from "@/hooks/use-caregivers";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FaBan, FaSpinner, FaFilePdf, FaImage, FaUser } from "react-icons/fa";
import { toast } from "sonner";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { LocationInfo } from "@/components/location-info";

function QualificationViewer({ url }: { url: string }) {
	const fileType = url.split(".").pop()?.toLowerCase();
	const isPDF = fileType === "pdf";

	if (isPDF) {
		return (
			<Dialog>
				<DialogTrigger asChild>
					<Button variant="outline" className="w-full">
						<FaFilePdf className="mr-2 h-4 w-4" />
						View Document
					</Button>
				</DialogTrigger>
				<DialogContent className="max-w-4xl h-[80vh]">
					<DialogHeader>
						<DialogTitle>Qualification Document</DialogTitle>
					</DialogHeader>
					<iframe
						src={`${url}#view=FitH`}
						className="w-full h-full rounded-md"
						title="PDF Viewer"
					/>
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" className="w-full">
					<FaImage className="mr-2 h-4 w-4" />
					View Image
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-4xl">
				<DialogHeader>
					<DialogTitle>Qualification Image</DialogTitle>
				</DialogHeader>
				<img
					src={url}
					alt="Qualification"
					className="w-full h-auto rounded-md"
					loading="lazy"
				/>
			</DialogContent>
		</Dialog>
	);
}

export default function CaregiverDetails() {
	const { id } = useParams();
	const { caregiver, isLoadingCaregiver, banCaregiverAccount } = useCaregivers(id);

	if (isLoadingCaregiver) {
		return (
			<div className="flex items-center justify-center h-screen">
				<FaSpinner className="h-8 w-8 animate-spin" />
			</div>
		);
	}

	if (!caregiver) {
		return (
			<div className="p-6">
				<h1 className="text-2xl font-bold">Caregiver not found</h1>
			</div>
		);
	}

	const handleBanAccount = async () => {
		try {
			await banCaregiverAccount();
			toast.success("Caregiver account banned successfully");
		} catch (error) {
			toast.error("Failed to ban caregiver account");
		}
	};

	return (
		<div className="p-6">
			<div className="flex justify-between items-center mb-6">
				<div className="flex items-center gap-4">
					<Avatar className="h-16 w-16">
						<AvatarImage src={caregiver.imgUrl} alt={caregiver.firstName} />
						<AvatarFallback>
							<FaUser className="h-8 w-8" />
						</AvatarFallback>
					</Avatar>
					<div>
						<h1 className="text-3xl font-bold">Caregiver Details</h1>
						<p className="text-muted-foreground">
							{caregiver.firstName} {caregiver.lastName}
						</p>
					</div>
				</div>
				<div className="space-x-2">
					{!caregiver.isBanned && (
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
						<dl className="space-y-4">
							<div>
								<dt className="text-sm font-medium text-muted-foreground">Name</dt>
								<dd>
									{caregiver.firstName} {caregiver.lastName}
								</dd>
							</div>
							<div>
								<dt className="text-sm font-medium text-muted-foreground">
									Status
								</dt>
								<dd>
									{caregiver.isBanned ? (
										<Badge variant="destructive">Banned</Badge>
									) : caregiver.isVerified ? (
										<Badge variant="default">Verified</Badge>
									) : (
										<Badge variant="secondary">
											{caregiver.verificationStatus}
										</Badge>
									)}
								</dd>
							</div>
							<div>
								<dt className="text-sm font-medium text-muted-foreground">Phone</dt>
								<dd className="flex items-center gap-2">
									{caregiver.phone}
									{caregiver.isPhoneVerified && (
										<Badge variant="secondary">Verified</Badge>
									)}
								</dd>
							</div>
							<div>
								<dt className="text-sm font-medium text-muted-foreground">
									Account Status
								</dt>
								<dd>
									<Badge variant={caregiver.isActive ? "default" : "secondary"}>
										{caregiver.isActive ? "Active" : "Inactive"}
									</Badge>
								</dd>
							</div>
							<LocationInfo location={caregiver.location} />
						</dl>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Qualifications</CardTitle>
					</CardHeader>
					<CardContent>
						{caregiver.qualifications && caregiver.qualifications.length > 0 ? (
							<div className="grid gap-4 md:grid-cols-2">
								{caregiver.qualifications.map((url, index) => (
									<QualificationViewer key={index} url={url} />
								))}
							</div>
						) : (
							<p className="text-muted-foreground text-center py-4">
								No qualifications uploaded
							</p>
						)}
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Additional Information</CardTitle>
					</CardHeader>
					<CardContent>
						<dl className="space-y-4">
							<div>
								<dt className="text-sm font-medium text-muted-foreground">
									Joined Date
								</dt>
								<dd>{new Date(caregiver.createdAt).toLocaleDateString()}</dd>
							</div>
							<div>
								<dt className="text-sm font-medium text-muted-foreground">
									Last Updated
								</dt>
								<dd>{new Date(caregiver.updatedAt).toLocaleDateString()}</dd>
							</div>
						</dl>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
