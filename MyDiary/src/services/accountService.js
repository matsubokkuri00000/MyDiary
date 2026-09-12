import { supabase } from "./supabase";

export const deleteAllUserData = async () => {
    const { error } = await supabase.rpc("delete_my_data");

    return {error};
}

export const deleteAccount = async () => {
    const { data, error } = await supabase.functions.invoke(
        "delete-account"
    );

    return { data, error };
}