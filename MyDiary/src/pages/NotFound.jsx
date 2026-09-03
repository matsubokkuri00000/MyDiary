import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <>
            <h1>404</h1>
            <p>ページが見つかりません</p>

            <Link to="/">
                トップへ戻る
            </Link>
        </>
    );
}

export default NotFound;