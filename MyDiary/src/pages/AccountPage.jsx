import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import "../styles/account-page.css"

const AccountPage = () => {
    const {user, signOut, errorMessage, successMessage} = useContext(AuthContext);

    return (
        <article className="account-page">
            <div className="account-header">
                <h2>アカウント設定</h2>
            </div>

            <div className="account-info">
                <h3>
                    アカウント情報
                </h3>

                <p>
                    ログイン中のユーザ：{user?.email}
                </p>
            </div>

            <div className="account-data-manage">
                <h3>
                    データ管理
                </h3>

                <p>
                    日記、ToDoなど、すべてのデータを削除します。
                </p>

                <div
                    className="account-delete-actions"
                >
                    <button
                        className="data-delete"
                    >
                        削除
                    </button>
                </div>
            </div>

            <div className="account-manage">
                <h3>
                    アカウント管理
                </h3>
                <p>
                    このアカウントを削除します。
                    この操作は取り消せません。
                </p>
                <div
                    className="account-delete-actions"
                >
                    <button
                        className="account-delete"
                    >
                        アカウント削除
                    </button>
                </div>
            </div>

        </article>
    )
}

export default AccountPage;