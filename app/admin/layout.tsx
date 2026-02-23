import type { Metadata } from "next";
import Sidebar from "@/components/admin/sidebar";

export const metadata: Metadata = {
  title: "Perfect White Admin | Portfolio Management",
  description: "Manage Perfect Whites artisanal showcase and portfolio",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">{children}</main>
    </div>
  );
}
