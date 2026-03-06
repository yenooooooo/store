import Sidebar from "@/components/dashboard/sidebar";
import DashboardHeader from "@/components/dashboard/header";
import AuthProvider from "@/components/shared/auth-provider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex flex-1 flex-col">
          <DashboardHeader />
          <main className="flex-1 bg-[#FAFAFA] px-8 py-8 overflow-y-auto">{children}</main>
        </div>
      </div>
    </AuthProvider>
  );
}
