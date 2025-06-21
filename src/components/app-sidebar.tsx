import * as React from "react";
import { Home, FileUser, Settings2, BookMarked } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "Julio Livelo",
    email: "julioeduardolivelo@gmail.com",
    avatar: "/avatars/shadcn.svg",
  },
  navMain: [
    {
      title: "Home",
      url: "Home",
      icon: Home,
      isActive: true,
    },
    {
      title: "Applicant",
      url: "Applicants",
      icon: FileUser,
    },
    {
      title: "References",
      url: "References",
      icon: BookMarked,
    },
    {
      title: "Settings",
      url: "Settings",
      icon: Settings2,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="border-2 text-sidebar-primary-foreground flex aspect-square size-12 items-center justify-center rounded-lg">
                  <img src="vite.svg" alt="logo" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">APIS</span>
                  <p className="text-xs">
                    Application Personal Information System
                  </p>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
