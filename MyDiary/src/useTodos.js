import { supabase } from "./supabase";
import { useEffect, useState } from "react";

const useTodos = () => {
    const [fetchLoading, setFetchLoading] = useState(true);
    const [addLoading, setAddLoading] = useState(false);
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

        } catch (error) {
            console.log(error);
        } finally {
            setFetchLoading(false);
        }
    }

    const addTodo = async(todoTitle) =>{
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
                setErrorMessage("todoを追加できませんでした");
                return ;
            }

        } catch (error) {
            console.log(error);
            
        } finally {
            setAddLoading(false);
        }
    }

    useEffect(()=>{
        fetchTodo(true);
    },[])

    return {
        addLoading,
        fetchTodo,
        addTodo
    };
}

export default useTodos;