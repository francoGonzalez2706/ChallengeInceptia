import React, { useEffect, useState } from "react";
import IClient from "../types/client";
import styles from "./SideBar.module.scss";
import { Loader } from "../Loader/Loader";
const urlBase = process.env.REACT_APP_URL_BASE;
interface props {
  setClientActive: React.Dispatch<React.SetStateAction<IClient | null>>;
  clientActive: IClient | null;
}
export const SideBar = ({ setClientActive, clientActive }: props) => {
  const [clients, setClient] = useState<IClient[]>([]);
  const [Loading, setLoading] = useState(false);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const getClients = async () => {
      setLoading(true);
      const response = await fetch(urlBase + "/api/v1/clients/", {
        headers: {
          "Content-type": "application/json",
          authorization: `JWT ${token}`,
        },
      })
        .then((data) => data.json())
        .then((data) => data);
      setLoading(false);
      setClient(response);
    };

    getClients();
  }, [token]);
  return (
    <div className={styles.Container_Sidebar}>
      <span className={styles.titleClient}>Clientes</span>
      {Loading ? (
        <div className={styles.ContainerLoader}>
          <Loader />
        </div>
      ) : (
        <div style={{ width: "100%" }}>
          {clients?.map((client, index) => (
            <div
              key={index}
              className={`${styles.client} ${
                clientActive?.id === client.id && styles.active
              }`}
              onClick={() => setClientActive(client)}
            >
              {client.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
