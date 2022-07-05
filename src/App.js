import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Components/Home/Home";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import Create from "./Components/Home/Create";
import Dashboard from "./Components/Home/Dashboard";
import Todo from "./Components/Todo/Todo";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import IdleTimer from "./Components/IdleTimer";
import { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
function App() {
  const [isTimeout, setIsTimeout] = useState(false);
  useEffect(() => {
    const timer = new IdleTimer({
      timeout: 10, //expire after 10 seconds
      onTimeout: () => {
        setIsTimeout(true);
      },
      onExpired: () => {
        // do something if expired on load
        setIsTimeout(true);
      },
    });

    return () => {
      timer.cleanUp();
    };
  }, []);

  return (
    <div className="App">
      {isTimeout ? (
        "Session Expired!"
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/Todo" element={<Todo />} />
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/home" element={<Home />} />
              <Route path="/Create" element={<Create />} />
            </Route>
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
