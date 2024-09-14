import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await axios.get('http://localhost:5000/todos');
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (!input) return;
    const res = await axios.post('http://localhost:5000/todos', { text: input });
    setTodos([...todos, res.data]);
    setInput('');
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/todos/${id}`);
    setTodos(todos.filter((todo) => todo._id !== id));
  };

  return (
    <div className="App">
      <div className="todo-container">
        <h1>Simple To-Do List</h1>
        <div className="input-container">
          <input 
            type="text" 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            placeholder="Add a task"
          />
          <button onClick={addTodo}>Add</button>
        </div>
        <ul>
          {todos.map((todo) => (
            <li key={todo._id}>
              {todo.text}
              <button onClick={() => deleteTodo(todo._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
