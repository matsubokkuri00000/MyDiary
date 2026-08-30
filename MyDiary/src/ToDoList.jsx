import { useState } from "react";
import ToDos from "./ToDos";
import { v4 as uuidv4 } from "uuid"
import useTodos from "./useTodos";

const ToDoList = () => {
    const [todoTitle, setTodoTitle] = useState("");
    const [todoList, setTodoList] = useState([]);
    const { tasks, addTodo, deleteTodo, toggleTodo, successMessage } = useTodos();

    const handleTitle = (event) => {
        setTodoTitle(event.target.value);
    }

    const handleAddTodo = () => {
        if(!todoTitle){
            return;
        }

        addTodo(todoTitle);

        setTodoTitle("");
    }

    const handleToggle = (ID, is_completed) => {

        toggleTodo(ID, is_completed);
    }

    const handleDelete = () => {

        deleteTodo();

        /*
        const result = todoList.filter((todo)=>{
            if(todo.is_completed){
                return ;
            }

            return todo;
        })

        return setTodoList(result);
        */
    }

    return (
        <>
            <div>
                <h1>ToDoリスト</h1>
                <p style={{ minHeight: "1.5em" }}>
                    {successMessage}
                </p>
            </div>

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

            <p>---------------------------------------------</p>
            <ToDos 
                todoList={tasks}
                handleToggle={handleToggle}
            />

        </>
    )
}

export default ToDoList;