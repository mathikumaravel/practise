import { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Alert,
} from "react-bootstrap";
import Navbar from "../Navbar/Navbar";
import React from "react";

const Todo = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  const [todo, setTodo] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  const handleInputChange = (e) => {
    setTodo(e.target.value);
  };
  const handleEditInputChange = (e) => {
    setCurrentTodo({ ...currentTodo, text: e.target.value });
    console.log(currentTodo);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (todo !== "") {
      setTodos([
        ...todos,
        {
          id: todos.length + 1,
          text: todo.trim(),
        },
      ]);
    }

    setTodo("");
  };

  const handleEditFormSubmit = (e) => {
    e.preventDefault();

    handleUpdateTodo(currentTodo.id, currentTodo);
  };
  const handleDeleteClick = (id) => {
    const removeItem = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(removeItem);
  };
  const handleUpdateTodo = (id, updatedTodo) => {
    const updatedItem = todos.map((todo) => {
      return todo.id === id ? updatedTodo : todo;
    });
    setIsEditing(false);
    setTodos(updatedItem);
  };
  const handleEditClick = (todo) => {
    setIsEditing(true);
    setCurrentTodo({ ...todo });
  };
  return (
    <div className="App">
      <Navbar></Navbar>
      <Container>
        <div>Welcome!</div>
        <Card style={{ marginTop: "100px", height: "200px" }}>
          <Card.Body>
            <form onSubmit={handleFormSubmit}>
              <Card.Title>Welcome!</Card.Title>
              <Card.Text>To get started,add some items to your list:</Card.Text>
              <input
                name="todo"
                type="text"
                placeholder="Create a new todo"
                value={todo}
                onChange={handleInputChange}
              />

              <button
                style={{
                  color: "black",
                }}
              >
                <SiIcons.SiAddthis
                  type="submit"
                  style={{
                    marginTop: "2px",
                    fontSize: "36px",
                    fontFamily: "arial",
                    fontWeight: "bold",
                  }}
                ></SiIcons.SiAddthis>
              </button>
            </form>
          </Card.Body>
        </Card>
        <Card style={{ marginTop: "80px" }}>
          <Card.Body>
            {isEditing ? (
              <Alert>
                <form onSubmit={handleEditFormSubmit}>
                  <h2>Edit Todo</h2>

                  <label htmlFor="editTodo">Edit todo: </label>

                  <input
                    name="editTodo"
                    type="text"
                    placeholder="Edit todo"
                    value={currentTodo.text}
                    onChange={handleEditInputChange}
                  />

                  <button type="submit">Update</button>

                  <button onClick={() => setIsEditing(false)}>Cancel</button>
                </form>
              </Alert>
            ) : (
              <ul className="todo-list">
                {todos.map((todo) => (
                  <Alert>
                    <li key={todo.id}>
                      {todo.text}
                      <button onClick={() => handleEditClick(todo)}>
                        Edit
                      </button>
                      <button
                        style={{
                          backgroundColor: "red",
                        }}
                        onClick={() => handleDeleteClick(todo.id)}
                      >
                        <FaIcons.FaTrash></FaIcons.FaTrash>
                      </button>
                    </li>
                  </Alert>
                ))}
              </ul>
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Todo;
