import { useState } from "react";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import "./auth.css";

function Authentication() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [request, setRequest] = useState("Login");
  const [message, setMessage] = useState("");


  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in");
      setMessage("Logged in successfully");
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setMessage("Account created successfully");
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (request === "Login") {
      handleLogin();
    } else {
      handleSignup();
    }
  };

  const toggleRequest = () => {
    if (request === "Login") {
      setRequest("Signup");
    } else {
      setRequest("Login");
    }
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setMessage("");
  };

  return (
    <div className="form">
      <header>{request}</header>
      <span>{message}</span>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {request === "Signup" && (
          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}
        <input
          type="submit"
          className="button"
          value={request}
        />
      </form>
      <div className="toggle-request">
        {request === "Login" ? (
          <span>
            Don&rsquo;t have an account?
            <button onClick={toggleRequest}>Signup</button>
          </span>
        ) : (
          <span>
            Already have an account?
            <button onClick={toggleRequest}>Login</button>
          </span>
        )}
      </div>
    </div>
  );
}

export default Authentication;
