const ToDo = ({ todo, handleToggle }) => {
    return (
        <>
            <div>  
                <label>
                    <input 
                        type="checkbox"
                        onClick={() =>{handleToggle(todo.id)}}
                    />
                    {todo.task}
                </label>

            </div>
        </>
    )
}

export default ToDo;