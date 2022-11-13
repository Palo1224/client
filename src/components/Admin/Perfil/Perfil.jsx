import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPerfil } from "../../../redux/perfiles/perfil";
import styles from "./perfil.module.scss"
import {GoPlus} from "react-icons/go"
import { modalActions } from "../../../redux/modalSlice/modalSlice";
import { FaWindowClose } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
export const Perfil = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPerfil());
  }, [dispatch]);


  const handleOpenModal=()=>{
    dispatch(modalActions.setModalValue())
    dispatch(modalActions.activeCreacionPerfil(true))
  }
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
          `https://qworkbaseback.up.railway.app/perfiles/${id}`
        );

   
          Swal.fire({
            icon: "success",
            text: "Se eliminó correctamente",
            showConfirmButton: true,
            confirmButtonColor: "#347cc3",

          });
          dispatch(fetchPerfil());
       
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
  const { perfil } = useSelector((state) => state.perfil);
  return (
    <div className={styles.container}>
      <div>

<h2>Perfiles
</h2>
</div>
      <button onClick={handleOpenModal} className={styles.button}>
        <GoPlus></GoPlus> Crear un Perfil
      </button>
    <table className={styles.table}>
    <thead className={styles.table_headers}>
    <tr>

         <th></th>
         <th>Descripcion de Perfil</th>
           <th></th>
      </tr>

    </thead>
    <tbody>
   
      {perfil.length !== 0 ? (
        perfil.map((perfil, i) => (
          <tr key={i}>
            <td>{i}</td>
            <td key={i}>{perfil.DescripPerfil}</td>
            <td>
            <FaWindowClose
                    className={styles.disable_button}
                    onClick={() => handleDelete(perfil.id)}
                    title="Eliminar"
                  />
            </td>
          </tr>
        ))
      ) : (
        <td className="no_results">No hay perfiles</td>
      )}
    </tbody>
      </table>
      </div>

  );
};
