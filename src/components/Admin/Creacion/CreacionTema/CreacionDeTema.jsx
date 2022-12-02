import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPerfil } from "../../../../redux/perfiles/perfil";
import { fetchSistRef } from "../../../../redux/sistRef/sistRef";
import { fetchClasifTema } from "../../../../redux/clasifTema/clasifTema";
import Swal from "sweetalert2";
import axios from "axios";
import styles from "./CreacionDeTema.module.scss";
import { fetchEmpresas } from "../../../../redux/empresas/empresas";
import { TbArrowLeft } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";
import Loading from "../../../home/Loading/Loading";
import { modalActions } from "../../../../redux/modalSlice/modalSlice";
export const CreacionDeTema = () => {
  const navigate = useNavigate();
  const [estadoperfil, setestadoperfil] = useState([]);
  const [estadoSistema, setestadoSistema] = useState([]);
  const [estadoEmpresa, setestadoEmpresa] = useState([]);
  const [load,setLoad]=useState(false)
  const dispatch = useDispatch();
  const [state, setState] = useState({
    tituloTema: "",
    DescripTema: "",
    SolucionTema: "",
    perfiles: [],
    sistRefe: [],
    empresa: [],
    clasifTema: "",
    validate: false,
  });
  useEffect(() => {
    dispatch(fetchPerfil());
    dispatch(fetchSistRef());
    dispatch(fetchClasifTema());
    dispatch(fetchEmpresas());

  }, [dispatch, state.validate, estadoperfil,estadoEmpresa,load]);
  const handleOpenLoginAdmin = () => {
    dispatch(modalActions.setModalValue());
    dispatch(modalActions.activeLoadingArchivo(true));
  };

  const { perfil } = useSelector((state) => state.perfil);
  const { sistRef } = useSelector((state) => state.sistRef);
  const { clasifTema } = useSelector((state) => state.clasifTema);
  const { empresas } = useSelector((state) => state.empresas);

  const [previewSource, setPreviewSource] = useState({
    data:"",
    type:"",
    name:""
  });
  const [urla, setUrl] = useState("");

  const [error, setError] = useState({});
  const { user } = useSelector((state) => state.user);
  const handlePerfiles = (e) => {
    setState({
      ...state,
      perfiles: [...state.perfiles, e.target.value],
    });
    if (perfil.find((a) => a.DescripPerfil == e.target.value)) {
      let agregar = perfil.find((a) => a.DescripPerfil == e.target.value);
      if (
        estadoperfil.length > 0 &&
        !estadoperfil
          ?.map((el) => el.DescripPerfil)
          .includes(agregar.DescripPerfil)
      ) {
        setestadoperfil([...estadoperfil, agregar]);
      }
      if (estadoperfil.length == 0) {
        setestadoperfil([...estadoperfil, agregar]);
      }
    }

    delete error.perfiles;
  };
  const handleEmpresas = (e) => {
    setState({
      ...state,
      empresa: [...state.empresa, e.target.value],
    });
    if (empresas.find((a) => a.DescripEmpresa == e.target.value)) {
      let agregarempresa = empresas.find((a) => a.DescripEmpresa == e.target.value);
      if (
        estadoEmpresa.length > 0 &&
        !estadoEmpresa
          ?.map((el) => el.DescripEmpresa)
          .includes(agregarempresa.DescripEmpresa)
      ) {
        setestadoEmpresa([...estadoEmpresa, agregarempresa]);
      }
      if (estadoEmpresa.length == 0) {
        setestadoEmpresa([...estadoEmpresa, agregarempresa]);
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
      setestadoSistema([...estadoSistema, agregar]);
      if (estadoSistema.length == 0) {
        setestadoSistema([...estadoSistema, agregar]);
      }
    }

    delete error.sistRefe;
  };
  const handleSelect = (e) => {
    setState({ ...state, clasifTema: e.target.value });

    delete error.clasifTema;
  };

  const handleDelete = (id) => {
    const deletPerfil = state.perfiles.filter((e) => e !== id);
    const deletEstado = estadoperfil.filter((e) => e.id !== id);
    setState({
      ...state,
      perfiles: deletPerfil,
    });
    setestadoperfil(deletEstado);
  };
  const handleDeleteEmpresa = (id) => {
    const deletEmpresa = state.empresa.filter((e) => e !== id);
    const deletEstadoEmpresas = estadoEmpresa.filter((e) => e.id !== id);
    setState({
      ...state,
      empresa: deletEmpresa,
    });
    setestadoEmpresa(deletEstadoEmpresas);
  };

  const handleDeleteSistRef = (id) => {
    const deletSistRef = state.sistRefe.filter((e) => e !== id);
    const deletEstadoSistR = estadoSistema.filter((e) => e.id !== id);
    setState({
      ...state,
      sistRefe: deletSistRef,
    });
    setestadoSistema(deletEstadoSistR);
  };

  const handleChange = (event) => {
    !state.tituloTema
      ? (error.tituloTema = "Ingrese un título!")
      : delete error.tituloTema;

    !state.DescripTema
      ? (error.DescripTema = "Ingrese una descripción!")
      : delete error.DescripTema;
    !state.SolucionTema
      ? (error.SolucionTema = "Ingrese una solución del problema!")
      : delete error.SolucionTema;

    state.perfiles.length == 0
      ? (error.perfiles = "Seleccione algunos de los perfiles")
      : delete error.perfiles;

    state.sistRefe.length == 0
      ? (error.sistRefe = "Seleccione algunos de los sistemas")
      : delete error.sistRefe;
    state.empresa.length == 0
      ? (error.empresa = "Seleccione algunos de empresas")
      : delete error.empresa;
    !state.clasifTema
      ? (error.clasifTema = "Ingrese una clasificacion del problema!")
      : delete error.clasifTema;


    setState((prevProps) => ({
      ...prevProps,
      [event.target.name]: event.target.value,
    }));
    if (Object.entries(error).length === 0) state.validate = true;
  };

  const previewFile = (file,type,name) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource({data:reader.result,type:type,name:name});
    };
  };
  const handleFile = (e) => {
    const file = e.target.files[0];
    const type=e.target.files[0].type
    const name=e.target.files[0].name
    previewFile(file,type,name);
  };

  const postTema = async (base64EncodeFile) => {
    try {
          setLoad(true)

      if(base64EncodeFile)
      {


        
        const todo=await axios.post("http://localhost:3001/contenidos", {
          tituloTema: state.tituloTema,
          DescripTema: state.DescripTema,
          SolucionTema: state.SolucionTema,
          perfile: state.perfiles,
          sistema: state.sistRefe,
          idClasif: state.clasifTema,
          author: user.fullname,
          FileReferencia:base64EncodeFile,
          empresa: state.empresa,
          url:urla,
          date: new Date(),
        });
        if (todo.data) {
          Swal.fire({
            icon: "success",
            text: "Se creó correctamente",
  
            showConfirmButton: false,
            confirmButtonColor: "#347cc3",
          });
          if (user.idPerfiles == "Administrador")
            navigate("/admin");
        }

      }
      else 
      {
        const todo=await axios.post("http://localhost:3001/contenidos", {
          tituloTema: state.tituloTema,
          DescripTema: state.DescripTema,
          SolucionTema: state.SolucionTema,
          perfile: state.perfiles,
          sistema: state.sistRefe,
          idClasif: state.clasifTema,
          author: user.fullname,
          empresa: state.empresa,
          url:urla,
          date: new Date(),
        });
        if (todo.data) {
          Swal.fire({
            icon: "success",
            text: "Se creó correctamente",
  
            showConfirmButton: false,
            confirmButtonColor: "#347cc3",
          });
          if (user.idPerfiles == "Administrador")
            navigate("/admin");
        }
       }
 

    
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error.response.data,
        confirmButtonColor: "#347cc3",
        showConfirmButton: true,
      });
    }
    setLoad(false)

    
  };

  const handleOnclick = () => {
    navigate("/admin");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.entries(error).length === 0) state.validate = true;
    state.validate
      ? postTema(previewSource)
      : Swal.fire({
          icon: "error",
          text: "Por favor complete todo!",
          confirmButtonColor: "#347cc3",
          showConfirmButton: true,
        });
  };
  const url = (e) => {
    setUrl(e.target.value);
  };

  return (
    <div className={styles.todo}>


      {  load ?
                  
                  <div className={styles.containerloading}>
        <div className={styles.spinner}>
     

        </div>
        <div>
        <h3>Subiendo el contenido...</h3>
            </div>

    </div>

                    :
                    
      <div className={styles.container}>
        
      {user.idPerfiles !== "Redactor" ? (
        <button onClick={handleOnclick}>
          <div className={styles.buttonVolver}>
          <TbArrowLeft size={20}></TbArrowLeft>
            <p>Volver</p>
          </div>
        </button>
      ) : (
        <></>
      )}

        <div className={styles.form_title}>
          <h2>Creando un contenido</h2>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div>
            <div className={styles.create_job_form}>
              <div className={styles.form_left_column}>
                <label>Título </label>
                <div className={styles.textareatitulo}>
                  <textarea
                    name="tituloTema"
                    columns="4"
                    rows="2"
                    type="text"
                    value={state.tituloTema}
                    onChange={handleChange}
                  ></textarea>
                </div>
                {error.tituloTema && (
                  <span className={styles.error}>{error.tituloTema}</span>
                )}

                <label>Descripción </label>
                <div>
                  <textarea
                    name="DescripTema"
                    columns="6"
                    rows="5"
                    type="text"
                    value={state.DescripTema}
                    onChange={handleChange}
                  ></textarea>
                </div>
                {error.DescripTema && (
                  <span className={styles.error}>{error.DescripTema}</span>
                )}
                <label>Solución</label>
                <div>
                  <textarea
                    name="SolucionTema"
                    columns="40"
                    rows="6"
                    type="text"
                    value={state.SolucionTema}
                    onChange={handleChange}
                  ></textarea>
                </div>
                {error.SolucionTema && (
                  <span className={styles.error}>{error.SolucionTema}</span>
                )}
              </div>
              <div className={styles.form_right_column}>
                <div className={styles.form_right_column2}>
                  <div>
                    <label>Perfiles Habilitados</label>
                    <br></br>

                    <select
                      className={styles.form_select}
                      defaultValue={""}
                      onChange={handlePerfiles}
                    >
                      <option value="" disabled>
                        Perfiles Habilitados
                      </option>
                      {perfil &&
                        perfil.map((e) => (
                          <option value={e.DescripPerfil} key={e.id}>
                            {e.DescripPerfil}
                          </option>
                        ))}
                    </select>
                    <div className={styles.added_perfiles}>
                      {estadoperfil.map((e) => (
                        <div>
                          <p key={e.id}>
                            {e.DescripPerfil}{" "}
                            <MdClose
                              onClick={() => handleDelete(e.id)}
                              className={styles.delete_added_tech}
                            />
                          </p>
                        </div>
                      ))}
                    </div>
                    {error.perfiles && (
                      <span className={styles.error}>{error.perfiles}</span>
                    )}
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
                        <div>
                          <p key={e.id}>
                            {e.DescripSistema}{" "}
                            <MdClose
                              onClick={() => handleDeleteSistRef(e.DescripSistema)}
                              className={styles.delete_added_tech}
                            />{" "}
                          </p>
                        </div>
                      ))}
                    </div>

                    {error.sistRefe && (
                      <span className={styles.error}>{error.sistRefe}</span>
                    )}
                  </div>
                </div>
                <div className={styles.form_right_column3}>
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
                          <option value={e.DescripSistema} key={e.id}>
                            {e.DescripEmpresa}
                          </option>
                        ))}
                    </select>
                    <div className={styles.added_perfiles}>
                      {estadoEmpresa.map((e) => (
                        <div>
                          <p key={e.id}>
                            {e.DescripEmpresa}
                            <MdClose
                              onClick={() => handleDeleteEmpresa(e.id)}
                              className={styles.delete_added_tech}
                            />
                          </p>
                        </div>
                      ))}

                      {error.empresa && (
                        <span className={styles.error}>{error.empresa}</span>
                      )}
                    </div>
                  </div>

                  <div className={styles.clasifTema}>
                    <label>Tipo de Clasificacion</label>
                    <br></br>

                    <select
                      className={styles.form_select}
                      defaultValue={""}
                      onChange={handleSelect}
                    >
                      <option value="" disabled>
                        Tipo de Clasificacion
                      </option>
                      {clasifTema &&
                        clasifTema.map((e) => (
                          <option value={e.DescripClasif} key={e.id}>
                            {e.DescripClasif}
                          </option>
                        ))}
                    </select>
                    <br></br>
                    {error.clasifTema ? (
                      <span className={styles.error}>{error.clasifTema}</span>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className={styles.form_button}>
                <div>
                  <label>Archivo asociado:</label>
                </div>
                <div>
                  <input
                    className={styles.sendFile}
                    type="file"
                    accept="video/mp4,video/x-m4v,video/*,application/pdf"
                    onChange={handleFile}
                  ></input>
                </div>
          
                <div>
                  <label>Link relacionado:</label>
                </div>
                <div className={styles.url}>
                  <input
                    onChange={url}
                    type="url"
                    id="url"
                    pattern="https://.*"
                    placeholder="https://example.com"
                    name="url"
                    size="30"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.f_button}>
            <button type="submit">Enviar</button>
          </div>
        </form>
        <p>
          Autor: <input disabled value={user.fullname}></input>
        </p>
    
      </div>}
    </div>
  );
};
