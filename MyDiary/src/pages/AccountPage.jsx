import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import useAccount from "../hooks/useAccount";
import Toast from "../components/toast/Toast";
import "../styles/account-page.css"

const AccountPage = () => {
    const [showDataDeleteConfirm, setShowDataDeleteConfirm] = useState(false);
    const [showAccountDeleteConfirm, setShowAccountDeleteConfirm] = useState(false);
    const {
        deleteLoading,
        accountDeleteLoading,
        errorMessage,
        successMessage,
        deleteUserData,
        deleteUserAccount,
        clearSuccessMessage
    } = useAccount();
    const { user, signOut } = useContext(AuthContext);

    const handleDeleteAllData = async () => {
        const success = await deleteUserData();

        if(success){
            setShowDataDeleteConfirm(false);
        }
    }

    const handleDeleteAccount = async () => {
        const success = await deleteUserAccount();

        if(success){
            setShowAccountDeleteConfirm(false);

            await signOut();

            Navigate("/login");
        }
    }

    return (
        <>
            <Toast
                errorMessage={errorMessage}
            />
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
                            onClick={() => setShowAccountDeleteConfirm(true)}
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
                                onClick={handleDeleteAllData}
                                disabled={deleteLoading}
                            >
                                {deleteLoading ? "削除中..." : "削除"}
                            </button>
                            <button
                                className="cancel-button"
                                onClick={() => setShowDataDeleteConfirm(false)}
                                disabled={deleteLoading}
                            >
                                キャンセル
                            </button>
                        </div>
                    </div>
                </div>            
            )}

            {successMessage && (
                <div className="modal-overlay">
                    <div className="delete-modal success-modal">
                        <p>
                            削除が完了しました
                        </p>

                        <p>
                            {successMessage}
                        </p>

                        <div className="success-buttons">
                            <button
                                className="success-close-button"
                                onClick={clearSuccessMessage}
                            >
                                閉じる
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showAccountDeleteConfirm && (
                <div className="modal-overlay">
                    <div className="delete-modal">
                        <p>
                            アカウントを削除します
                        </p>

                        <p>
                            日記とToDoを含むすべてのデータが削除されます。
                        </p>

                        <p>
                            この操作は取り消せません。
                        </p>

                        <div className="delete-buttons">
                            <button
                                className="all-delete-button"
                                onClick={handleDeleteAccount}
                                disabled={accountDeleteLoading}
                            >
                                {accountDeleteLoading ? "削除中..." : "アカウント削除"}
                            </button>

                            <button
                                className="cancel-button"
                                onClick={() => setShowAccountDeleteConfirm(false)}
                                disabled={accountDeleteLoading}
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