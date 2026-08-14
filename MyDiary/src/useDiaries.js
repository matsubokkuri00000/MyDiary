import { useState, useEffect } from "react";
import { supabase } from "./supabase";

const useDiaries = ()=>{
    const [diaryList, setDiaryList] = useState([]);

    const fetchDiaries = async ()=>{
        const { data, error } = await supabase
            .from("diaries")
            .select("*");

        if(error){
            console.log(error);
            return;
        }

        const reverseData = [...data].reverse()

        console.log(reverseData);
        setDiaryList(reverseData);

    } 

    const addDiary = async (diary_title, diary_main)=>{
        const { error } = await supabase
        .from("diaries")
        .insert([
            {
            title: diary_title,
            main_text: diary_main
            }
        ]);

        if(error){
            console.log(error);
        }

        await fetchDiaries();
    }

    const deleteDiary = async (ID)=> {

        const { error } = await supabase
        .from("diaries")
        .delete()
        .eq("id", ID)

        if(error){
        console.log(error);
        return;
        }

        await fetchDiaries();
    }

    const upadateDiary = async (ID, newTitle, newDiary)=>{

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
    }



    useEffect(()=>{

        fetchDiaries();

    },[]);


    return {
        diaryList,
        addDiary,
        deleteDiary,
        upadateDiary
    };
}

export default useDiaries;