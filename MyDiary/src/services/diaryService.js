import { supabase } from "./supabase";

export const fetchAllDiaries = async () => {
    const { data, error } = await supabase
        .from("diaries")
        .select("*")
        .order("created_at", { ascending: false });

    return { data, error };
}

export const addDiary = async (userID, diary_title, diary_main) => {

    const { error } = await supabase
        .from("diaries")
        .insert([
            {
                user_id : userID,
                title: diary_title,
                main_text: diary_main
            }
        ]);

    return { error };
}

export const deleteDiary = async (ID) => {
    const { error } = await supabase
        .from("diaries")
        .delete()
        .eq("id", ID)

    return { error };
}

export const updateDiary = async (ID, newTitle, newDiary) => {
    const { error } = await supabase
        .from("diaries")
        .update({
            title: newTitle,
            main_text: newDiary
        })
        .eq("id", ID)
    
    return { error };
}