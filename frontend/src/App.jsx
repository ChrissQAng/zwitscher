import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Register from "./pages/Register";
import VerifyEmail from "./pages/VerifyEmail";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import AuthRequired from "./components/AuthRequired";
import { backendUrl } from "./api/api";
import Home from "./pages/Home";

function App() {
  const [token, setToken] = useState(); // aktuell verwendete accessToken
  const [user, setUser] = useState();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<Login setToken={setToken} setUser={setUser} />}
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <AuthRequired token={token} setToken={setToken}>
              <Dashboard token={token} user={user} />
            </AuthRequired>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
