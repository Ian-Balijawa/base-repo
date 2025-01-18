import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";
import { FaSpinner } from "react-icons/fa";
import { Mail, Send, CheckCircle } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

function GetOTP() {
	const navigate = useNavigate();
	const { verifyOTP, requestOTP, isLoadingVerifyOtp, isLoadingOtpResponse } = useAuth();
	const user = useSelector((state: RootState) => state.auth.user);
	const [otp, setOtp] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!user?.email) return;

		try {
			await verifyOTP({ email: user.email, otp });
		} catch (error: unknown) {
			toast.error("Verification failed", {
				description:
					error instanceof Error ? error.message : "An unexpected error occurred",
			});
		}
	};

	const handleResendEmail = async () => {
		if (!user?.email) return;
		try {
			await requestOTP(user.email);
			toast.success("OTP sent successfully");
		} catch (error: unknown) {
			toast.error("Failed to send OTP", {
				description:
					error instanceof Error ? error.message : "An unexpected error occurred",
			});
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
									<Mail className="h-6 w-6 text-white" />
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
								Verify your email
							</CardTitle>
							<CardDescription className="text-center text-white/60">
								Enter the code sent to your email
							</CardDescription>
							<div className="text-center mt-2">
								<span className="text-white/80">{user?.email}</span>
							</div>
						</CardHeader>
						<CardContent>
							<form onSubmit={handleSubmit} className="grid gap-6">
								<div className="grid gap-4">
									<div className="flex justify-center">
										<div className="flex gap-2">
											{Array.from({ length: 6 }).map((_, index) => (
												<input
													key={index}
													type="text"
													maxLength={1}
													className="w-12 h-12 text-center text-white bg-white/10 border border-white/20 rounded focus:border-white/40 focus:outline-none"
													value={otp[index] || ""}
													onChange={(e) => {
														const newOtp =
															otp.slice(0, index) +
															e.target.value +
															otp.slice(index + 1);
														setOtp(newOtp);

														// Auto-focus next input
														if (e.target.value && index < 5) {
															const input =
																e.target as HTMLInputElement;
															const nextInput = input.parentElement
																?.children[
																index + 1
															] as HTMLInputElement;
															nextInput?.focus();
														}
													}}
													onKeyDown={(e) => {
														// Handle backspace
														if (
															e.key === "Backspace" &&
															!otp[index] &&
															index > 0
														) {
															const input =
																e.target as HTMLInputElement;
															const prevInput = input.parentElement
																?.children[
																index - 1
															] as HTMLInputElement;
															prevInput?.focus();
														}
													}}
												/>
											))}
										</div>
									</div>

									<div className="flex gap-2">
										<Button
											type="button"
											variant="outline"
											className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20 transition-colors"
											onClick={handleResendEmail}
											disabled={isLoadingOtpResponse}
										>
											{isLoadingOtpResponse ? (
												<FaSpinner className="mr-2 h-4 w-4 animate-spin" />
											) : (
												<>
													<Send className="mr-2 h-4 w-4" />
													Resend Code
												</>
											)}
										</Button>

										<Button
											type="submit"
											className="flex-1 bg-white text-primary-900 hover:bg-white/90 transition-colors"
											disabled={isLoadingVerifyOtp || otp.length !== 6}
										>
											{isLoadingVerifyOtp ? (
												<FaSpinner className="mr-2 h-4 w-4 animate-spin" />
											) : (
												<>
													<CheckCircle className="mr-2 h-4 w-4" />
													Verify
												</>
											)}
										</Button>
									</div>
								</div>
							</form>
						</CardContent>
					</Card>

					<div className="text-center text-white/40 text-xs">
						<Link
							to="/auth/signin"
							className="text-white hover:text-white/90 underline underline-offset-4"
						>
							Back to Sign In
						</Link>
					</div>
				</motion.div>
			</div>
		</div>
	);
}

export default GetOTP;
