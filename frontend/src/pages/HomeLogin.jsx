import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { backendUrl } from "../api/api";

const HomeLogin = () => {
  const [password, setPassword] = useState("hallo123");
  const [token, setToken] = useState("");
  const [user, setUser] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("goodomen@outlook.de");

  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();

    const res = await fetch(`${backendUrl}/api/v1/users/login`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    const data = await res.json();

    console.log({"logdata":data});

    if (!data.result)
      return setErrorMessage(data.message || "Failed verify email");

    navigate(`/dashboard/${data.result.user._id}`);

    // save token --> "logged in"
    setToken(data.result.tokens.accessToken);
    setUser(data.result.user);
  };

  return (
    <>
      <h1>Login</h1>
      <form>
        <p style={{ color: "red" }}>{errorMessage}</p>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button onClick={loginUser}>Login</button>
      </form>

      <p>
        Don't have an account yet? <Link to="/register">Create Account</Link>
      </p>
    </>
  );
};

export default HomeLogin;
