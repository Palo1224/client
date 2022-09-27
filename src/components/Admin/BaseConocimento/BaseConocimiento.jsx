import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaWindowClose } from "react-icons/fa";
import { MdDoneOutline } from "react-icons/md";
import axios from "axios";
import { CrearUsuario } from "../Creacion/CrearUsuario";
import { MdCreate } from "react-icons/md";
import { GoPlus } from "react-icons/go";
import { fetchTema, fetchTemas } from "../../../redux/temas/temas";
import { AiOutlineEye } from "react-icons/ai";
import { Link, Navigate, useNavigate,  } from "react-router-dom";
import styles from "./tablaBasedeConocimiento.module.scss";
import { SearchBarAdmin } from "../SearchBarAdmin/SearchBarAdmin";
import Swal from "sweetalert2";
import { FilterBar } from "../../home/FilterBar/FilterBar";
export const BaseConocimiento = () => {
  const dispatch = useDispatch();
const navigate=useNavigate()
  const {user}=useSelector(state=>state.user)

  const id=user._id
  useEffect(() => {
    dispatch(fetchTemas({id:id}));
  }, [dispatch]);

  const { temas } = useSelector((state) => state.temas);

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
          `https://qworkapi.herokuapp.com/contenidos/${_id}`
        );

   
          Swal.fire({
            icon: "success",
            text: "Se eliminó correctamente",
            showConfirmButton: true,
            confirmButtonColor: "#347cc3",

          });
          dispatch(fetchTemas({id:id}));
       
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
 const handleEdit=(id)=>{
    dispatch(fetchTema(id))
    navigate(`/admin/EditContenido/${id}`)
 }
  return (
    <div className={styles.container}>
      <div>
        <h2>Contenidos</h2>
      </div>
      <div>
        <button className={styles.button}>
          <GoPlus />{" "}
          <Link to={`/crearTema`}>
            {" "}
            <p>Crear un contenido</p>
          </Link>
        </button>
      </div>
      <div className={styles.filtro}>
      <div className={styles.busquedas}>
        <SearchBarAdmin></SearchBarAdmin>
      </div>

      <div className={styles.filtros}>
        <FilterBar></FilterBar>
      </div>
      </div>
 
      <table className={styles.table}>
        <thead className={styles.table_headers}>
          <tr>
            <th>Ref</th>
            <th>Titulo</th>
            <th>Descripcion</th>

            <th>Perfiles</th>

            <th>Sistema de Referencia</th>
            <th>Empresas</th>

            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {temas && temas.length !== 0 ? (
            temas.map((tema, i) => (
              <tr key={i}>
                  <td>#{tema.referencia}</td>
                <td>{tema.tituloTema.slice(0, 70)}</td>

                <td>{tema.DescripTema.slice(0, 70)}</td>
                <td>
                  {tema.idPerfiles.map((e) => (
                    <span key={e._id}>
                      - {e.DescripPerfil}
                      <br></br>
                    </span>
                  ))}
                </td>

                <td>
                  {tema.idSistemas.map((e) => (
                    <span key={e._id}>
                      - {e.DescripSistema}
                      <br></br>
                    </span>
                  ))}
                </td>
                
                
                <td>
                  {tema.idEmpresa.map((e) => (
                    <span key={e._id}>
                      - {e.DescripEmpresa}
                      <br></br>
                    </span>
                  ))}
                </td>


                <td key={tema._id}>
                  {/* <Link to={`/admin/EditContenido/${tema._id}`}> */}
                    <MdCreate  onClick={() => handleEdit(tema._id)} title="Editar el contenido" />{" "}
                  {/* </Link> */}
                </td>
                <td>
                  <Link to={`/admin/${tema._id}`}>
                    <AiOutlineEye title="Ver el contenido"></AiOutlineEye>
                  </Link>
                </td>
                <td>
                  <FaWindowClose
                    className={styles.disable_button}
                    onClick={() => handleDelete(tema._id)}
                    title="Eliminar"
                  />
                </td>
              </tr>
            ))
          ) : (
            <td className="no_results">No hay contenidos!</td>
          )}
        </tbody>
      </table>
    </div>
  );
};
