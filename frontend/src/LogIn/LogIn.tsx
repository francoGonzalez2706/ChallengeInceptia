import React from "react";
import styles from "./LogIn.module.scss";
const urlBase = process.env.REACT_APP_URL_BASE;
interface props {
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}
export const LogIn = ({ setToken }: props) => {
  const logIn = async () => {
    const body = JSON.stringify({
      email: "reactdev@iniceptia.ai",
      password: "4eSBbHqiCTPdBCTj",
    });
    const response = await fetch(urlBase + "/api/v1/login/", {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: body,
    })
      .then((data) => data.json())
      .then((data) => data);
    sessionStorage.setItem("token", response.token);
    setToken(response.token);
  };
  return (
    <div className={styles.container_LogIn}>
      <div className={styles.container_Modal}>
        <h1>Inceptia</h1>
        <div className={styles.Inputs}>
          <i className="fa-solid fa-user"></i>
          <input type="text" placeholder="usuario@iniceptia.ai" />
        </div>
        <div className={styles.Inputs}>
          <i className="fa-solid fa-lock"></i>
          <input type="password" placeholder="Password" />
        </div>
        <button className={styles.btnSingIn} onClick={logIn}>
          Sing In
        </button>
      </div>
    </div>
  );
};
