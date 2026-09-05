import { useState } from "react";
import ToDos from "../components/todo/ToDos";
import useTodos from "../hooks/useTodos";
import "../styles/todo.css"

const ToDoList = () => {
    const [todoTitle, setTodoTitle] = useState("");
    const [inputError, setInputError] = useState("");
    const { tasks, loading, addTodo, deleteTodo, toggleTodo, successMessage, errorMessage } = useTodos();

    const handleTitle = (event) => {
        setTodoTitle(event.target.value);

        if(inputError){
            setInputError("");
        }
    }

    const handleAddTodo = () => {
        if(!todoTitle.trim())  {
            setInputError("ToDoを入力してください");
            return;
        }

        setInputError("");

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

                <div className="todo-messages">
                    {inputError ? (
                        <p className="todo-error">
                            {inputError}
                        </p>
                    ) : errorMessage ? (
                        <p className="todo-error">
                            {errorMessage}
                        </p>
                    ) : (
                        <p className="todo-message">
                            {successMessage}
                        </p>
                    )}
                </div>
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