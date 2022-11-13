import React,{useEffect} from 'react'
import axios from 'axios';
import { useForm } from "../../../hooks/useForm";
import { useState } from 'react';
import styles from "./Crear.module.scss"
import Swal from 'sweetalert2';


export const CrearSistemaRef = () => {
  

  const [DescripSistema, setDescripSistema] = useState("")
  const [error,setError]=useState("")
  var notnumber = new RegExp("^[a-zA-Z ]+$")

 const handleInputChange=(e)=>{

   !notnumber.test(e.target.value) ? setError("No debe contener numeros") : setError("")
   setDescripSistema(e.target.value)

 }
  const postSistRef =  async()=>{

    try {
      const res= await axios.post("http://localhost:3001/sistRef",{DescripSistema})
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
    (!error && DescripSistema) ? postSistRef() : setError("Compruebe bien ")

    
  };
  return (
    <div className={styles.container}>
    <form className={styles.form} onSubmit={handleSubmit}> 
    <h1>Creando un Sistema</h1>
      <label>Ingrese un nombre del Sistema</label>
      <input type="text"
                
                value={DescripSistema}
                onChange={handleInputChange}></input>
                {error  && <span className={styles.error}>{error}</span> }
                

      <button className={styles.form_button} type="submit">Enviar</button>

    </form>
  </div>
  )
}
