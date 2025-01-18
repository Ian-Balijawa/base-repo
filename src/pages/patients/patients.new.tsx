import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { FaSpinner } from "react-icons/fa";

export default function PatientsNew() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		firstName: "",
		lastName: "",
		password: "",
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			// TODO: Implement patient creation logic
			toast.success("Patient created successfully");
			navigate("/patients");
		} catch (error) {
			toast.error("Failed to create patient");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="p-6">
			<div className="container-fluid">
				<Card>
					<CardHeader>
						<CardTitle>Add New Patient</CardTitle>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmit} className="space-y-4">
							<div className="grid gap-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									value={formData.email}
									onChange={(e) =>
										setFormData((prev) => ({
											...prev,
											email: e.target.value,
										}))
									}
									required
								/>
							</div>

							<div className="grid gap-2">
								<Label htmlFor="firstName">First Name</Label>
								<Input
									id="firstName"
									type="text"
									value={formData.firstName}
									onChange={(e) =>
										setFormData((prev) => ({
											...prev,
											firstName: e.target.value,
										}))
									}
									required
								/>
							</div>

							<div className="grid gap-2">
								<Label htmlFor="lastName">Last Name</Label>
								<Input
									id="lastName"
									type="text"
									value={formData.lastName}
									onChange={(e) =>
										setFormData((prev) => ({
											...prev,
											lastName: e.target.value,
										}))
									}
									required
								/>
							</div>

							<div className="grid gap-2">
								<Label htmlFor="password">Password</Label>
								<Input
									id="password"
									type="password"
									value={formData.password}
									onChange={(e) =>
										setFormData((prev) => ({
											...prev,
											password: e.target.value,
										}))
									}
									required
								/>
							</div>

							<div className="flex justify-end space-x-2">
								<Button
									type="button"
									variant="outline"
									onClick={() => navigate("/patients")}
								>
									Cancel
								</Button>
								<Button type="submit" disabled={isLoading}>
									{isLoading ? (
										<>
											<FaSpinner className="mr-2 h-4 w-4 animate-spin" />
											Creating...
										</>
									) : (
										"Create Patient"
									)}
								</Button>
							</div>
						</form>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
