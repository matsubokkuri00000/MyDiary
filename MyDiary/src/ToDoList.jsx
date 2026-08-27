import { useState } from "react";
import ToDos from "./ToDos";
import { v4 as uuidv4 } from "uuid"

const ToDoList = () => {
    const [todoTitle, setTodoTitle] = useState("");
    const [todoList, setTodoList] = useState([]);
    const [is_Completed, setIsCompleted] = useState(false);

    const handleTitle = (event) => {
        setTodoTitle(event.target.value);
    }

    const handleAddTodo = () => {
        if(!todoTitle){
            return;
        }

        const newTodoList = [...todoList, {
            id: uuidv4(),
            todoTitle: todoTitle,
            is_Completed: is_Completed
        }];

        setTodoList(newTodoList);

        setTodoTitle("");
    }

    const handleToggle = (ID) => {
        const currentTodoList = todoList;

        const result = currentTodoList.map((todo)=>{
            if(todo.id === ID){
                return  (
                    {
                        ...todo,
                        is_Completed: !todo.is_Completed
                    }
                )
            }

            return todo;
        })

        setTodoList(result);
    }

    const handleDelete = () => {

        const result = todoList.filter((todo)=>{
            if(todo.is_Completed){
                return ;
            }

            return todo;
        })

        return setTodoList(result);
    }

    return (
        <>
            <p>ToDoリスト</p>
            <ToDos 
                todoList={todoList}
                handleToggle={handleToggle}
            />

            <input 
                value={todoTitle}
                onChange={handleTitle}
            />

            <button
                onClick={handleAddTodo}
            >
                追加
            </button>

            <button
                onClick={handleDelete}
            >
                完了済みのタスクを削除
            </button>

        </>
    )
}

export default ToDoList;