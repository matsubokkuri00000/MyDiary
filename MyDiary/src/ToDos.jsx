const ToDos = ({ todoList }) => {

    const result = todoList.map((todo) => {
        return <p>{todo}</p>
    })
}

export default ToDos;