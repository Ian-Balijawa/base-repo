import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Lock } from "lucide-react";
import { useState } from "react";

const navItems = [
	{ href: "/", label: "Home" },
	{ href: "/about", label: "About" },
	{ href: "/programs", label: "Programs" },
	{ href: "/coaches", label: "Coaches" },
	{ href: "/facilities", label: "Facilities" },
	{ href: "/registration", label: "Registration" },
	{ href: "/news", label: "News" },
	{ href: "/gallery", label: "Gallery" },
	{ href: "/alumni", label: "Alumni" },
	{ href: "/contact", label: "Contact" },
	{ href: "/faq", label: "FAQ" },
];

export function MobileNav() {
	const [open, setOpen] = useState(false);

	return (
		<div className="md:hidden">
			<Sheet open={open} onOpenChange={setOpen}>
				<SheetTrigger asChild>
					<Button variant="ghost" size="icon" className="lg:hidden">
						<Menu className="h-6 w-6" />
						<span className="sr-only">Toggle menu</span>
					</Button>
				</SheetTrigger>
				<SheetContent side="right">
					<nav className="flex flex-col space-y-4">
						{navItems.map((item, index) => (
							<motion.div
								key={item.href}
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -20 }}
								transition={{ delay: index * 0.1 }}
							>
								<Link
									to={item.href}
									className="block px-2 py-1 text-lg font-medium transition-colors hover:text-primary"
									onClick={() => setOpen(false)}
								>
									{item.label}
								</Link>
							</motion.div>
						))}
						<Link
							to="/signin"
							className="flex items-center gap-2 text-sm font-medium"
							onClick={() => setOpen(false)}
						>
							<Lock className="h-4 w-4" />
							Admin Login
						</Link>
					</nav>
				</SheetContent>
			</Sheet>
		</div>
	);
}
