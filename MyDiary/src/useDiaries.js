import { useState, useEffect, useContext } from "react";
import { supabase } from "./supabase";
import AuthContext from "./AuthContext";

const useDiaries = ()=>{
    const [diaryList, setDiaryList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [addLoading, setAddLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false);
    const { user, getCurrentUser, signUp, signIn, signOut } = useContext(AuthContext);

    //実験用
    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const fetchDiaries = async ()=>{

        try {
            //setLoading(true);
            setFetchLoading(true);

            const { data, error } = await supabase
                .from("diaries")
                .select("*");
            
            //supabase関連に対するerror
            if(error){
                console.log(error);
                return;
            }

            const reverseData = [...data].reverse()

            setDiaryList(reverseData);
            
        } catch (error) {
            console.log(error);
        } finally {
            //setLoading(false);
            setFetchLoading(false);
        }
    } 

    const addDiary = async (diary_title, diary_main)=>{

        try {
            //setLoading(true);
            setAddLoading(true);

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
            }

            await fetchDiaries();

            //await sleep(10000);

        } catch (error) {
            console.log(error);
            return;
        } finally {
            //setLoading(false);
            setAddLoading(false);
        }
    }

    const deleteDiary = async (ID)=> {

        try {
            setLoading(true);
            //setDeleteLoading(true);

            const { error } = await supabase
                .from("diaries")
                .delete()
                .eq("id", ID)

            if(error){
            console.log(error);
            return;
            }

            await fetchDiaries();
            
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
            //setDeleteLoading(false);
        }

    }

    const upadateDiary = async (ID, newTitle, newDiary)=>{

        try {
            setLoading(true);
            //setUpdateLoading(true);

            const { error } = await supabase
                .from("diaries")
                .update({
                    title: newTitle,
                    main_text: newDiary
                })
                .eq("id", ID)

            if(error){
                console.log(error);
                return;
            }

            await fetchDiaries();
            
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(true);
            //setUpdateLoading(false);
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
        loading,
        addLoading,
        deleteLoading,
        fetchLoading,
        updateLoading,
        addDiary,
        deleteDiary,
        upadateDiary
    };
}

export default useDiaries;