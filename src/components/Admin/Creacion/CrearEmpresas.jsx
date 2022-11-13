

import React,{useEffect, useState} from 'react'
import axios from 'axios';
import styles from "./Crear.module.scss"
import Swal from 'sweetalert2';

export const CrearEmpresas = () => {
  var notnumber = new RegExp("^[a-zA-Z ]+$")

  const [DescripEmpresa, setDescripEmpresa] = useState("")
  const [error,setError]=useState("")

  const handleInputChange=(e)=>{

    // !notnumber.test(e.target.value) ? setError("No debe contener numeros") : setError("")
    setDescripEmpresa(e.target.value)
 
  }
  const postPerfil =  async()=>{

    try {
      const res= await axios.post("http://localhost:3001/empresa",{DescripEmpresa})
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
    (!error && DescripEmpresa) ? 
    postPerfil(): setError("Compruebe bien ")

  };
  return (
    <div className={styles.container}>
    <form className={styles.form} onSubmit={handleSubmit}> 
      <h1>Creando una empresa</h1>
      <label>Ingrese el nombre de la empresa</label>
      <input type="text"
               
                value={DescripEmpresa}
                onChange={handleInputChange}></input>
                                {error  && <span  className={styles.error}>{error}</span> }

      <button className={styles.form_button} type="submit">Enviar</button>
    </form>
    
  </div>
  )
}
