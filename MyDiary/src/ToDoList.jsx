import { useState } from "react";
import ToDos from "./ToDos";

const ToDoList = () => {
    const [todoTitle, setTodoTitle] = useState("");
    const [todoList, setTodoList] = useState([]);

    const handleTitle = (event) => {
        setTodoTitle(event.target.value);
    }

    const handleAddTodo = () => {
        //からの配列に足す
        const newTodoList = [...todoList, {
            todo: todoTitle
        }];

        setTodoList(newTodoList);

        setTodoTitle("");
    }

    return (
        <>
            <p>ToDoリスト</p>
            <ToDos todoList={todoList}/>

            <input 
                value={todoTitle}
                onChange={handleTitle}
            />

            <button
                onClick={handleAddTodo}
            >
                追加
            </button>

        </>
    )
}

export default ToDoList;