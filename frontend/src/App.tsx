import React, { useEffect, useState } from "react";
import { SideBar } from "./SideBar/SideBar";
import "./App.scss";
import { LogIn } from "./LogIn/LogIn";
import IClient from "./types/client";
import { Table } from "./Table/Table";

export const App = () => {
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [ClientActive, setClientActive] = useState<IClient | null>(null);
  return (
    <div className="Container_Principal">
      {token ? (
        <>
          <SideBar
            clientActive={ClientActive}
            setClientActive={setClientActive}
          />
          <Table client={ClientActive} />
        </>
      ) : (
        <LogIn setToken={setToken} />
      )}
    </div>
  );
};
