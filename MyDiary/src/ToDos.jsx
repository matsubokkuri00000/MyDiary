import ToDo from "./ToDo"

const ToDos = ({ todoList, handleToggle }) => {

    const result = todoList.map((todo) => {
        return <ToDo 
                key={todo.id}
                todo={todo}
                handleToggle={handleToggle}
            />
    })

    return result;
}

export default ToDos;