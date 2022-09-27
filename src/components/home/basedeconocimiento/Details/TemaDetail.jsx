import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { fetchTema, temaActions } from "../../../../redux/temas/temas";
import styles from "./TemaDetail.module.scss";
import { TbArrowLeft, TbChevronsDownLeft } from "react-icons/tb";
import { NotFound } from "../../../../not_found/NotFound";
import pdf from "../../../../imglogo/pdfimg.png";
import Loading from "../../Loading/Loading";
import { BiLinkAlt } from "react-icons/bi";
import {FaFileVideo} from "react-icons/fa"
export const TemaDetail = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [visible, setIsVisible] = useState(false);

  setTimeout(function () {
    setIsVisible(true);
  }, 5000);
  useEffect(() => {
    dispatch(fetchTema(_id));
  }, [dispatch]);

  const handleOnclick = () => {
    dispatch(temaActions.getClean());
    if (location.pathname == `/home/${_id}`) {
      navigate("/home");
    } else {
      navigate("/admin");
    }
  };
  const { user } = useSelector((state) => state.user);

  const { tema } = useSelector((state) => state.temas);
  let regex =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  let urlSol = tema?.SolucionTema?.match(regex);
  let urlProblem = tema?.DescripTema?.match(regex);
  console.log(urlProblem)
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.titulo}>
          <button onClick={handleOnclick}>
            <div className={styles.buttonVolver}>
              <TbArrowLeft size={20}></TbArrowLeft>
              <p>Volver</p>
            </div>
          </button>
          <div className={styles.detail}>
            {tema ? (
              <div className={styles.detail}>
                {tema?.DescripTema ? (
                  <div>
                    <div>
                      <h1>{tema.tituloTema}</h1>
                    </div>

                    <div>
                      <h3>Descripción del problema:</h3>

                      {urlProblem!==null ?  <div>
  <span>{tema?.DescripTema?.replace(urlProblem,"" )}</span>
                   
                               <a
                          rel="noopener noreferrer"
                          href={urlProblem[0].slice(tema?.DescripTema)}
                          target="_blank"
                        >   
                                {urlProblem[0] }        
                        </a>
                          </div>
                      
                  : (
                        <p>{tema.DescripTema}</p>
                      )}{" "}  
                      
                      
                      <h3>Solución del problema:</h3>
                {urlSol!==null ?                                        <div>

                                   
              
                                      <div>
                                      <span>{tema?.SolucionTema?.replace(urlSol,"")}</span>
                                      <a
              
                                                                rel="noopener noreferrer"
                                        href={urlSol[0].slice(tema?.SolucionTema)}
                                        target="_blank"
                                        >
              {urlSol[0]}
                          </a>
                                        </div>
                                        </div>
                                  :(<p>{tema.SolucionTema}</p>) }

                      {tema.FileReferencia.data!==undefined ?
                      <div className={styles.documentos}>
                        <div className={styles.buttonU}>
                          <br></br>
                         
{/* <img src={tema.FileReferencia.data} width="1000px" height="1000px"/>        */}
       <h3>Documentos asociados:</h3>

                          <a download={tema.FileReferencia.name}  id={tema.FileReferencia.type}  href={tema?.FileReferencia?.data}
        target="_blank">                               <img width={40} src={pdf} alt="pdf" />
 </a>
                        </div>
                       
                  
                      </div>
                    :null}
                          </div>
                              {            tema?.url ?
                      <div className={styles.url}>
                        <br></br>
                        <h3>
                          Vínculo asociado: 
                        </h3>
                        <a
                          rel="noopener noreferrer"
                          id="url"
                          href={tema.url}
                          target="_blank"
                        >
                         <BiLinkAlt></BiLinkAlt> {tema.url}
                        </a>
                        
                      </div>
                      :null}
                    <br></br>
                    <span>
                      {tema.author}
                      <br></br>
                    </span>
                    <span>{tema.Date}</span>
                  </div>
                ) : (
                  !visible ?
                  <div>
                    <Loading></Loading>
                  </div>
                    :
                    <div>
                    <NotFound></NotFound>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <NotFound></NotFound>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
