import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPerfil } from "../../../redux/perfiles/perfil";
import { fetchSistRef } from "../../../redux/sistRef/sistRef";
import { fetchEmpresas } from "../../../redux/empresas/empresas";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import styles from "./CrearUsuario.module.scss";
import { TbArrowLeft } from "react-icons/tb";
import { MdClose } from "react-icons/md";

export const CrearUsuario = () => {
  const dispatch = useDispatch();
  const [estadoSistema, setestadoSistema] = useState([]);
  const [estadoEmpresa, setestadoEmpresa] = useState([]);
  const [state, setState] = useState({
    fullname: "",
    email: "",
    password: "",
    usuario: "",
    perfiles: "",
    sistRefe: [],
    empresa: [],
    validate: false,
  });
  const [error, setError] = useState({});
  useEffect(() => {
    dispatch(fetchPerfil());
    dispatch(fetchSistRef());
    dispatch(fetchEmpresas());
    // validate()
  }, [dispatch, state.validate, estadoSistema, estadoEmpresa]);
  const { perfil } = useSelector((state) => state.perfil);
  const { sistRef } = useSelector((state) => state.sistRef);
  const { empresas } = useSelector((state) => state.empresas);
  const {user} = useSelector(state=>state.user)
  const navigate = useNavigate();
  
  const handlePerfiles = (e) => {
    setState({
      ...state,
      perfiles: e.target.value,
    });

    delete error.perfiles;
    //  if(Object.entries(error).length === 0) state.validate=true
  };
  const handleEmpresas = (e) => {
    setState({
      ...state,
      empresa: [...state.empresa, e.target.value],
    });
    if (empresas.find((a) => a.DescripEmpresa == e.target.value)) {
      let agregar = empresas.find((a) => a.DescripEmpresa == e.target.value);
      setestadoEmpresa([...estadoEmpresa, agregar.DescripEmpresa]);
      if (estadoEmpresa.length == 0) {
        setestadoEmpresa([...estadoEmpresa, agregar.DescripEmpresa]);
      }
    }
    delete error.empresa;
  };
  const ClickCheckedSistemaRef = (e) => {
    setState({
      ...state,
      sistRefe: [...state.sistRefe, e.target.value],
    });
    if (sistRef.find((a) => a.DescripSistema == e.target.value)) {
      let agregar = sistRef.find((a) => a.DescripSistema == e.target.value);
      setestadoSistema([...estadoSistema, agregar.DescripSistema]);
      if (estadoSistema.length == 0) {
        setestadoSistema([...estadoSistema, agregar.DescripSistema]);
      }
    }

    delete error.sistRefe;
  };
  const handleDeleteSistRef = (id) => {
    const deletSistRef = state.sistRefe.filter((e) => e !== id);
    const deletEstadoSistR = estadoSistema.filter((e) => e !== id);
    setState({
      ...state,
      sistRefe: deletSistRef,
    });
    setestadoSistema(deletEstadoSistR);
  };
  const handleDeleteEmpresa = (id) => {
    const deletEmpresa = state.empresa.filter((e) => e !== id);
    const deletEstadoEmpresas = estadoEmpresa.filter((e) => e !== id);
    setState({
      ...state,
      empresa: deletEmpresa,
    });
    setestadoEmpresa(deletEstadoEmpresas);
  };

  const handleOnclick = () => {
    navigate(-1);
  };


  console.log(estadoSistema)
  var alpha = new RegExp("^[a-zA-Z0-9 ]+$");

  //sin numeros
  var notnumber = new RegExp("^[a-zA-Z ]+$");

  const handleChange = (event) => {
    if (Object.entries(error).length === 0) state.validate = true;

    !state.fullname
      ? (error.fullname = "Ingrese un nombre!")
      : delete error.fullname;
    !state.usuario
      ? (error.usuario = "Ingrese un usuario!")
      : delete error.usuario;
    !state.email ? (error.email = "Ingrese un mail!") : delete error.email;
    !state.password
      ? (error.password = "Ingrese una contraseña!")
      : delete error.password;

    !state.perfiles
      ? (error.perfiles = "Seleccione algunos de los perfiles")
      : delete error.perfiles;

    state.sistRefe.length == 0
      ? (error.sistRefe = "Seleccione algunos de los sistemas")
      : delete error.sistRefe;

    state.empresa.length == 0
      ? (error.empresa = "Seleccione algunos de empresas")
      : delete error.empresa;
    setState((prevProps) => ({
      ...prevProps,
      [event.target.name]: event.target.value,
    }));

    if (Object.entries(error).length === 0) state.validate = true;
  };

  const postUsuario = async () => {
    try {
      const res = await axios.post("http://localhost:3001/users", {
        fullname: state.fullname,
        usuar: state.usuario,
        email: state.email,
        password: state.password,
        idPerfiles: state.perfiles,
        idSistemas: state.sistRefe,
        idEmpresas: state.empresa,
        active: true,
        // Date:new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) )
      });
      if (res.data) {
        Swal.fire({
          icon: "success",
          title: "Se creó correctamente!",
          showConfirmButton: true,
        });
        user.idPerfiles=="Administrador"? navigate("/admin"):navigate("/crearUsuario")
      } else {
        Swal.fire({
          icon: "error",
          text: res.data,
          showConfirmButton: true,

          cancelButtonColor: '#d33',

        });

      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error.response.data,
        showConfirmButton: true,

        cancelButtonColor: '#d33',

      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.entries(error).length === 0) state.validate = true;
    state.validate
      ? postUsuario()
      : Swal.fire({ icon: "error", text: "Por favor complete todo!" });
  };

  return (
    <div className={styles.todo}>
      <button onClick={handleOnclick}>
        <div className={styles.buttonVolver}>
          <TbArrowLeft size={20}></TbArrowLeft>
          <p>Volver</p>
        </div>
      </button>

      <div className={styles.container}>
        <div className={styles.form_title}>
          <h2>Creando un usuario</h2>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.dentro}>
            <div className={styles.create_job_form}>
              <div className={styles.form_left_column}>
                <label>Usuario</label>
                <div>
                  <input
                    type="text"
                    onChange={handleChange}
                    name="usuario"
                    value={state.usuario}
                  ></input>
                </div>
                {error.usuario && (
                  <span className={styles.error}>{error.usuario}</span>
                )}

                <label>Apellido y Nombre</label>
                <div>
                  <input
                    type="text"
                    onChange={handleChange}
                    name="fullname"
                    value={state.fullname}
                  ></input>
                </div>

                {error.fullname && (
                  <span className={styles.error}>{error.fullname}</span>
                )}
                <label>Mail</label>
                <div>
                  <input
                    type="text"
                    onChange={handleChange}
                    name="email"
                    value={state.email}
                  ></input>
                </div>
                {error.email && (
                  <span className={styles.error}>{error.email}</span>
                )}
                <label>Contraseña</label>
                <div>
                  <input
                    type="text"
                    onChange={handleChange}
                    name="password"
                    value={state.password}
                  ></input>
                </div>
                {error.password && (
                  <span className={styles.error}>{error.password}</span>
                )}
              </div>
            </div>
            <div>
              <div className={styles.form_right_column}>
                <div>
                  <label>Tipo de Perfil</label>
                  <select
                    className={styles.form_select}
                    defaultValue={""}
                    onChange={handlePerfiles}
                  >
                    <option value="" disabled>
                      Tipo de perfil
                    </option>
                    {perfil &&
                      perfil.map((e) => (
                        <option value={e.DescripPerfil} key={e.id}>
                          {e.DescripPerfil}
                        </option>
                      ))}
                  </select>
                  <br></br>
                  {error.perfiles ? (
                    <span className={styles.error}>{error.perfiles}</span>
                  ) : null}
                </div>
                <div>
                  <label>Sistema Relacionado</label>
                  <br></br>

                  <select
                    className={styles.form_select}
                    defaultValue={""}
                    onChange={ClickCheckedSistemaRef}
                  >
                    <option value="" disabled>
                      Sistemas Relacionados
                    </option>
                    {sistRef &&
                      sistRef.map((e) => (
                        <option value={e.DescripSistema} key={e.id}>
                          {e.DescripSistema}
                        </option>
                      ))}
                  </select>
                  <div className={styles.added_perfiles}>
                    {estadoSistema.map((e) => (
                      <div  key={e}>
                        <p>
                          {e}{" "}
                          <MdClose
                            onClick={() => handleDeleteSistRef(e)}
                            className={styles.delete_added_tech}
                          />
                        </p>
                      </div>
                    ))}
                    <br></br>

                    {error.sistRefe && (
                      <span className={styles.error}>{error.sistRefe}</span>
                    )}
                  </div>

                  <div>
                    <label>Empresas</label>
                    <br></br>

                    <select
                      className={styles.form_select}
                      defaultValue={""}
                      onChange={handleEmpresas}
                    >
                      <option value="" disabled>
                        Empresas
                      </option>
                      {empresas &&
                        empresas.map((e) => (
                          <option value={e.DescripEmpresa} key={e.id}>
                            {e.DescripEmpresa}
                          </option>
                        ))}
                    </select>
                    <div className={styles.added_perfiles}>
                      {estadoEmpresa.map((e) => (
                        <div  key={e}>
                          <p>
                            {e}
                            <MdClose
                              onClick={() => handleDeleteEmpresa(e)}
                              className={styles.delete_added_tech}
                            />
                          </p>
                        </div>
                      ))}

                      {error.empresas && (
                        <span className={styles.error}>{error.empresas}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.f_button}>
            <button type="submit">Enviar</button>
          </div>
        </form>
        {error.data ? <span className={styles.error}>{error.data}</span> : null}
      </div>
    </div>
  );
};
