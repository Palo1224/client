import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { modalActions } from "../../redux/modalSlice/modalSlice";
import { Auth } from "../auth/Auth";
import { fetchUsers } from "../../redux/user/users";
import { FaUsers ,FaUserTie,} from 'react-icons/fa'
import {IoBusinessSharp} from "react-icons/io5"
import {RiAdminFill,RiFolderSettingsFill} from "react-icons/ri"
import { Usuario } from "./Usuario/Usuario";
import { ClasifTema } from "./ClasificacionTema/ClasifTema";
import { SistRef } from "./SistemaRef/SistRef";
import { Perfil } from "./Perfil/Perfil";
import styles from "./admin.module.scss";
import {GiClassicalKnowledge} from "react-icons/gi"
import { BaseConocimiento } from "./BaseConocimento/BaseConocimiento";
import { Empresas } from "./Empresas/Empresas";
import { fetchEmpresas } from "../../redux/empresas/empresas";
export const Admin = () => {


  const dispatch=useDispatch()
  const select = JSON.parse(localStorage.getItem('select'))

   const [ selectOption, setSelectOption ] = useState(""||select)
   useEffect(() => {
    dispatch(fetchEmpresas())
  }, [ selectOption]);
   
  localStorage.setItem('search', JSON.stringify(""));
  localStorage.setItem('empresa', JSON.stringify(""));
  localStorage.setItem('estado', JSON.stringify(""));
  localStorage.setItem('select', JSON.stringify(selectOption));


  return (
    <div  className={styles.admin_container}>


        <div>
     
      <aside className={styles.admin_side_bar}>
      <div className={styles.side_bar_title}>
          <h3>Panel de Administración</h3>
        </div>

      <ul className={styles.side_bar_menu}>
        
        <li className={styles.side_bar_item}onClick={ () => setSelectOption("Base de Conocimiento") &&  localStorage.setItem('search', JSON.stringify("")) &&   localStorage.setItem('estado', JSON.stringify("")) &&   localStorage.setItem('empresa', JSON.stringify(""))}><GiClassicalKnowledge/><span>Contenidos</span></li>
        <li className={styles.side_bar_item} onClick={ () => setSelectOption("Clasificacion de Tema")&&  localStorage.setItem('search', JSON.stringify("")) &&   localStorage.setItem('estado', JSON.stringify("")) &&   localStorage.setItem('empresa', JSON.stringify(""))}><RiFolderSettingsFill/><span>Clasificiación de tema</span></li>
        <li className={styles.side_bar_item}onClick={ () => setSelectOption("Empresas")&&  localStorage.setItem('search', JSON.stringify("")) &&   localStorage.setItem('estado', JSON.stringify("")) &&   localStorage.setItem('empresa', JSON.stringify(""))}><IoBusinessSharp/><span>Empresas</span></li>
        <li className={styles.side_bar_item} onClick={ () => setSelectOption("Perfiles")&&  localStorage.setItem('search', JSON.stringify("")) &&   localStorage.setItem('estado', JSON.stringify("")) &&   localStorage.setItem('empresa', JSON.stringify(""))}> <FaUserTie/><span>Perfiles
          </span></li>
        <li className={styles.side_bar_item}  onClick={ () => setSelectOption("Sistema de Referencia") &&  localStorage.setItem('search', JSON.stringify("")) &&   localStorage.setItem('estado', JSON.stringify("")) &&   localStorage.setItem('empresa', JSON.stringify(""))}> <RiAdminFill/><p>Sistemas de Referencias</p></li>
        <li  className={styles.side_bar_item} onClick={ () => setSelectOption("Usuarios")&&  localStorage.setItem('search', JSON.stringify("")) &&   localStorage.setItem('estado', JSON.stringify("")) &&   localStorage.setItem('empresa', JSON.stringify(""))}> <FaUsers/><span>Usuarios
          </span></li>

      </ul>
    </aside>
    </div>

    {
              selectOption === "Empresas" && <Empresas/>
            }
    {
              selectOption === "Usuarios" && <Usuario/>        

            }
           {
              selectOption === "Perfiles" && <Perfil/>
            }
            {
              selectOption === "Clasificacion de Tema" && <ClasifTema />
            }
                        {
              selectOption === "Sistema de Referencia" && <SistRef />

            }
                                 {
              selectOption === "Base de Conocimiento" && <BaseConocimiento />
              
            }
            
    </div>
  );
};
