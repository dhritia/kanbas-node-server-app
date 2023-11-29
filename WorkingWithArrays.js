import React, { useState, useEffect } from "react";
import axios from "axios";
const API_BASE = process.env.LAB_BASE;
function WorkingWithArrays() {
  const [errorMessage, setErrorMessage] = useState(null);
  const API = `${API_BASE}/a5/todos`;
  const [todo, setTodo] = useState({
    id: 1,
    title: "New Task",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-09-09",
    completed: false,
  });
  const [todos, setTodos] = useState([]);
  const fetchTodos = async () => {
    const response = await axios.get(API);
    setTodos(response.data);
  };
  const postTodo = async () => {
    const response = await axios.post(API, todo);
    setTodos([...todos, response.data]);
  };
  const deleteTodo = async (todo) => {
    try {
      const response = await axios.delete(
        `${API}/${todo.id}`);
      setTodos(todos.filter((t) => t.id !== todo.id));
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.message);
    }
  };
  const updateTodo = async () => {
    try {
      const response = await axios.put(
        `${API}/${todo.id}`, todo);
      setTodos(todos.map((t) => (
        t.id === todo.id ? todo : t)));
      setTodo({});
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.message);
    }
  };
  const removeTodo = async (todo) => {
    const response = await axios
      .get(`${API}/${todo.id}/delete`);
    setTodos(response.data);
  };
  const createTodo = async () => {
    const response = await axios.get(`${API}/create`);
    setTodos(response.data);
  };
  const fetchTodoById = async (id) => {
    const response = await axios.get(`${API}/${id}`);
    setTodo(response.data);
  };
  const updateTitle = async () => {
    const response = await axios.get(
      `${API}/${todo.id}/title/${todo.title}`);
    setTodos(response.data);
  };
  useEffect(() => {
    fetchTodos();
  }, []);
    return (
      <div>
        <h3>Working with Arrays</h3>
        <input
        value={todo.id}
        onChange={(e) => setTodo({
          ...todo, id: e.target.value })}
        className="form-control mb-2"
        type="number"
      />
      <input
        value={todo.title}
        onChange={(e) => setTodo({
          ...todo, title: e.target.value })}
        className="form-control mb-2"
        type="text"
      />
      <input
        value={todo.description}
        onChange={(e) => setTodo({
          ...todo, description: e.target.value })}
        className="form-control mb-2"
        type="text"
      />
      <input
        onChange={(e) => setTodo({ ...todo,
            completed: !todo.completed })}
            checked={todo.completed}
        type="checkbox" id="haha" className="m-2"/>
        <label for="haha">Completed?</label>
        <a
        href={`${API}/${todo.id}/completed/${todo.completed}`}
        className="btn btn-primary m-2" >
        Update Completed
      </a>
      <h3>Updating an Item in an Array</h3>
      <a
        href={`${API}/${todo.id}/title/${todo.title}`}
        className="btn btn-primary me-2" >
        Update Title to {todo.title}
      </a>
      <a
        href={`${API}/${todo.id}/title/${todo.description}`}
        className="btn btn-primary me-2" >
        Update description to {todo.description}
      </a>
      <h3>Deleting from an Array</h3>
      <a href={`${API}/${todo.id}/delete`}
         className="btn btn-primary me-2">
        Delete Todo with ID = {todo.id}
      </a>
        <h4>Retrieving Arrays</h4>
        <a href={API} className="btn btn-primary me-2">
          Get Todos
        </a>
        <h4>Retrieving an Item from an Array by ID</h4>
      <input
        className="form-control"
        value={todo.id}
        onChange={(e) => setTodo({ ...todo,
          id: e.target.value })}/>
      <a href={`${API}/${todo.id}`}
         className="btn btn-primary me-2">
        Get Todo by ID
      </a>
      <h3>Filtering Array Items</h3>
      <a href={`${API}?completed=true`}
        className="btn btn-primary me-2" >
        Get Completed Todos
      </a>
      <h4>Creating new Items in an Array</h4>
      <a href={`${API}/create`}
        className="btn btn-primary me-2">
        Create Todo
      </a>
      <div className="w-25">
  <input value={todo.title} className="form-control m-2"
         onChange={(e) => setTodo({ ...todo, title: e.target.value})} />
         <textarea className="form-control m-2"
        onChange={(e) => setTodo({ ...todo,
          description: e.target.value })}
        value={todo.description} type="text"
      />
      <input className="form-control m-2"
        onChange={(e) => setTodo({
          ...todo, due: e.target.value })}
        value={todo.due} type="date"
      />
      <label>
        <input className="m-2"
          onChange={(e) => setTodo({
            ...todo, completed: e.target.checked })}
          value={todo.completed} type="checkbox"
        />
        Completed
      </label>
      <button className="btn btn-warning m-2 w-100" onClick={postTodo} >
        Post Todo
      </button>
         <button onClick={updateTodo}
              className="btn btn-success m-2 w-100">
        Update Todo
      </button>
      <button onClick={createTodo}
              className="btn btn-primary m-2 w-100">
        Create Todo
      </button>
      {errorMessage && (
        <div className="alert alert-danger mb-2 mt-2">
          {errorMessage}Hi
        </div>
      )}
      <ul className="list-group m-2">
        {todos.map((todo) => (
          <li key={todo.id}
              className="list-group-item">
            {todo.title}
            <button
          onClick={() => fetchTodoById(todo.id)}
          className="btn btn-warning me-2 float-end m-2" >
          Edit
        </button>
            <button
          onClick={() => deleteTodo(todo)}
          className="btn btn-danger float-end m-2" >
          Remove
        </button>
        <input
              checked={todo.completed}
              type="checkbox" readOnly
            />
            <p>{todo.description}</p>
            <p>{todo.due}</p>
          </li>
        ))}
      </ul>
      </div>
      </div>
    );
  }
  export default WorkingWithArrays;
