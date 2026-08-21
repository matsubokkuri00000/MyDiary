import { useState, useEffect, useContext } from "react";
import { supabase } from "./supabase";
import AuthContext from "./AuthContext";

const useDiaries = ()=>{
    const [diaryList, setDiaryList] = useState([]);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [addLoading, setAddLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false);
    const { user } = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const fetchDiaries = async ()=>{

        try {
            setFetchLoading(true);
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

            setSuccessMessage("日記一覧が取得されました");

            setTimeout(()=>{
                setSuccessMessage("");
            }, 3000)
            
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

            await fetchDiaries();

            setSuccessMessage("日記を追加しました");

            setTimeout(()=>{
                setSuccessMessage("");
            }, 3000)

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
            setDeleteLoading(true);
            setErrorMessage("");
            setSuccessMessage("");

            const { error } = await supabase
                .from("diaries")
                .delete()
                .eq("id", ID)

            if(error){
                console.log(error);
                setErrorMessage("日記の削除に失敗しました");
                return;
            }

            await fetchDiaries();

            setSuccessMessage("日記を削除しました");
    
            setTimeout(()=>{
                setSuccessMessage("");
            }, 3000)
            
            
        } catch (error) {
            console.log(error);
            setErrorMessage("予期しないエラーが発生しました");
        } finally {
            setDeleteLoading(false);
        }

    }

    const upadateDiary = async (ID, newTitle, newDiary)=>{

        try {
            setUpdateLoading(true);
            setErrorMessage("");
            setSuccessMessage("");

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
                return;
            }

            await fetchDiaries();

            setSuccessMessage("日記を更新しました");

            setTimeout(() => {
                setSuccessMessage("");
            }, 3000);
            
        } catch (error) {
            console.log(error);
            setErrorMessage("予期しないエラーが発生しました");
        } finally {
            setUpdateLoading(false);
        }
    }

    useEffect(()=>{

        if(!user){
            setDiaryList([]);
            return;
        }

        fetchDiaries();

    },[user]);


    return {
        diaryList,
        fetchLoading,
        addLoading,
        deleteLoading,
        updateLoading,
        errorMessage,
        successMessage,
        addDiary,
        deleteDiary,
        upadateDiary
    };
}

export default useDiaries;