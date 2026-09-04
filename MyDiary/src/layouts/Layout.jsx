import { Outlet } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import { useContext } from "react";

const Layout = () => {
    const {user, signOut, errorMessage, successMessage} = useContext(AuthContext);

    return (
        <>
            <div className="app-container">
                <header>
                    <h1 className="app-title">MyDiary</h1>
                    <button onClick={signOut}>
                        ログアウト
                    </button>
                    <p>ログイン中のユーザ：{user?.email}</p>

                    {errorMessage && <p>{errorMessage}</p>}
                    {successMessage && <p>{successMessage}</p>}

                </header>

                <main>
                    <Outlet />
                </main>
            </div>
        </>
    )
}

export default Layout;