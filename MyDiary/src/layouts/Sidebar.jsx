import { NavLink } from "react-router-dom";

const Sidebar = () =>{
    return (
        <aside className="sidebar">
            <nav className="sidebar-nav">
                <NavLink 
                    to="/diary"
                    className={({ isActive }) => 
                        isActive ? "sidebar-link active" : "sidebar-link"
                    }
                >
                    Diary
                </NavLink>

                <NavLink 
                    to="/todolist"
                    className={({ isActive }) => 
                        isActive ? "sidebar-link active" : "sidebar-link"
                    }  
                >
                    ToDo
                </NavLink>

                <NavLink
                    to="/calendar"
                    className={({ isActive }) => 
                        isActive ? "sidebar-link active" : "sidebar-link"
                    }
                >
                    Calendar
                </NavLink>

                <NavLink
                    to="/futuremeter"
                    className={({ isActive }) =>
                        isActive ? "sidebar-link active" : "sidebar-link"
                    }
                >
                    FutureMeter
                </NavLink>
            </nav>
        </aside>
    )
}

export default Sidebar;