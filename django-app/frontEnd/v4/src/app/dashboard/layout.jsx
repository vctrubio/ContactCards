import { DashboardSidebar } from "./page";

const DashboardLayout = ({ children }) => {
    return (
        <div className="dashboard">
            <DashboardSidebar />
            <main>{children}</main>
        </div>
    );
}


export default DashboardLayout;