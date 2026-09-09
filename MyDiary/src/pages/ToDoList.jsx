import { useState } from "react";
import ToDos from "../components/todo/ToDos";
import useTodos from "../hooks/useTodos";
import Toast from "../components/toast/Toast";
import Loading from "../components/loading/Loading.jsx";
import "../styles/todo.css"


const ToDoList = () => {
    const [todoTitle, setTodoTitle] = useState("");
    const [inputError, setInputError] = useState("");
    const { tasks, loading, fetchLoading, addTodo, deleteTodo, toggleTodo, successMessage, errorMessage } = useTodos();

    const handleTitle = (event) => {
        setTodoTitle(event.target.value);

        if(inputError){
            setInputError("");
        }
    }

    const handleAddTodo = () => {
        if(!todoTitle.trim())  {
            setInputError("ToDoを入力してください");

            setTimeout(() => {
                setInputError("");
            }, 3000);
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
            <Toast
                message={errorMessage  || successMessage}
                type={errorMessage ? "error" : "success"}          
            />

            {fetchLoading
                ? (
                    <Loading />
                )
                : (
                    <>
                        <div className="todo-header">
                            <h1>ToDoリスト</h1>
                        </div>

                        <div className="todo-form">
                            <input
                                className="todo-input"
                                value={todoTitle}
                                onChange={handleTitle}
                                placeholder="＋新しいToDo"
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

                        <div className="todo-input-message">
                            {inputError && (
                                <p className="todo-error">
                                    {inputError}
                                </p>
                            )}
                        </div>

                        <ToDos 
                            todoList={tasks}
                            handleToggle={handleToggle}
                        />
                </>
                )
            }
        </section>
    )
}

export default ToDoList;