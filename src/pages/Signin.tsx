import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";
import { FaLock, FaSpinner } from "react-icons/fa";
import { Mail } from "lucide-react";

export default function Signin() {
	const { signIn } = useAuth();
	const [isLoading, setIsLoading] = useState(false);
	const [credentials, setCredentials] = useState({
		email: "",
		password: "",
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			await signIn(credentials);
		} catch (error: unknown) {
			toast.error("Error signing in", {
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
									<FaLock className="h-6 w-6 text-white" />
								</div>
							</div>
							<h1 className="text-2xl font-bold text-white mb-2 group-hover:text-white/90">
								Link Bedsides
							</h1>
						</Link>
					</div>

					<Card className="backdrop-blur-sm bg-white/10 border-white/20">
						<CardHeader className="space-y-1 text-white">
							<CardTitle className="text-2xl text-center">Welcome back</CardTitle>
							<CardDescription className="text-center text-white/60">
								Sign in to access your account
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
												value={credentials.email}
												onChange={(e) =>
													setCredentials((prev) => ({
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
										<div className="flex items-center justify-between">
											<Label htmlFor="password" className="text-white/80">
												Password
											</Label>
											<Link
												to="/forgot-password"
												className="text-sm text-white/60 hover:text-white"
											>
												Forgot password?
											</Link>
										</div>
										<div className="relative">
											<FaLock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
											<Input
												id="password"
												type="password"
												value={credentials.password}
												onChange={(e) =>
													setCredentials((prev) => ({
														...prev,
														password: e.target.value,
													}))
												}
												className="pl-9 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-white/40"
												placeholder="Enter your password"
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
											"Sign In"
										)}
									</Button>
								</div>
							</form>
						</CardContent>
					</Card>

					<div className="text-center text-white/40 text-xs">
						Don't have an account?{" "}
						<Link
							to="/auth/signup"
							className="text-white hover:text-white/90 underline underline-offset-4"
						>
							Create one
						</Link>
					</div>
				</motion.div>
			</div>
		</div>
	);
}
