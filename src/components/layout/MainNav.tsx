import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";
import { Lock } from "lucide-react";

const links = [
	{ href: "/", label: "Home" },
	{ href: "/about", label: "About" },
	{ href: "/programs", label: "Programs" },
	{ href: "/coaches", label: "Coaches" },
	{ href: "/facilities", label: "Facilities" },
	{ href: "/news", label: "News" },
	{ href: "/gallery", label: "Gallery" },
	{ href: "/alumni", label: "Alumni" },
	{ href: "/contact", label: "Contact" },
	{ href: "/faq", label: "FAQ" },
];

export function MainNav() {
	const location = useLocation();

	return (
		<nav className="hidden gap-6 lg:flex justify-between w-full ">
			{links.map((link) => (
				<Link
					key={link.href}
					to={link.href}
					className={cn(
						"text-sm font-medium transition-colors hover:text-primary",
						location.pathname === link.href ? "text-primary" : "text-muted-foreground"
					)}
				>
					{link.label}
				</Link>
			))}
			{/* I want this link to be on the extreme right on large screens */}
			<Link to="/signin">
				<Button variant="ghost" size="sm" className="gap-2">
					<Lock className="h-4 w-4" />
					Admin
				</Button>
			</Link>
		</nav>
	);
}
