import { useState, useEffect, useContext } from "react";
import { supabase } from "./supabase";
import AuthContext from "./AuthContext";

const useDiaries = ()=>{
    const [diaryList, setDiaryList] = useState([]);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [addLoading, setAddLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [deletingID, setDeletingId] = useState(null);
    const [updatingID, setupdatingID] = useState(null);
    const [updateLoading, setUpdateLoading] = useState(false);
    const { user } = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    //テスト用
    const sleep = (ms) => {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    };

    const showSuccessMessage = (message) => {
        setSuccessMessage(message);
        setTimeout(() => {
            setSuccessMessage("");
        }, 3000);
    }

    const fetchDiaries = async (shwowLoading = true)=>{

        try {
            if(shwowLoading){
                setFetchLoading(true);
            }

            setErrorMessage("");
            setSuccessMessage("");

            const { data, error } = await supabase
                .from("diaries")
                .select("*");
            
            if(error){
                console.log(error);
                setErrorMessage("日記一覧の取得に失敗しました");
                return;
            }

            const reverseData = [...data].reverse()

            setDiaryList(reverseData);
            
        } catch (error) {
            console.log(error);
            setErrorMessage("予期しないエラーが発生しました");
        } finally {
            setFetchLoading(false);
        }
    } 

    const addDiary = async (diary_title, diary_main)=>{

        try {
            setAddLoading(true);
            setErrorMessage("");
            setSuccessMessage("");

            const { error } = await supabase
                .from("diaries")
                .insert([
                    {
                        user_id : user.id,
                        title: diary_title,
                        main_text: diary_main
                    }
                ]);

            if(error){
                console.log(error);
                setErrorMessage("日記の追加に失敗しました");
                return
            }

            await fetchDiaries(false);

            showSuccessMessage("日記を追加しました");

        } catch (error) {
            console.log(error);
            setErrorMessage("予期しないエラーが発生しました");
            return;
        } finally {
            setAddLoading(false);
        }
    }

    const deleteDiary = async (ID)=> {

        try {
            setDeletingId(ID);
            setDeleteLoading(true);
            setErrorMessage("");
            setSuccessMessage("");

            //テスト用
            await sleep(500);

            const { error } = await supabase
                .from("diaries")
                .delete()
                .eq("id", ID)

            if(error){
                console.log(error);
                setErrorMessage("日記の削除に失敗しました");
                return;
            }

            await fetchDiaries(false);

            showSuccessMessage("日記を削除しました"); 
            
        } catch (error) {
            console.log(error);
            setErrorMessage("予期しないエラーが発生しました");
        } finally {
            setDeletingId(null);
            setDeleteLoading(false);
        }

    }

    const updateDiary = async (ID, newTitle, newDiary)=>{

        try {
            setupdatingID(ID);
            setUpdateLoading(true);
            setErrorMessage("");
            setSuccessMessage("");


            //テスト用
            await sleep(500);

            const { error } = await supabase
                .from("diaries")
                .update({
                    title: newTitle,
                    main_text: newDiary
                })
                .eq("id", ID)

            if(error){
                console.log(error);
                setErrorMessage("日記の更新に失敗しました");
                return false;
            }

            await fetchDiaries(false);

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

    useEffect(()=>{

        if(!user){
            setDiaryList([]);
            return;
        }

        fetchDiaries(true);

    },[user]);


    return {
        diaryList,
        deletingID,
        updatingID,
        fetchLoading,
        addLoading,
        deleteLoading,
        updateLoading,
        errorMessage,
        successMessage,
        addDiary,
        deleteDiary,
        updateDiary
    };
}

export default useDiaries;