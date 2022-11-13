

import React,{useEffect, useState} from 'react'
import axios from 'axios';
import { useForm } from "../../../hooks/useForm";
import styles from "./Crear.module.scss"
import Swal from 'sweetalert2';

export const CrearPerfil = () => {
  var notnumber = new RegExp("^[a-zA-Z ]+$")

  const [DescripPerfil, setDescripPerfil] = useState("")
  const [error,setError]=useState("")

  const handleInputChange=(e)=>{

    !notnumber.test(e.target.value) ? setError("No debe contener numeros") : setError("")
    setDescripPerfil(e.target.value)
 
  }
  const postPerfil =  async()=>{

    try {
      const res= await axios.post("https://qworkbaseback.up.railway.app/perfiles",{DescripPerfil})
      
      if(res.data)
      {

        Swal.fire(
          {
            icon: 'success',
            title: 'Se creó correctamente!',
            showConfirmButton: false,
          })
          window.setTimeout(function () {
            window.location.reload();
          }, 1000);
      }
      
      else
      {
      Swal.fire({
        icon: "error",
        text: res.data,
      });

    }
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error.response.data,
      });    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    (!error && DescripPerfil) ? 
    postPerfil(): setError("Compruebe bien ")

  };
  return (
    <div className={styles.container}>
    <form className={styles.form} onSubmit={handleSubmit}> 
      <h1>Creando un Perfil</h1>
      <label>Ingrese un nombre del Perfil</label>
      <input type="text"
               
                value={DescripPerfil}
                onChange={handleInputChange}></input>
                                {error  && <span  className={styles.error}>{error}</span> }

      <button className={styles.form_button} type="submit">Enviar</button>
    </form>
    
  </div>
  )
}
