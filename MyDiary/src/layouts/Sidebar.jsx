import { NavLink } from "react-router-dom";
import { NotebookPen, SquareCheckBig, CalendarDays } from "lucide-react";
import "../styles/layouts.css"

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
                    <NotebookPen size={18}/>
                    <span>Diary</span>
                </NavLink>

                <NavLink 
                    to="/todolist"
                    className={({ isActive }) => 
                        isActive ? "sidebar-link active" : "sidebar-link"
                    }  
                >
                    <SquareCheckBig size={18}/>
                    ToDo
                </NavLink>

                <NavLink
                    to="/calendar"
                    className={({ isActive }) => 
                        isActive ? "sidebar-link active" : "sidebar-link"
                    }
                >
                    <CalendarDays size={18}/>
                    Calendar
                </NavLink>
            </nav>
        </aside>
    )
}

export default Sidebar;