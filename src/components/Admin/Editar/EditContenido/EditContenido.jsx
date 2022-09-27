import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPerfil } from "../../../../redux/perfiles/perfil";
import { fetchSistRef } from "../../../../redux/sistRef/sistRef";
import { fetchClasifTema } from "../../../../redux/clasifTema/clasifTema";
import Swal from "sweetalert2";
import axios from "axios";
import styles from "../../Creacion/CreacionTema/CreacionDeTema.module.scss";
import { fetchEmpresas } from "../../../../redux/empresas/empresas";
import {TbArrowLeft} from "react-icons/tb"
import { useNavigate, useParams } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { FaFileVideo } from "react-icons/fa";
import pdf from "../../../../imglogo/pdfimg.png";



export const EditContenido = () => {
  const {_id}=useParams()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {temas} = useSelector((state) => state.temas);
let detail = temas.find((e) => e._id == _id);
const [load,setLoad]=useState(false)



  const [state, setState] = useState({
    tituloTema:detail?.tituloTema,
    DescripTema:detail?.DescripTema,
    SolucionTema:detail?.SolucionTema,
    perfiles:detail?.idPerfiles,
    sistRefe: detail?.idSistemas,
    empresa:detail?.idEmpresa,
    clasifTema: detail?.idClasif,
    validate: false,
  });
  
  const [previewSource, setPreviewSource] = useState(detail?.FileReferencia||"");
  const [urla, setUrl] = useState(""||detail?.url);
  const [error, setError] = useState({});
  const [estadoperfil, setestadoperfil] = useState(state.perfiles);
  const [estadoSistema, setestadoSistema] = useState(state.sistRefe);
  const [estadoEmpresa, setestadoEmpresa] = useState(state.empresa);
  const { perfil } = useSelector((state) => state.perfil);
  const { sistRef } = useSelector((state) => state.sistRef);
  const { clasifTema } = useSelector((state) => state.clasifTema);
  const { empresas } = useSelector((state) => state.empresas);
 const {user}=useSelector(state=>state.user)
 const handlePerfiles = (e) => {
  setState({
    ...state,
    perfiles: [...state.perfiles, e.target.value],
  });
  if (perfil.find((a) => a._id == e.target.value)) {
    let agregar = perfil.find((a) => a._id == e.target.value);

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
  if (empresas.find((a) => a._id == e.target.value)) {
    let agregarempresa = empresas.find((a) => a._id == e.target.value);
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
  if (sistRef.find((a) => a._id == e.target.value)) {
    let agregar = sistRef.find((a) => a._id == e.target.value);
    if (
      estadoSistema.length > 0 &&
      !estadoSistema
        ?.map((el) => el.DescripSistema)
        .includes(agregar.DescripSistema)
    ) {
      setestadoSistema([...estadoSistema, agregar]);
    }
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
  const deletEstado = estadoperfil.filter((e) => e._id !== id);
  setState({
    ...state,
    perfiles: deletPerfil,
  });
  setestadoperfil(deletEstado);
};
const handleDeleteEmpresa = (id) => {
  const deletEmpresa = state.empresa.filter((e) => e !== id);
  const deletEstadoEmpresas = estadoEmpresa.filter((e) => e._id !== id);
  setState({
    ...state,
    empresa: deletEmpresa,
  });
  setestadoEmpresa(deletEstadoEmpresas);
};

const handleDeleteSistRef = (id) => {
  const deletSistRef = state.sistRefe.filter((e) => e !== id);
  const deletEstadoSistR = estadoSistema.filter((e) => e._id !== id);
  setState({
    ...state,
    sistRefe: deletSistRef,
  });
  setestadoSistema(deletEstadoSistR);
};
useEffect(() => {
  dispatch(fetchPerfil());
  dispatch(fetchSistRef());
  dispatch(fetchClasifTema());
  dispatch(fetchEmpresas())


}, [dispatch]);

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
const postTema = async (base64EncodeFile,_id) => {
  try {
    
    setLoad(true)

    if(base64EncodeFile)
    {


   
        const temaM=await axios.put(
          `https://qworkapi.herokuapp.com/contenidos/${_id}`,
          {
            tituloTema: state.tituloTema,
            DescripTema: state.DescripTema,
            SolucionTema: state.SolucionTema,
            idPerfiles: estadoperfil,
            idSistemas: estadoSistema,
            idClasif: state.clasifTema,
            author: user.fullName,
            FileReferencia: base64EncodeFile,
            idEmpresa: estadoEmpresa,
            url: urla,
            date: new Date(),
          }
        );
        if (temaM) {
          Swal.fire({
            icon: "success",
            text: "Se modificó correctamente",
            confirmButtonColor: "#347cc3",
            confirmButtonText: "Ok",
          });
          navigate("/admin")
        } else {
          Swal.fire({
            icon: "error",
            text: "Compruebe bien",
            confirmButtonColor: "#d33",
            confirmButtonText: "Ok",
          });
        }
    
     
      }
      else{
        const temaM=await axios.put(
          `https://qworkapi.herokuapp.com/contenidos/${_id}`,
          {
            tituloTema: state.tituloTema,
            DescripTema: state.DescripTema,
            SolucionTema: state.SolucionTema,
            idPerfiles: estadoperfil,
            idSistemas: estadoSistema,
            idClasif: state.clasifTema,
            author: user.fullName,
            FileReferencia: previewSource,
            idEmpresa: estadoEmpresa,
            url: urla,
            date: new Date(),
          }
        );
        if (temaM) {
          Swal.fire({
            icon: "success",
            text: "Se modificó correctamente",
            confirmButtonColor: "#347cc3",
            confirmButtonText: "Ok",
          });
          navigate("/admin")
        } else {
          Swal.fire({
            icon: "error",
            text: "Compruebe bien",
            confirmButtonColor: "#d33",
            confirmButtonText: "Ok",
          });
        }
      }
     

  } catch (error) {
    Swal.fire({
      icon: "error",
      text: "Compruebe bien",
      confirmButtonColor: "#d33",
      confirmButtonText: "Ok",
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
    ? postTema(previewSource,_id)
    : Swal.fire({ icon: "error", text: "Por favor complete todo!" });
};
const url = (e) => {
  setUrl(e.target.value);
};
return (
  <div className={styles.todo}>
    {user.idPerfiles.DescripPerfil !== "Redactor" ? (
      <button onClick={handleOnclick}>
        <div className={styles.buttonVolver}>
          <TbArrowLeft size={20}></TbArrowLeft>
          <p>Volver</p>
        </div>
      </button>
    ) : (
      <></>
    )}
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
      <div className={styles.form_title}>
        <h2>Modificando un contenido</h2>
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
                      perfil?.map((e) => (
                        <option value={e._id} key={e._id}>
                          {e.DescripPerfil}
                        </option>
                      ))}
                  </select>
                  <div className={styles.added_perfiles}>
                    {estadoperfil?.map((e) => (
                      <div key={e._id}> 
                        <p>
                          {e.DescripPerfil}{" "}
                          <MdClose
                            onClick={() => handleDelete(e._id)}
                            className={styles.delete_added_tech}
                          />
                        </p>
                      </div>
                    ))}
                    {error.perfiles && (
                      <span className={styles.error}>{error.perfiles}</span>
                    )}
                  </div>
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
                      sistRef?.map((e) => (
                        <option value={e._id} key={e._id}>
                          {e.DescripSistema}
                        </option>
                      ))}
                  </select>
                  <div className={styles.added_perfiles}>
                    {estadoSistema?.map((e) => (
                      <div key={e._id}>
                        <p>
                          {e.DescripSistema}{" "}
                          <MdClose
                            onClick={() => handleDeleteSistRef(e._id)}
                            className={styles.delete_added_tech}
                          />
                        </p>
                      </div>
                    ))}

                    {error.sistRefe && (
                      <span className={styles.error}>{error.sistRefe}</span>
                    )}
                  </div>
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
                      empresas?.map((e) => (
                        <option value={e._id} key={e._id}>
                          {e.DescripEmpresa}
                        </option>
                      ))}
                  </select>
                  <div className={styles.added_perfiles}>
                    {estadoEmpresa?.map((e) => (
                      <div key={e._id}>
                        <p>
                          {e.DescripEmpresa}
                          <MdClose
                            onClick={() => handleDeleteEmpresa(e._id)}
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
                      clasifTema?.map((e) => (
                        <option value={e._id} key={e._id}>
                          {e.DescripClasif}
                        </option>
                      ))}
                  </select>
                  <br></br>
                  {state.clasifTema?.DescripClasif ?
                  <div className={styles.added_perfiles}>

                  <p>{state.clasifTema?.DescripClasif}</p>
                  </div>:null}
                  {error.clasifTema ? (
                    <span className={styles.error}>{error.clasifTema}</span>
                  ) : null}
                </div>
              </div>
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
          {error.archivo && (
            <span className={styles.error}>{error.archivo}</span>
          )}
                              {previewSource?.data!==undefined ?
                      <div className={styles.documentos}>
                        <div className={styles.buttonU}>
                          <br></br>

                          <h3>Documentos asociados:</h3>
                          {previewSource?.type=="application/pdf" ?
                            //    <a
                            //    id="pdf"
                            //    rel="noopener noreferrer"
                            //    href={`https://res.cloudinary.com/cloudposarg/${previewSource.resource_type?.replace(
                            //      /["']/g,
                            //      ""
                            //    )}/upload/v1659469712/${
                            //     previewSource?.data
                            //    }.pdf`}
                            //    target="_blank"
                            //  >
                            <a download={previewSource?.name}  id={previewSource.type}  href={previewSource?.data}
                            target="_blank">   
                               <img width={40} src={pdf} alt="pdf" />
                             </a>
                          :           
                          <a download={previewSource?.name}  id={previewSource.type}  href={previewSource?.data}
                          target="_blank">   
                           
                           
                          <FaFileVideo size={50}></FaFileVideo>
                          {/* <img width={40} src={pdf} alt="pdf" /> */}
                        </a>}
                          
                     
                        </div>
                      </div>
                    :null}
          <div>
            <label>Link relacionado:</label>
          </div>
          <div className={styles.url}>
            <input
              onChange={url}
              type="url"
              id="url"
              placeholder="https://example.com"
              name="url"
              size="30"
              value={urla}
            />
          </div>
        </div>
        <div className={styles.f_button}>
          <button type="submit">Enviar</button>
        </div>
      </form>
      <p>
        Autor: <input disabled value={user.fullName}></input>
      </p>
    </div>}
  </div>
);
};