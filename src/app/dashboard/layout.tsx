/* istanbul ignore file @preserve */
import React from "react";
import { AppSidebar } from "@/components/organisms/app-sidebar";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/atoms/sidebar";
import { Separator } from "@/components/atoms/separator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Backoffice",
  description: "Store Dashboard",
};

function DashboardLayout({
  children,
  breadcrumb,
}: Readonly<{
  children: React.ReactNode;
  breadcrumb: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            {breadcrumb}
          </div>
          <div></div>
        </header>
        <section className={"p-4"}>{children}</section>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default DashboardLayout;
