const ToDo = ({ todo, handleToggle }) => {
    return (
        <div 
            className={
                todo.is_completed
                    ? "todo-item completed"
                    : "todo-item"
            }
        >   
            <label className="todo-item-label">
                <input 
                    type="checkbox"
                    checked={todo.is_completed}
                    onChange={() =>{
                        handleToggle(todo.id, todo.is_completed)
                    }}
                />

                <span 
                    className={
                        todo.is_completed
                            ? "todo-item-text completed"
                            : "todo-item-text"
                    }
                >
                    {todo.task}
                </span>
            </label>
        </div>
    )
}

export default ToDo;