import UserSidebar from "@/components/(user)/UserSidebar";
import UserNavbar from "@/components/(user)/UserNavbar";
import { Toaster } from "react-hot-toast";

export default function DashboardLayout({ children }) {
    return (
        <div className="h-full relative">
            <div className="hidden md:flex md:w-72 h-full md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
                <div> <UserSidebar /></div>
            </div>
            <main className="md:pl-72">
                <UserNavbar />
                {children}
                <Toaster />
            </main>
        </div>
    )
}
