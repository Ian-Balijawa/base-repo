import * as React from "react";
import { NavLink } from "react-router-dom";
import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuButton,
	SidebarMenuSubButton,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarRail,
	SidebarFooter,
} from "@/components/ui/sidebar";
import { LayoutDashboard, List, UserPlus, Heart, User, Shield, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavUser } from "@/components/nav-user";
import { useAppSelector } from "../app/hooks";

export function AppSidebar({ className }: React.ComponentProps<typeof Sidebar>) {
	const user = useAppSelector((state) => state.auth.user);

	const navItems = [
		{
			label: "Overview",
			icon: LayoutDashboard,
			href: "/",
		},
		{
			label: "Appointments",
			icon: Calendar,
			href: "/appointments",
			subItems: [
				{ label: "Dashboard", href: "/appointments", icon: LayoutDashboard },
				{ label: "All Appointments", href: "/appointments/list", icon: List },
			],
		},
		{
			label: "Patients",
			icon: Heart,
			href: "/patients",
			subItems: [
				{ label: "Dashboard", href: "/patients", icon: LayoutDashboard },
				{ label: "All Patients", href: "/patients/list", icon: List },
				{ label: "Add Patient", href: "/patients/new", icon: UserPlus },
			],
		},
		{
			label: "Caregivers",
			icon: User,
			href: "/caregivers",
			subItems: [
				{ label: "All Caregivers", href: "/caregivers/list", icon: List },
				{ label: "Add Caregiver", href: "/caregivers/new", icon: UserPlus },
			],
		},
		{
			label: "Administrators",
			icon: Shield,
			href: "/admins",
			subItems: [
				{ label: "All Admins", href: "/admins/list", icon: List },
				{ label: "Add Admin", href: "/admins/new", icon: UserPlus },
			],
		},
	];

	return (
		<Sidebar collapsible="icon" className={cn("border-r", className)}>
			<SidebarHeader></SidebarHeader>

			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
					<SidebarMenu>
						{navItems.map((item) => (
							<SidebarMenuItem key={item.href}>
								<SidebarMenuButton asChild tooltip={item.label}>
									<NavLink
										to={item.href}
										className={({ isActive }) =>
											cn(
												"flex items-center gap-2",
												isActive && "text-primary"
											)
										}
									>
										<item.icon className="h-4 w-4" />
										<span>{item.label}</span>
									</NavLink>
								</SidebarMenuButton>

								{item.subItems && (
									<SidebarMenuSub>
										{item.subItems.map((subItem) => (
											<SidebarMenuSubButton key={subItem.href} asChild>
												<NavLink
													to={subItem.href}
													className={({ isActive }) =>
														cn(
															"flex items-center gap-2",
															isActive && "text-primary"
														)
													}
												>
													<subItem.icon className="h-4 w-4" />
													<span>{subItem.label}</span>
												</NavLink>
											</SidebarMenuSubButton>
										))}
									</SidebarMenuSub>
								)}
							</SidebarMenuItem>
						))}
					</SidebarMenu>
				</SidebarGroup>
			</SidebarContent>

			<SidebarFooter>
				<NavUser user={user} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
