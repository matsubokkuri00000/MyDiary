import { useState } from "react";
import { Link } from "react-router-dom";
import ToDos from "../components/todo/ToDos";
import useTodos from "../hooks/useTodos";

const ToDoList = () => {
    const [todoTitle, setTodoTitle] = useState("");
    const { tasks, loading, addTodo, deleteTodo, toggleTodo, successMessage, errorMessage } = useTodos();

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
    }

    return (
        <>
            <Link 
                to="/"
            >
                戻る
            </Link>

            <div>
                <h1>ToDoリスト</h1>
                <p 
                    style={
                        { minHeight: "1.5em" }
                    }
                >
                    {successMessage}
                </p>
            </div>

            <input 
                value={todoTitle}
                onChange={handleTitle}
            />

            <button
                onClick={handleAddTodo}
                disabled={loading}
            >
                追加
            </button>

            <button
                onClick={handleDelete}
                disabled={loading}
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