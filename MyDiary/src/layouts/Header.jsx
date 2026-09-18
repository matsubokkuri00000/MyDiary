import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { LogOut, UserRound } from "lucide-react";
import "../styles/header.css";

const Header = () => {
    const {user, signOut, errorMessage, successMessage} = useContext(AuthContext);

    const navigate = useNavigate();

    const handleAccountPage = () => {
        navigate("/account");
    };
    
    return (
        <>
            <header className="app-header">
                <div className="header-left">
                    <h1>Diary</h1>
                </div>


                <div className="header-right">
                    <div className="header-actions">

                        <button
                            className="header-action-button"
                            onClick={handleAccountPage}
                        >
                            <UserRound size={18} />
                            <span>アカウント</span>
                        </button>                        
                    </div>
                </div>

                {errorMessage && <p>{errorMessage}</p>}
                {successMessage && <p>{successMessage}</p>}
            </header>
        </>
    )
}

export default Header;