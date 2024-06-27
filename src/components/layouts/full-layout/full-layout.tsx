import { useState } from "react";
import SideBar from "../../shared/sidebar";
import Header from "../../shared/header";
import { Outlet } from "react-router";

function FullLayout() {

    const [sidebarOpen, setSideBarOpen] = useState(false);

    return (
        <div className="full-layout">
            <div>
                <Header isOpen={sidebarOpen} onClick={() => setSideBarOpen(!sidebarOpen)} />
            </div>
            {/* larger devices */}
            <div className="h-full flex">
                <SideBar isOpen={sidebarOpen} toggleSidebar={() => setSideBarOpen(!sidebarOpen)} />
                <div className={`main-content ${sidebarOpen ? 'expanded' : 'collapsed'} p-5`}>
                    <div className="flex justify-between">
                        <span>dwqdq</span>
                        <span>dwqdq</span>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default FullLayout