import { useState } from "react";
import { deleteAllUserData } from "../services/accountService";

const useAccount = () => {
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

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

    const clearSuccessMessage = () => {
        setSuccessMessage("");
    };

    return {
        deleteLoading,
        errorMessage,
        successMessage,
        deleteUserData,
        clearSuccessMessage
    };
};

export default useAccount;