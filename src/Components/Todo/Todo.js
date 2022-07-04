import { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as TbIcons from "react-icons/tb";
import * as BiIcons from "react-icons/bi";
import { Button, Card, Container, Alert } from "react-bootstrap";
import React from "react";
import Navbar from "../Navbar/Navbar";

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
        <Card
          style={{
            marginTop: "100px",
            height: "300px",
            width: "80%",
            marginLeft: "9%",
          }}
        >
          <Card.Title
            style={{
              backgroundColor: "#DCDCDC",
              width: "100%",
              height: "100px",
              fontSize: "30px",
              fontFamily: "arial",
              fontWeight: "bold",
            }}
          >
            <p
              style={{
                marginTop: "30px",
              }}
            >
              <FaIcons.FaListAlt></FaIcons.FaListAlt> Just Another Todo App
            </p>
          </Card.Title>
          <Card.Body>
            <form>
              <Card.Title>Welcome!</Card.Title>
              <Card.Text>To get started,add some items to your list:</Card.Text>
              <input
                name="todo"
                type="text"
                placeholder="I Want to do..."
                value={todo}
                onChange={handleInputChange}
              />

              <Button
                style={{
                  background: "gray",
                  fontSize: "32",
                  marginLeft: "1%",
                }}
                onClick={handleFormSubmit}
              >
                <BiIcons.BiPlusMedical></BiIcons.BiPlusMedical>
              </Button>
            </form>
          </Card.Body>
        </Card>
        <Card style={{ marginTop: "80px", width: "80%", marginLeft: "9%" }}>
          <Card.Body>
            {isEditing ? (
              <Alert style={{ width: "80%", marginLeft: "8%" }}>
                <form>
                  <input
                    name="editTodo"
                    type="text"
                    placeholder="Edit todo"
                    value={currentTodo.text}
                    onChange={handleEditInputChange}
                  />

                  <Button
                    style={{
                      backgroundColor: "green",
                      marginLeft: "5%",
                    }}
                    onClick={handleEditFormSubmit}
                    type="submit"
                  >
                    <BiIcons.BiCheck></BiIcons.BiCheck>
                  </Button>

                  <Button
                    style={{
                      backgroundColor: "red",
                      marginLeft: "5%",
                    }}
                    onClick={() => setIsEditing(false)}
                  >
                    <BiIcons.BiX></BiIcons.BiX>
                  </Button>
                </form>
              </Alert>
            ) : (
              <ul className="todo-list">
                {todos.map((todo) => (
                  <Alert style={{ width: "80%", marginLeft: "8%" }}>
                    {todo.text}
                    <Button
                      style={{
                        backgroundColor: "gray",
                        marginLeft: "20%",
                      }}
                      onClick={() => handleEditClick(todo)}
                    >
                      <TbIcons.TbEdit></TbIcons.TbEdit>
                    </Button>
                    <Button
                      style={{
                        backgroundColor: "red",
                        fontSize: "32",
                        marginLeft: "5%",
                      }}
                      onClick={() => handleDeleteClick(todo.id)}
                    >
                      <FaIcons.FaTrash></FaIcons.FaTrash>
                    </Button>
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
