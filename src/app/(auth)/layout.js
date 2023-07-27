import { Toaster } from "react-hot-toast";

const AuthLayout = ({ children }) => {
    return (
        <div className="flex items-center justify-center h-full">
            {children}
            <Toaster />
        </div>
    )
}

export default AuthLayout;