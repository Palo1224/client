import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./empresa.module.scss"
import {GoPlus} from "react-icons/go"
import { modalActions } from "../../../redux/modalSlice/modalSlice";
import { fetchEmpresas } from "../../../redux/empresas/empresas";
import { FaWindowClose } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
export const Empresas = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchEmpresas());
  }, [dispatch]);


  const handleOpenModal=()=>{
    dispatch(modalActions.setModalValue())
    dispatch(modalActions.activeCreacionEmpresa(true))
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
          `https://qworkbaseback.up.railway.app/empresa/${id}`
        );

   
          Swal.fire({
            icon: "success",
            text: "Se eliminó correctamente",
            showConfirmButton: true,
            confirmButtonColor: "#347cc3",

          });
          dispatch(fetchEmpresas());
       
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
  const { empresas } = useSelector((state) => state.empresas);
  return (
    <div className={styles.container}>
            <div>

<h2>Empresas
</h2>
</div>
      <button onClick={handleOpenModal} className={styles.button}>
        <GoPlus></GoPlus> Crear una empresa
      </button>
    <table className={styles.table}>
    <thead className={styles.table_headers}>
    <tr>

         <th></th>
         <th>Descripcion de empresa</th>
          <th></th>
      </tr>

    </thead>
    <tbody>
   
      {empresas.length !== 0 ? (
        empresas.map((empresa, i) => (
          <tr key={i}>
            <td>{i}</td>
            <td key={i}>{empresa.DescripEmpresa}</td>
            <td>
                  <FaWindowClose
                    className={styles.disable_button}
                    onClick={() => handleDelete(empresa.id)}
                    title="Eliminar"
                  />
                </td>
          </tr>
        ))
      ) : (
        <td className="no_results">No hay empresas</td>
      )}
    </tbody>
      </table>
      </div>

  );
};
