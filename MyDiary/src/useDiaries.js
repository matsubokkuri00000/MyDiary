import { useState, useEffect } from "react";
import { supabase } from "./supabase";
import useAuth from "./useAuth";

const useDiaries = ()=>{
    const [diaryList, setDiaryList] = useState([]);
    const [loading, setLoading] = useState(false);

    const { user, getCurrentUser, signUp, signIn, signOut } = useAuth();

    //実験用
    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const fetchDiaries = async ()=>{

        try {
            setLoading(true);

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
            setLoading(false);
        }
    } 

    const addDiary = async (diary_title, diary_main)=>{

        try {
            setLoading(true);

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
            setLoading(false);
        }
    }

    const deleteDiary = async (ID)=> {

        try {
            setLoading(true);

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
        }

    }

    const upadateDiary = async (ID, newTitle, newDiary)=>{

        try {
            setLoading(true);

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
            setLoading(false);
        }
    }

    useEffect(()=>{

        fetchDiaries();

    },[]);


    return {
        diaryList,
        loading,
        addDiary,
        deleteDiary,
        upadateDiary
    };
}

export default useDiaries;