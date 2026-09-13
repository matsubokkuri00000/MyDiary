import { useState } from "react";
import {
    deleteAllUserData,
    deleteAccount
} from "../services/accountService";

const useAccount = () => {
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [accountDeleteLoading, setAccountDeleteLoading] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    // 日記・ToDoをすべて削除
    const deleteUserData = async () => {
        try {
            setDeleteLoading(true);
            setErrorMessage("");
            setSuccessMessage("");

            const { error } = await deleteAllUserData();

            if (error) {
                console.log(error);
                setErrorMessage("データの削除に失敗しました");
                return false;
            }

            setSuccessMessage("日記とToDoを全て削除しました");
            return true;

        } catch (error) {
            console.log(error);
            setErrorMessage("予期しないエラーが発生しました");
            return false;

        } finally {
            setDeleteLoading(false);
        }
    };

    // アカウントを削除
    const deleteUserAccount = async () => {
        try {
            setAccountDeleteLoading(true);
            setErrorMessage("");

            const { error } = await deleteAccount();

            if (error) {
                console.log(error);
                setErrorMessage("アカウントの削除に失敗しました");
                return false;
            }

            return true;

        } catch (error) {
            console.log(error);
            setErrorMessage("予期しないエラーが発生しました");
            return false;

        } finally {
            setAccountDeleteLoading(false);
        }
    };

    const clearSuccessMessage = () => {
        setSuccessMessage("");
    };

    return {
        deleteLoading,
        accountDeleteLoading,
        errorMessage,
        successMessage,
        deleteUserData,
        deleteUserAccount,
        clearSuccessMessage
    };
};

export default useAccount;