import React, { useState } from "react";
import axios from "axios";
import styles from "./Crear.module.scss";
import Swal from "sweetalert2";

export const CrearClasifTema = () => {
  const [DescripClasif, setDescripClasif] = useState("");
  const [error, setError] = useState("");
  var notnumber = new RegExp("^[a-zA-Z ]+$");

  const handleInputChange = (e) => {
    !notnumber.test(e.target.value)
      ? setError("No debe contener numeros")
      : setError("");
    setDescripClasif(e.target.value);
  };
  const postClasifTema = async () => {
    try {
      const res = await axios.post(
        "https://qworkapi.herokuapp.com/clasifTema",
        { DescripClasif }
      );
      if (res.data) {
        Swal.fire({
          icon: "success",
          title: "Se creó correctamente!",
          showConfirmButton: false,
        });
        window.setTimeout(function () {
          window.location.reload();
        }, 1000);
      } else {
        Swal.fire({
          icon: "error",
          text: res.data,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error.response.data,
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    !error && DescripClasif ? postClasifTema() : setError("Compruebe bien ")();
  };
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>Creando una Clasificacion de Tema</h1>
        <label> Ingrese un nombre del problema</label>
        <input
          type="text"
          value={DescripClasif}
          onChange={handleInputChange}
        ></input>
        {error && <span className={styles.error}>{error}</span>}

        <button className={styles.form_button} type="submit">
          Enviar
        </button>
      </form>
    </div>
  );
};
