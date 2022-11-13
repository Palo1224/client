import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSistRef } from "../../../redux/sistRef/sistRef";
import styles from "./sistRef.module.scss" 
import {GoPlus} from "react-icons/go"
import { modalActions } from "../../../redux/modalSlice/modalSlice";
import { FaWindowClose } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";

export const SistRef = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSistRef());
  }, [dispatch]);


  const handleDelete = async (id) => {
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
          handle(id);
        }
      });
      const handle = async (id) => {
        await axios.delete(
          `https://qworkbaseback.up.railway.app/sistRef/${id}`
        );

   
          Swal.fire({
            icon: "success",
            text: "Se eliminó correctamente",
            showConfirmButton: true,
            confirmButtonColor: "#347cc3",

          });
          dispatch(fetchSistRef());
       
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
  const handleOpenModal=()=>{
    dispatch(modalActions.setModalValue())
    dispatch(modalActions.activeCreacionSistRef(true))
  }
  const { sistRef } = useSelector((state) => state.sistRef);
  return (
    <div className={styles.container}>
      <div>

<h2>Sistemas Relacionados
</h2>
</div>     
      <button  onClick={handleOpenModal} className={styles.button}><GoPlus></GoPlus>Crea un Sistema de Referencia</button>
        <table className={styles.table}>
    <thead className={styles.table_headers}>
      <tr>
        <th></th>
        <th>Descripcion de Sistema</th>
        <th></th>
      </tr>
      </thead>
    <tbody>
   
      {sistRef.length !== 0 ? (
        sistRef.map((sistRef, i) => (
          <tr key={i}>
            <td>{i}</td>


            <td>{sistRef.DescripSistema}</td>
            <td>
            <FaWindowClose
                    className={styles.disable_button}
                    onClick={() => handleDelete(sistRef.id)}
                    title="Eliminar"
                  />
            </td>
          </tr>
        ))
      ) : (
        <td className="no_results">No hay Sistemas de Referencia</td>
      )}
    {/* <CrearSistemaRef> 
    </CrearSistemaRef> */}
    </tbody>
      </table>
      </div>
  );
};
