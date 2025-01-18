import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";
import { FaLock, FaSpinner, FaUser } from "react-icons/fa";
import { Mail } from "lucide-react";

export default function CreateAccount() {
	const { signUp } = useAuth();
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		firstName: "",
		lastName: "",
		password: "",
		designation: "ADMIN", // Default value
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			await signUp(formData);
		} catch (error: unknown) {
			toast.error("Error creating account", {
				description:
					error instanceof Error ? error.message : "An unexpected error occurred",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 flex items-center justify-center p-4">
			<div className="w-full max-w-md">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="flex flex-col gap-6"
				>
					<div className="text-center mb-4">
						<Link to="/" className="inline-block group">
							<div className="flex justify-center mb-4">
								<div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
									<FaUser className="h-6 w-6 text-white" />
								</div>
							</div>
							<h1 className="text-2xl font-bold text-white mb-2 group-hover:text-white/90">
								Link Bedsides
							</h1>
						</Link>
					</div>

					<Card className="backdrop-blur-sm bg-white/10 border-white/20">
						<CardHeader className="space-y-1 text-white">
							<CardTitle className="text-2xl text-center">
								Create an account
							</CardTitle>
							<CardDescription className="text-center text-white/60">
								Enter your details to get started
							</CardDescription>
						</CardHeader>
						<CardContent>
							<form onSubmit={handleSubmit} className="grid gap-6">
								<div className="grid gap-4">
									<div className="grid gap-2">
										<Label htmlFor="email" className="text-white/80">
											Email
										</Label>
										<div className="relative">
											<Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
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
												className="pl-9 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-white/40"
												placeholder="Enter your email"
												required
											/>
										</div>
									</div>

									<div className="grid gap-2">
										<Label htmlFor="firstName" className="text-white/80">
											First Name
										</Label>
										<div className="relative">
											<FaUser className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
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
												className="pl-9 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-white/40"
												placeholder="Enter your first name"
												required
											/>
										</div>
									</div>

									<div className="grid gap-2">
										<Label htmlFor="lastName" className="text-white/80">
											Last Name
										</Label>
										<div className="relative">
											<FaUser className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
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
												className="pl-9 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-white/40"
												placeholder="Enter your last name"
												required
											/>
										</div>
									</div>

									<div className="grid gap-2">
										<Label htmlFor="password" className="text-white/80">
											Password
										</Label>
										<div className="relative">
											<FaLock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
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
												className="pl-9 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-white/40"
												placeholder="Create a password"
												required
											/>
										</div>
									</div>

									<Button
										type="submit"
										className="w-full bg-white text-primary-900 hover:bg-white/90 transition-colors"
										disabled={isLoading}
									>
										{isLoading ? (
											<FaSpinner className="mr-2 h-4 w-4 animate-spin" />
										) : (
											"Create Account"
										)}
									</Button>
								</div>
							</form>
						</CardContent>
					</Card>

					<div className="text-center text-white/40 text-xs">
						Already have an account?{" "}
						<Link
							to="/auth/signin"
							className="text-white hover:text-white/90 underline underline-offset-4"
						>
							Sign in
						</Link>
					</div>
				</motion.div>
			</div>
		</div>
	);
}
