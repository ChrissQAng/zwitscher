import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { backendUrl } from "../api/api";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();

    const res = await fetch(`${backendUrl}/api/v1/users/register`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ firstName, lastName, email, password }),
    });

    const data = await res.json();

    if (!data.result)
      return setErrorMessage(
        data.message || "Failed to register, please try again"
      );

    // const userInfo = data.result;
    navigate(`/dashboard`);
  };

  return (
    <>
      <h1>Register</h1>
      <h1>Create an Account</h1>
      <form>
        <p style={{ color: "red" }}>{errorMessage}</p>
        <div>
          <label htmlFor="firstname">First Name</label>
          <input
            id="firstname"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="lastname">Last Name</label>
          <input
            id="lastname"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
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

        <button onClick={registerUser}>Continue</button>
      </form>

      <p>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </>
  );
};

export default Register;
