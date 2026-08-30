import { supabase } from "./supabase";
import { useContext, useEffect, useState } from "react";
import AuthContext from "./AuthContext";

const useTodos = () => {
    const [tasks, setTasks] = useState([]);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [addLoading, setAddLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [updateID, setUpdateID] = useState(null);
    const [updateLoading, setUpdateLoading] = useState(false);
    const {user} = useContext(AuthContext);
    
    const showSuccessMessage = (message) => {
        setSuccessMessage(message);
        setTimeout(() => {
            setSuccessMessage("");
        }, 3000);
    }

    const fetchTodo = async (showLoading = true) => {
        try {
            if(showLoading){
                setFetchLoading(true);
            }

            setErrorMessage("");
            setSuccessMessage("");

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

                setTasks(data);

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
            setErrorMessage("");
            setSuccessMessage("");

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

            showSuccessMessage("タスクを追加しました");

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
            setErrorMessage("");
            setSuccessMessage("");

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

            showSuccessMessage("タスクを削除しました");

        } catch (error) {
            console.log(error);
            setErrorMessage("予期しないエラーが発生しました");
        } finally {
            setDeleteLoading(false);
        }
    }

    const toggleTodo = async (ID, is_completed) => {

        try {
            setUpdateID(ID);
            setUpdateLoading(true);
            setErrorMessage("");
            setSuccessMessage("");

            const { error } = await supabase
                .from("todos")
                .update({
                    is_completed: !is_completed
                })
                .eq("id", ID)

            if(error){
                console.log(error);
                setErrorMessage("チェックをつけれませんでした");
                return ;
            }
            
            await fetchTodo(false);


            return true;

        } catch (error) {
            console.log(error);
            setErrorMessage("予期しないエラーが発生しました");
            return false;
        } finally {
            setUpdateID(null);
            setUpdateLoading(false);
        }
    }


    useEffect(()=>{

        if(!user){
            setTasks([]);
            return ;
        }

        fetchTodo(true);
    },[user])

    return {
        tasks,
        fetchLoading,
        addLoading,
        deleteLoading,
        updateLoading,
        updateID,
        successMessage,
        errorMessage,
        fetchTodo,
        addTodo,
        deleteTodo,
        toggleTodo
    };
}

export default useTodos;