import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  fetchUsers } from "../../../redux/user/users";
import { FaWindowClose } from "react-icons/fa";
import {  MdDoneOutline } from "react-icons/md";
import axios from "axios";
import styles from "./table.module.scss";
import { GoPlus } from "react-icons/go";
import { MdCreate } from "react-icons/md";
import { modalActions } from "../../../redux/modalSlice/modalSlice";
import { Link } from "react-router-dom";
import { SearchBarAdmin } from "../SearchBarAdmin/SearchBarAdmin";


export const Usuario = () => {
  const bussi = JSON.parse(localStorage.getItem("empresa"));
  const searchLocal = JSON.parse(localStorage.getItem("search"));
  const state1 = JSON.parse(localStorage.getItem("estado"));
  const dispatch = useDispatch();
  const [state, setState] = useState("" || state1);
  const [business, setEmpresa] = useState("" || bussi);
  const { empresas } = useSelector((state) => state.empresas);
  const { users } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(
      fetchUsers({ search: searchLocal, estado: state, empresa: business })
    );
  }, [dispatch, state, business, bussi]);

  localStorage.setItem("estado", JSON.stringify(state));
  localStorage.setItem("empresa", JSON.stringify(business));

  const handleToggleButton = async (id) => {
    try {
      await axios.delete(
        `http://localhost:3001/users/${id}`
      );

      dispatch(
        fetchUsers({ search: searchLocal, estado: state, empresa: business })
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleOpenModalUsuario = () => {
    dispatch(modalActions.setModalValue());
    dispatch(modalActions.activeCreacionUsuario(true));
  };
  const handleSelectEstado = (e) => {
    setState(e.target.value);

    dispatch(
      fetchUsers({
        search: searchLocal,
        estado: e.target.value,
        empresa: business,
      })
    );
  };
  const handleSelectEmpresa = (e) => {
    setEmpresa(e.target.value);
    dispatch(
      fetchUsers({
        search: searchLocal,
        estado: state,
        empresa: e.target.value,
      })
    );
  };
  return (
    <div className={styles.container}>
      <div>
        <h2>Usuarios</h2>

      </div>
      <Link to={`/admin/crearUsuario`}>
        <button className={styles.button}>
          <GoPlus /> <p>Crear un Usuario</p>{" "}
        </button>
      </Link>

      <div className={styles.filtros}>
        <div className={styles.busquedas}>
          <SearchBarAdmin></SearchBarAdmin>
        </div>
        <div className={styles.options}>
          <label>Filtros por:</label>
          <div>
            <p>Estado del Usuario</p>
            <select value={state} onChange={handleSelectEstado}>
              {/* <option value="" disabled>
              Estado del Usuario
            </option> */}
              <option value=""> Todos</option>
              <option value={"Activos"}>Activados</option>
              <option value={"Desactivos"}>Desactivados</option>
            </select>
          </div>
          <div>
            <p>Empresas</p>
            <select
              className={styles.form_select}
              value={business}
              onChange={handleSelectEmpresa}
            >
              <option value="">Ningunos</option>
              {empresas &&
                empresas.map((e) => (
                  <option value={e} key={e.id}>
                    {e.DescripEmpresa}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>

      <table className={styles.table}>
        <thead className={styles.table_headers}>
          <tr>
            {/* <th>Usuario</th> */}

            <th>Nombre y Apellido</th>

            <th>Email</th>

            <th>Perfiles</th>

            <th>Sistema de Referencia</th>
            <th>Empresas</th>

            <th>Status</th>
            <th></th>
            <th></th>

          </tr>
        </thead>
        <tbody>
          {users ? (
            users.map((usuario, i) =>
              user.id !== usuario.id ? (
                <tr key={i}>

                  {/* <td>{usuario.usuar}</td>  */}

                   <td>{usuario.fullname}</td> 

                  <td>{usuario.email}</td>

                  <td>{usuario.idPerfiles}</td>
                  <td>
                    {usuario.idSistemas?.map((e) => (
                      <p > - {e}</p>
                    ))}
                  </td>

                  <td>
                    {usuario.idEmpresas?.map((r) => (
                      <p > - {r}</p>
                    ))}
                  </td>

                  <td>{usuario.active ? "Activado" : "Desactivado"}</td>

                  {usuario.active ? (
                    <td>
                      <FaWindowClose
                        className={styles.disable_button}
                        onClick={() => handleToggleButton(usuario.id)}
                        title="Desactivar"
                      />
                    </td>
                  ) : (
                    <td>
                      <MdDoneOutline
                        className={styles.enable_button}
                        onClick={() => handleToggleButton(usuario.id)}
                        title="Activar"
                      />
                    </td>
                  )}

                  <td key={usuario.id}>
                    <Link to={`/admin/EditUsuario/${usuario.id}`}>
                      <MdCreate />{" "}
                    </Link>
                  </td>
                </tr>
              ) : (
                null
              )
            )
          ) : (
            <td className="no_results">No hay Usuario!</td>
          )}
        </tbody>
      </table>
    </div>
  );
};
