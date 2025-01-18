import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { FaSpinner } from "react-icons/fa";
import { useAuth } from "@/hooks/useAuth";

interface FormData {
	email: string;
	firstName: string;
	lastName: string;
	password: string;
	designation: string;
}

export default function AdminsNew() {
	const navigate = useNavigate();
	const { signUp, error, isLoadingSignUp } = useAuth();
	const [formData, setFormData] = useState<FormData>({
		email: "",
		firstName: "",
		lastName: "",
		password: "",
		designation: "ADMIN",
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		try {
			signUp(formData);
			if (error) {
				toast.error("Failed to create administrator", {
					description: JSON.stringify(error),
				});
				return;
			}
			navigate("/admins/list");
		} catch (error) {
			toast.error("Failed to create administrator", {
				description:
					error instanceof Error ? error.message : "An unexpected error occurred",
			});
		}
	};

	return (
		<div className="p-6">
			<div className="container-fluid">
				<Card>
					<CardHeader>
						<CardTitle>Add New Administrator</CardTitle>
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
									placeholder="admin@example.com"
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
									placeholder="John"
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
									placeholder="Doe"
									required
								/>
							</div>

							<div className="grid gap-2">
								<Label htmlFor="designation">Designation</Label>
								<Select
									value={formData.designation}
									onValueChange={(value) =>
										setFormData((prev) => ({
											...prev,
											designation: value,
										}))
									}
								>
									<SelectTrigger>
										<SelectValue placeholder="Select designation" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="ADMIN">Administrator</SelectItem>
										<SelectItem value="SUPER_ADMIN">
											Super Administrator
										</SelectItem>
									</SelectContent>
								</Select>
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
									placeholder="••••••••"
									required
									minLength={8}
								/>
							</div>

							<div className="flex justify-end space-x-2">
								<Button
									type="button"
									variant="outline"
									onClick={() => navigate("/admins/list")}
								>
									Cancel
								</Button>
								<Button type="submit" disabled={isLoadingSignUp}>
									{isLoadingSignUp ? (
										<>
											<FaSpinner className="mr-2 h-4 w-4 animate-spin" />
											Creating...
										</>
									) : (
										"Create Administrator"
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
