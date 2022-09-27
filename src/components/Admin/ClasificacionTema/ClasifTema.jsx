import React, { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { fetchClasifTema } from '../../../redux/clasifTema/clasifTema'
import { CrearClasifTema } from '../Creacion/CrearClasifTema'
import {GoPlus} from 'react-icons/go'
import styles from "./clasifTema.module.scss"
import { modalActions } from '../../../redux/modalSlice/modalSlice'
import { FaWindowClose } from 'react-icons/fa'
import Swal from 'sweetalert2'
import axios from 'axios'
export const ClasifTema = () => {

    
    const dispatch=useDispatch()
    
    useEffect(()=>{
        dispatch(fetchClasifTema())
    },[dispatch])
    const handleDelete = async (_id) => {
      try {
  
        Swal.fire({
          icon: "warning",
          text: "Estás seguro que deseas eliminar?",
          showConfirmButton: true,
          confirmButtonColor: "#347cc3",
          confirmButtonText:"Si",
  
          showCancelButton: true,
          cancelButtonText:"No"
        }).then((result) => {
          if (result.isConfirmed) {
            handle(_id);
          }
        });
        const handle = async (_id) => {
          const res = await axios.delete(
            `https://qworkapi.herokuapp.com/clasifTema/${_id}`
          );
  
     
            Swal.fire({
              icon: "success",
              text: "Se eliminó correctamente",
              showConfirmButton: true,
              confirmButtonColor: "#347cc3",  

            });
            dispatch(fetchClasifTema());
         
          }
      } catch (error) {
        Swal.fire({
          icon: "info",
          text: "No se elimino",
          timer: 3000,
          showConfirmButton: true,
          confirmButtonColor: "#347cc3",
  
        });
      }
    };
    const {clasifTema}=useSelector(state=>state.clasifTema)
  const handleOpenModal = ()=>{
    dispatch(modalActions.setModalValue())
    dispatch(modalActions.activeCreacionClasifTema(true))
  }
    return (
    <div className={styles.container}>
                  <div>

<h2>Clasificación de tema
</h2>
</div>
        <button    onClick={handleOpenModal}   className={styles.button}   >
        <GoPlus/>  <p>Crear una Clasificacón de Tema</p>
        </button>
    <table className={styles.table}>
    <thead className={styles.table_headers}>
    <tr>
    <th></th>
        <th>Descripcion de Clasificacion de Tema</th>

      <th></th>
      </tr>
  
      </thead>
    <tbody>
   
  { clasifTema.length !== 0 ?
    clasifTema.map((clasifTema, i) => (
      <tr key={i+1}>
          <td>{i}</td>
           
        <td>{clasifTema.DescripClasif}</td>
        <td>
            <FaWindowClose
                    className={styles.disable_button}
                    onClick={() => handleDelete(clasifTema._id)}
                    title="Eliminar"
                  />
            </td>
      </tr>

 
        
     

    ))
    : 
    <td className="no_results">No hay Clasificacion de Tema</td>
  
  }

{/* <CrearClasifTema></CrearClasifTema>     */}
</tbody> 
      </table>
      </div>

  )
}
