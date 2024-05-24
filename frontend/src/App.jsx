import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Register from "./pages/Register";
import HomeLogin from "./pages/HomeLogin";
import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import AuthRequired from "./components/AuthRequired";
import { backendUrl } from "./api/api";

function App() {
  const [token, setToken] = useState(); // aktuell verwendete accessToken
  const [user, setUser] = useState();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<HomeLogin setToken={setToken} setUser={setUser} />}
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard/:_id"
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
