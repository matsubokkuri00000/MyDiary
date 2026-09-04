import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

const Header = () => {
 const {user, signOut, errorMessage, successMessage} = useContext(AuthContext);

    return (
        <>
            <header className="app-header">

                <div className="header-left">
                    <h1>Diary</h1>
                </div>


                <div className="header-right">
                    <p>ログイン中のユーザ：{user?.email}</p>
                    <button onClick={signOut}>
                        ログアウト
                    </button>
                </div>

                {errorMessage && <p>{errorMessage}</p>}
                {successMessage && <p>{successMessage}</p>}
            </header>
        </>
    )
}

export default Header;