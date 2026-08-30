import { supabase } from "./supabase";
import { useEffect, useState } from "react";

const useTodos = () => {
    const [tasks, settasks] = useState([]);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [addLoading, setAddLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [deletingID, setDeletingId] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    


    const fetchTodo = async (shwowLoading = true) => {
        try {
            if(shwowLoading){
                setFetchLoading(true);
            }

            setErrorMessage("");

            const { data, error } = await supabase
                .from("todos")
                .select("*")
                .order("created_at", {ascending: false})

                if(error){
                    console.log(error);
                    setErrorMessage("todoリストを取得できませんでした");
                    return ;
                } else {
                    console.log(data);
                }

                settasks(data);

                successMessage("todoリストを取得しました");

        } catch (error) {
            console.log(error);
            setErrorMessage("予期しないエラーが発生しました");
        } finally {
            setFetchLoading(false);
        }
    }

    const addTodo = async (todoTitle) => {
        try {
            setAddLoading(true);

            const { error } = await supabase
                .from("todos")
                .insert([
                    {
                        task: todoTitle
                    }
                ])
            
            if(error){
                console.log(error);
                setErrorMessage("タスクを追加できませんでした");
                return ;
            }

            await fetchTodo(false)

            successMessage("タスクを追加しました");

        } catch (error) {
            console.log(error);
            setErrorMessage("予期しないエラーが発生しました");
        } finally {
            setAddLoading(false);
        }
    }

    const deleteTodo = async () => {
        
        try {
            setDeleteLoading(true);

            const { error } = await supabase   
                .from("todos")
                .delete()
                .eq("is_completed", true)

            if(error){
                console.log(error);
                setErrorMessage("タスクの削除に失敗しました");
                return ;
            }
            
            await fetchTodo(false);

            successMessage("タスクを削除しました");

        } catch (error) {
            console.log(error);
            setErrorMessage("予期しないエラーが発生しました");
        } finally {
            setDeletingId(null);
            setDeleteLoading(false);
        }
    }


    useEffect(()=>{
        fetchTodo(true);
    },[])

    return {
        tasks,
        addLoading,
        fetchLoading,
        deleteLoading,
        errorMessage,
        fetchTodo,
        addTodo,
        deleteTodo
    };
}

export default useTodos;