import { supabase } from "./supabase";
import { useState } from "react";

const useTodos = () => {
    const [addLoading, setAddLoading] = useState(false);

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
                return ;
            }

        } catch (error) {
            console.log(error);
            
        } finally {
            setAddLoading(false);
        }
    }


    return {
        addLoading,
        addTodo
    };
}

export default useTodos;