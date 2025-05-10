import { Fragment, ReactNode, useId } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const pathName = location.pathname.split("/").filter(Boolean); // Remove empty strings
  const uniqueId = useId();
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />

          <Breadcrumb>
            <BreadcrumbList>
              {pathName.map((item, index) => {
                const path = `/${pathName.slice(0, index + 1).join("/")}`;
                const isLast = index === pathName.length - 1;

                return (
                  <Fragment key={`${uniqueId}${index}`}>
                    <BreadcrumbItem key={uniqueId}>
                      {isLast ? (
                        <BreadcrumbPage className="capitalize">
                          {item.split("%20").join(" ")}
                        </BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink
                          className="cursor-pointer capitalize"
                          onClick={() => navigate(path)}
                        >
                          {item.split("%20").join(" ")}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {!isLast && <BreadcrumbSeparator />}
                  </Fragment>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
