import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

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

                    <button 
                        onClick={signOut}
                    >
                        ログアウト
                    </button>

                    <button
                        onClick={handleAccountPage}
                    >
                        アカウントページ
                    </button>
                </div>

                {errorMessage && <p>{errorMessage}</p>}
                {successMessage && <p>{successMessage}</p>}
            </header>
        </>
    )
}

export default Header;