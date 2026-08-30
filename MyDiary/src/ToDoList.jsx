import { useState } from "react";
import ToDos from "./ToDos";
import { v4 as uuidv4 } from "uuid"
import useTodos from "./useTodos";

const ToDoList = () => {
    const [todoTitle, setTodoTitle] = useState("");
    const [todoList, setTodoList] = useState([]);

    const { addTodo } = useTodos();

    const handleTitle = (event) => {
        setTodoTitle(event.target.value);
    }

    const handleAddTodo = () => {
        if(!todoTitle){
            return;
        }

        addTodo(todoTitle);

        const newTodoList = [...todoList, {
            id: uuidv4(),
            task: todoTitle,
            is_completed: false
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
                        is_completed: !todo.is_completed
                    }
                )
            }

            return todo;
        })

        setTodoList(result);
    }

    const handleDelete = () => {

        const result = todoList.filter((todo)=>{
            if(todo.is_completed){
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