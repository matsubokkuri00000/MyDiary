import { useState } from "react";
import ToDos from "../components/todo/ToDos";
import useTodos from "../hooks/useTodos";
import "../styles/todo.css"

const ToDoList = () => {
    const [todoTitle, setTodoTitle] = useState("");
    const { tasks, loading, addTodo, deleteTodo, toggleTodo, successMessage } = useTodos();

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
        <section className="todo-page">
            <div className="todo-header">
                <h1>ToDoリスト</h1>

                <p className="todo-message">
                    {successMessage}
                </p>
            </div>

            <div className="todo-form">
                <input
                    className="todo-input"
                    value={todoTitle}
                    onChange={handleTitle}
                />

                <button
                    className="todo-add-button"
                    onClick={handleAddTodo}
                    disabled={loading}
                >
                    追加
                </button>
                
                <button
                    className="todo-delete-completed-button"
                    onClick={handleDelete}
                    disabled={loading}
                >
                    完了済みのタスクを削除
                </button>
            </div>

            <ToDos 
                todoList={tasks}
                handleToggle={handleToggle}
            />
        </section>
    )
}

export default ToDoList;