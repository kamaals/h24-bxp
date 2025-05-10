/* istanbul ignore file @preserve */
import React from "react";
import { AppSidebar } from "@/components/organisms/app-sidebar";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/molecules/sidebar";
import { Separator } from "@/components/atoms/separator";
import { Metadata } from "next";
import ProductFormModal from "@/components/molecules/forms/product-form-modal";

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
        <header className="bg-sidebar w-full z-30 fixed flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            {breadcrumb}
          </div>
        </header>
        <ProductFormModal />
        <section className={"p-6 pt-24"}>{children}</section>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default DashboardLayout;
