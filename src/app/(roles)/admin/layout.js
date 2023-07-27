import AdminSidebar from "@/components/(admin)/AdminSidebar";
import AdminNavbar from "@/components/(admin)/AdminNavbar";
import { Toaster } from "react-hot-toast";

export default function DashboardLayout({ children }) {
    return (
        <div className="h-full relative">
            <div className="hidden md:flex md:w-72 h-full md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
                <div> <AdminSidebar /></div>
            </div>
            <main className="md:pl-72">
                <AdminNavbar />
                {children}
                <Toaster />
            </main>
        </div>
    )
}
