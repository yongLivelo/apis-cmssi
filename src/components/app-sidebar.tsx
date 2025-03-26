import * as React from "react";
import { FolderCog, Home, Settings, Users } from "lucide-react";

import { NavLinks } from "@/components/nav-links";

import { Sidebar, SidebarContent } from "@/components/ui/sidebar";

const data = {
  projects: [
    {
      name: "Home",
      url: "home",
      icon: Home,
    },
    {
      name: "Applicants",
      url: "applicants",
      icon: Users,
    },
    {
      name: "References",
      url: "references",
      icon: FolderCog,
    },
    {
      name: "Settings",
      url: "settings",
      icon: Settings,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (

    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
    >
      <SidebarContent>
        <NavLinks projects={data.projects} />
      </SidebarContent>
    </Sidebar>
  );
}
