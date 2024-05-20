import React, { useState } from "react";
import styles from "./LogIn.module.scss";
const urlBase = process.env.REACT_APP_URL_BASE;
interface props {
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}
export const LogIn = ({ setToken }: props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const logIn = async () => {
    const body = JSON.stringify({
      email: email,
      password: password,
    });
    try {
      const response = await fetch(urlBase + "/api/v1/login/", {
        headers: {
          "Content-type": "application/json",
        },
        method: "POST",
        body: body,
      });

      if (!response.ok) {
        throw new Error("Failed to log in");
      }

      const data = await response.json();
      sessionStorage.setItem("token", data.token);
      setToken(data.token);
    } catch (error) {
      setError(
        "Failed to log in. Please check your credentials and try again."
      );
    }
  };
  return (
    <div className={styles.container_LogIn}>
      <div className={styles.container_Modal}>
        <h1>Inceptia</h1>
        {error && <div className={styles.error}>{error}</div>}
        <div className={styles.Inputs}>
          <i className="fa-solid fa-user"></i>
          <input
            type="text"
            placeholder="usuario@iniceptia.ai"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className={styles.Inputs}>
          <i className="fa-solid fa-lock"></i>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button className={styles.btnSingIn} onClick={logIn}>
          Sing In
        </button>
      </div>
    </div>
  );
};
