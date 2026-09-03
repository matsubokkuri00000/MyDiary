const ToDo = ({ todo, handleToggle }) => {
    return (
        <>
            <div>  
                <label>
                    <input 
                        type="checkbox"
                        checked={todo.is_completed}
                        onClick={() =>{handleToggle(todo.id, todo.is_completed)}}
                    />
                    {todo.task}
                </label>

            </div>
        </>
    )
}

export default ToDo;