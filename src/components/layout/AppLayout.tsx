import { Outlet } from "react-router-dom";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export function AppLayout() {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<main className="container-fluid mx-4 py-6">
					<Outlet />
				</main>
			</SidebarInset>
		</SidebarProvider>
	);
}
