'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";


const path = '/dashboard';
const links = {
    "View": `${path}/view`,
    "Create": `${path}/create`,
    "Statistics": `${path}/stats`
}


export const DashboardSidebar = () => {
    const pathname = usePathname();

    return (
        <div className="dash-side-bar">
            {Object.keys(links).map((key) => (
                <div
                    key={key}
                    className={`side-bar-item ${pathname === links[key] ? 'active' : ''}`}
                >
                    <Link href={links[key]}>{key}</Link>
                </div>
            ))}
        </div>
    );
};
const DashboardController = () => {
    return (
        <div className="dashboard-msg">
            <div>
                <h1>Welcome to Your Administration Panel</h1>
                <div>
                    <p>
                        Here you can add, delete, and modify your organizations.
                    </p>
                    <p>
                        Please note, it is €20 per organization plus an extra €1 per employee per month.
                    </p>
                    <p>
                        You have full control and access to all employee cards, monitoring their interactions.
                    </p>
                    <p>
                        At any time, you can stop or switch employee status, even modifying an employee's position.
                    </p>
                </div>
                <div>
                    <p>
                        Our goal is to make your business as efficient and digitized as possible.
                        Please leave us a review; we value your feedback.
                    </p>
                </div>
            </div>
            <div className="mt-8">
                <h1>Subscription cost [NEXT-MONTH-DATE-BILL-TOTAL]</h1>
                <div>
                    -- Invoice -- 
                    [Number of organistaiton ] -
                    [Number of employees per that organtion] -
                    [Employee numbers -- share cards this last month]
                </div>
                <button className="mt-4 mx-2">Cancel All subscription</button>
                <button className="mt-4 mx-2">Cancel One subscription</button>
            </div>
        </div>
    );
}

export default DashboardController;