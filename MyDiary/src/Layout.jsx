import { Outlet } from "react-router-dom";

const Layout = () => {

    return (
        <>
            <header>
                <h1>MyDiary</h1>
                <p>ここは共通部分です</p>
            </header>

            <main>
                <Outlet />
            </main>
        </>
    )
}

export default Layout;