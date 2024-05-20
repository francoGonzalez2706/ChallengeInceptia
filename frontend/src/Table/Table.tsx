import React, { useEffect, useState } from "react";
import IClient from "../types/client";
import inboundCase from "../types/inboundCase";
import { Loader } from "../Loader/Loader";
import styles from "./Table.module.scss";
const urlBase = process.env.REACT_APP_URL_BASE;
interface props {
  client: IClient | null;
}
export const Table = ({ client }: props) => {
  const token = sessionStorage.getItem("token");
  const [clientData, setclietData] = useState<inboundCase>();
  const [Loading, setLoading] = useState(false);
  const [pageActual, setPageActual] = useState(1);
  const [totalPages, settotalPages] = useState<any>();
  const [Dates, setDates] = useState({
    initialDate: "2021-03-01",
    finalDate: formatDate(new Date()),
  });

  function formatDate(date: Date) {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Los meses son 0-11, así que sumamos 1
    const day = String(date.getUTCDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }
  useEffect(() => {
    function getPageNumber(url: string) {
      const urlObj = new URL(url);
      const params = new URLSearchParams(urlObj.search);
      return params.has("page") ? parseInt(params.get("page")!, 10) - 1 : 1;
    }
    if (clientData) {
      settotalPages(Math.ceil(clientData.count / 20));
      if (clientData.next) {
        setPageActual(getPageNumber(clientData.next));
      } else if (clientData.previous) {
        setPageActual(getPageNumber(clientData.previous) + 1);
      } else {
        setPageActual(1);
      }
    }
  }, [clientData]);

  const getNextData = async () => {
    if (clientData?.next) {
      setLoading(true);
      const response = await fetch(clientData?.next, {
        headers: {
          "Content-type": "application/json",
          authorization: `JWT ${token}`,
        },
      })
        .then((data) => data.json())
        .then((data) => data)
        .catch((error) => console.error(error));
      setLoading(false);
      setclietData(response);
    }
  };
  const getNextPrev = async () => {
    if (clientData?.previous) {
      setLoading(true);
      const response = await fetch(clientData?.previous, {
        headers: {
          "Content-type": "application/json",
          authorization: `JWT ${token}`,
        },
      })
        .then((data) => data.json())
        .then((data) => data)
        .catch((error) => console.error(error));
      setLoading(false);
      setclietData(response);
    }
  };
  useEffect(() => {
    const getClientData = async () => {
      setLoading(true);
      const response = await fetch(
        `${urlBase}/api/v1/inbound-case/?bot=${client?.id}&local_updated__date__gte=${Dates.initialDate}&local_updated__date__lte=${Dates.finalDate}`,
        {
          headers: {
            "Content-type": "application/json",
            authorization: `JWT ${token}`,
          },
        }
      )
        .then((data) => data.json())
        .then((data) => data)
        .catch((error) => console.error(error));
      setLoading(false);
      setclietData(response);
    };
    if (client) getClientData();
  }, [client, Dates]);

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <span
          key={i}
          className={`${styles.numbersPagination} ${
            pageActual === i && styles.activeNumber
          }`}
        >
          {i}
        </span>
      );
    }
    return pages;
  };
  return (
    <div>
      <div className={styles.RepotsContainer}>
        <div className={styles.FilterContainer}>
          <span>Reportes</span>

          {client && (
            <div className={styles.inputs}>
              <div className={styles.input}>
                <label>Desde</label>
                <input
                  type="date"
                  value={Dates.initialDate}
                  onChange={(e) => {
                    console.log(e.target.value);
                    const date = new Date(e.target.value);
                    console.log(date);
                    setDates({
                      ...Dates,
                      initialDate: formatDate(date),
                    });
                  }}
                />
              </div>
              <div className={styles.input}>
                <label>Hasta</label>
                <input type="date" value={Dates.finalDate} />
              </div>
            </div>
          )}
        </div>
        {Loading ? (
          <Loader />
        ) : (
          <>
            {client ? (
              <div className={styles.containerTable}>
                <table className={styles.table}>
                  <thead>
                    <tr className={styles.trHead}>
                      <td>Gestionado</td>
                      <td>Id Caso</td>
                      <td>Telefono</td>
                      <td>DNI</td>
                      <td>Grupo</td>
                      <td>Orden</td>
                      <td>Llamada</td>
                      <td>Estado</td>
                    </tr>
                  </thead>
                  <tbody className={styles.trBody}>
                    {clientData?.results.length === 0 ? (
                      <tr>
                        <td
                          colSpan={8}
                          style={{
                            textAlign: "center",
                            fontSize: "2vh",
                            padding: "1vh",
                          }}
                        >
                          No Se Encontraron Resultados
                        </td>
                      </tr>
                    ) : (
                      <>
                        {clientData?.results.map((res, index) => (
                          <tr key={index}>
                            <td className={styles.redLetter}>
                              <div>
                                <i className="fa-solid fa-calendar"></i>
                                <span>{res.last_updated}</span>
                              </div>
                            </td>
                            <td>{res.id}</td>
                            <td>{res.phone}</td>
                            <td>{res.extra_metadata.dni}</td>
                            <td className={styles.redLetter}>
                              {res.extra_metadata.grupo}
                            </td>
                            <td className={styles.redLetter}>
                              {res.extra_metadata.orden}
                            </td>
                            <td className={styles.redLetter}>
                              {res.case_duration}
                            </td>
                            <td>
                              <span className={styles.status}>
                                {res.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </>
                    )}
                  </tbody>
                </table>
                <div className={styles.containerArrows}>
                  <div className={styles.Arrows}>
                    {clientData?.previous && (
                      <i
                        className="fa-solid fa-chevron-left"
                        style={{ cursor: "pointer" }}
                        onClick={getNextPrev}
                      ></i>
                    )}
                    <div className={styles.containerNumbers}>
                      {renderPagination()}
                    </div>
                    {clientData?.next && (
                      <i
                        className="fa-solid fa-chevron-right"
                        style={{ cursor: "pointer" }}
                        onClick={getNextData}
                      ></i>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <span className={styles.ClientNoSelected}>
                Cliente no seleccionado
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
};
