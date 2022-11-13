import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import styles from "./userNav.module.scss";
import userlogo from "../../../imglogo/descarga1.png";
import { logout } from '../../../redux/user/users'

export const UserNav = () => {
  const navigate = useNavigate(); 
  const {user}=useSelector(state=>state.user)
  const [toggleMenu, setToggleMenu] = useState(false);
const dispatch=useDispatch();

  window.onclick = function () {
    setToggleMenu(false);
  };
  const handleMenu = () => {
    setTimeout(() => setToggleMenu(true), 10);
  };
  // useEffect(()=>{

  // },[toggleMenu])
  const handleLogout = () => {
    localStorage.setItem("search", JSON.stringify(""));
    localStorage.setItem("empresa", JSON.stringify(""));
    window.location.href ="/home"
    setToggleMenu(false);
    dispatch(logout())
  };
  
  const handleInicio = () => {
   
    window.location.href ="/home"
    setToggleMenu(false);
    dispatch()

  };
  const handleAdmin = () => {
   
    window.location.href ="/admin"
    setToggleMenu(false);
    dispatch()

  };

  return (
    <div>
      <div onClick={handleMenu}  className={styles.logged_user_icon}>
        <div className={styles.logouser}>
          
          <img src={userlogo} alt="logo user" />
        <p>{user?.fullname}</p>
        </div>
        <div
        className={`${toggleMenu && styles.active} ${styles.logged_user_menu}`}
        >
        {user.idPerfiles=="Administrador" ?
  <div className={styles.option1}>
             <span  onClick={handleInicio}>
        Inicio
        </span>
        <span  onClick={handleAdmin}>
        Admin
        </span>
        <span className={styles.option} onClick={handleLogout}>
          Cerrar Sesion
        </span>
      </div>
        :
 <div>
        <span className={styles.option} onClick={handleLogout}>
          Cerrar Sesion
        </span>
      </div>}
      </div>
      </div>


    </div>
  );
};
