import { useState } from "react";
import { 
    fetchDiariesByDate,
    deleteDiary as deleteDiaryService,
    updateDiary as updateDiaryService
 } from "../services/diaryService";

const useCalendarDiaries = () => {
    const [selectedDiaries, setSelectedDiaries] = useState([]);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [deletingID, setDeletingId] = useState(null);
    const [updatingID, setupdatingID] = useState(null);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const showSuccessMessage = (message) => {
        setSuccessMessage(message);
        setTimeout(() => {
            setSuccessMessage("");
        }, 3000);
    }
    
    const fetchByDate = async (date) => {
        try {
            setLoading(true);
            setErrorMessage("");

            const { data, error } = await fetchDiariesByDate(date);

            if (error) {
                console.log(error);
                setErrorMessage("選択した日の日記取得に失敗しました");
                return;
            }

            setSelectedDiaries(data);

        } catch (error) {
            console.log(error);
            setErrorMessage("予期しないエラーが発生しました");
        } finally {
            setLoading(false);
        }
    }

    const deleteDiary = async (ID, date)=> {

        try {
            setDeletingId(ID);
            setDeleteLoading(true);
            setErrorMessage("");
            setSuccessMessage("");
       
            const { error } = await deleteDiaryService(ID);

            if(error){
                console.log(error);
                setErrorMessage("日記の削除に失敗しました");
                return;
            }

            await fetchByDate(date);

            showSuccessMessage("日記を削除しました"); 
            
        } catch (error) {
            console.log(error);
            setErrorMessage("予期しないエラーが発生しました");
        } finally {
            setDeletingId(null);
            setDeleteLoading(false);
        }

    }

    const updateDiary = async (ID, newTitle, newDiary, date)=>{

        try {
            setupdatingID(ID);
            setUpdateLoading(true);
            setErrorMessage("");
            setSuccessMessage("");


            //テスト用
            //await sleep(500);

            const { error } = await updateDiaryService(
                ID, 
                newTitle, 
                newDiary
            );

            if(error){
                console.log(error);
                setErrorMessage("日記の更新に失敗しました");
                return false;
            }

            await fetchByDate(date);

            showSuccessMessage("日記を更新しました");

            return true;
            
        } catch (error) {
            console.log(error);
            setErrorMessage("予期しないエラーが発生しました");
            return false;
        } finally {
            setupdatingID(null);
            setUpdateLoading(false);
        }
    }


    return {
        selectedDiaries,
        loading,
        deleteLoading,
        deletingID,
        updateLoading,
        updatingID,
        errorMessage,
        successMessage,
        fetchByDate,
        deleteDiary,
        updateDiary
    };
}

export default useCalendarDiaries;