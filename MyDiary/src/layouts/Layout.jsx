import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "../styles/Layouts.css"

const Layout = () => {

    return (
        <div className="app-container">
            <Header />

            <div className="app-body">
                <Sidebar />

                <main className="main-content">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default Layout;