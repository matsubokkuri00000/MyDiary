import { supabase } from "./supabase";

export const deleteAllUserData = async () => {
    const { error } = await supabase.rpc("delete_my_data");

    return {error};
}