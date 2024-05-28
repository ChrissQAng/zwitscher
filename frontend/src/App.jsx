import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Register from "./pages/Register";
import HomeLogin from "./pages/HomeLogin";
import { useEffect, useState } from "react";
import MyProfile from "./pages/MyProfile";
import AuthRequired from "./components/AuthRequired";

import VerifyEmail from "./pages/VerifyEmail";
import Feed from "./pages/Feed";
import { RefreshContext, TokenContext, UserContext } from "../context/Context";
import Discover from "./pages/Discover";
import UserProfile from "./pages/UserProfile";

function App() {
  const [refresh, setRefresh] = useState(false);
  const [token, setToken] = useState(); // aktuell verwendete accessToken
  const [user, setUser] = useState();

  return (
    <RefreshContext.Provider value={{ refresh, setRefresh }}>
      <TokenContext.Provider value={{ token, setToken }}>
        <UserContext.Provider value={{ user, setUser }}>
          <div className="bg-slate-600">
            <div className="bg-slate-200 font-courier max-w-screen-sm mx-auto">
              <BrowserRouter>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <HomeLogin setToken={setToken} setUser={setUser} />
                    }
                  />
                  <Route path="/register" element={<Register />} />
                  <Route
                    path="/my-profile"
                    element={
                      <AuthRequired>
                        <MyProfile />
                      </AuthRequired>
                    }
                  />
                  <Route
                    path="/verify-email/:_id"
                    element={
                      <AuthRequired>
                        <VerifyEmail />
                      </AuthRequired>
                    }
                  />
                  <Route
                    path="/feed"
                    element={
                      <AuthRequired>
                        <Feed />
                      </AuthRequired>
                    }
                  />
                  <Route
                    path="/discover"
                    element={
                      <AuthRequired>
                        <Discover />
                      </AuthRequired>
                    }
                  />
                  <Route
                    path="/userprofile/:userId"
                    element={
                      <AuthRequired>
                        <UserProfile />
                      </AuthRequired>
                    }
                  />
                </Routes>
              </BrowserRouter>
            </div>
          </div>
        </UserContext.Provider>
      </TokenContext.Provider>
    </RefreshContext.Provider>
  );
}

export default App;
