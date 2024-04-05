import styles from "./signin.module.css";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";

export default function Signin() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("https://well-food-api.vercel.app/login", {
        password,
        username,
      });

      if (res.data.msg === "login Successfully") {
        localStorage.setItem("authToken", res.data.token);
        localStorage.setItem("USERNAME", res.data.username);
       // Use username instead of Credentials.email
        navigate("/home");
      } else {
        console.log("Login failed:", res.data.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles["signup-container"]}>
      <div className={styles["signup-image"]}>
        <img src="image.png" alt="signin" />
      </div>
      <form className={styles["signup-form"]} onSubmit={handleSubmit}>
        <h2 className={styles.heading}>Sign In</h2>

        <div className={styles["input-field"]}>
          <FaUser className={styles.icon} />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles["input-field"]}>
          <FaLock className={styles.icon} />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles["login-link"]}>
          <Link to="/signup">Create an Account</Link>
        </div>
        <button type="submit" className={styles["register-button"]}>
          Sign In
        </button>
      </form>
    </div>
  );
}
