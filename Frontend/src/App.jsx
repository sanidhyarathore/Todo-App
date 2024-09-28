import { useState } from 'react'
import './App.css'
import { CreateTodo } from './components/CreateTodo'
import { Todos } from './components/Todos'

function App() {
  const [todos, setTodos] = useState([]);

  fetch("http://localhost:3001/todo")
    .then(async function (res) {
      const json = await res.json();
      setTodos(json.todos);
    }
    )

  return (
    <div>
      <CreateTodo />
      List of todos-
      <Todos todos={todos} />
    </div>
  )
}

export default App
