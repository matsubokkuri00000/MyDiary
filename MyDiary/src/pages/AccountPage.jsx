import { useState, useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import "../styles/account-page.css"

const AccountPage = () => {
    const [showDataDeleteConfirm, setShowDataDeleteConfirm] = useState(false);
    const { user } = useContext(AuthContext);

    

    return (
        <>
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
                        日記、ToDoのすべてのデータを削除します。
                    </p>

                    <div
                        className="account-delete-actions"
                    >
                        <button
                            className="data-delete"
                            onClick={() => setShowDataDeleteConfirm(true)}
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

            {showDataDeleteConfirm && (
                <div className="modal-overlay">
                    <div className="delete-modal">
                        <p>
                            この操作は戻せません！
                        </p>
                        <p>
                            本当に削除しますか？
                        </p>


                        <div className="delete-buttons">
                            <button
                                className="all-delete-button"
                            >
                                削除
                            </button>
                            <button
                                className="cancel-button"
                                onClick={() => setShowDataDeleteConfirm(false)}
                            >
                                キャンセル
                            </button>
                        </div>
                    </div>
                </div>            
            )}
        </>
    )
}

export default AccountPage;