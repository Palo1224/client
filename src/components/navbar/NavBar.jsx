import React from "react";
import logo from "../../imglogo/log.png";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../redux/modalSlice/modalSlice";
import { RiHomeGearLine } from "react-icons/ri";
import { HiDocumentAdd } from "react-icons/hi";
import { FaUser } from "react-icons/fa";
import { UserNav } from "./userNav/UserNav";
import styles from "./navbar.module.scss";
import { Link, useLocation } from "react-router-dom";

export const NavBar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const location = useLocation();
  const handleOpenLoginModal = () => {
    dispatch(modalActions.setModalValue());
    dispatch(modalActions.activeLoginAdmin(false));
    dispatch(modalActions.activateLoginModal(true));
  };
  const handleOpenLoginRedactor = () => {
    dispatch(modalActions.setModalValue());
    dispatch(modalActions.activateLoginModal(false));

    dispatch(modalActions.activeLoginAdmin(false));
    dispatch(modalActions.activeLoginRedactor(true));
  };

  const handleOpenLoginAdmin = () => {
    dispatch(modalActions.setModalValue());
    dispatch(modalActions.activateLoginModal(false));
    dispatch(modalActions.activeLoginRedactor(false));

    dispatch(modalActions.activeLoginAdmin(true));
  };
  return (
    <nav>
      <div className={styles.nav}>
        <div>
        {console.log(user)}
        {user  && user.length>0  ?
        user.idPerfiles!== "Administrador" ? (
            <Link to="/home">
              <div className={styles.logo}>
                <img src={logo} alt="logo cloudpos" />
              </div>
            </Link>
          ) : (
            <div>
            <Link to="/admin">
              <div className={styles.logo}>
                <img src={logo} alt="logo cloudpos" />
              </div>
            </Link>
          <h1>Base de Conocimiento</h1>
          </div>
          )
          :
          user?.idPerfiles!== "Administrador" ?
          <Link to="/home">
          <div className={styles.logo}>
            <img src={logo} alt="logo cloudpos" />
          </div>
        </Link>
          : <Link to="/admin">
          <div className={styles.logo}>
            <img src={logo} alt="logo cloudpos" />
          </div>
        </Link>}

        </div>
        {/* <div className={styles.tituloBase}>
                  <h2>Base de Conocimientos</h2>
                                </div> */}

            <div>
        <div>
          {user && user?.fullname ? (

            user.idPerfiles == "Redactor" ? (
              <div className={styles.titulo}>
        
                <div className={styles.botones}>
                  <div>
                    <button
                      className={styles.buttonadmin}
                      onClick={handleOpenLoginAdmin}
                    >
                      <RiHomeGearLine></RiHomeGearLine>
                      Admin
                    </button>
                  </div>

                  <UserNav></UserNav>
                </div>
              </div>
            ) : (
              <div className={styles.titulo}>
                {/* <div>
                  <h2>Base de Conocimientos</h2>
                </div> */}
                <div className={styles.botones}>
                  <div>
                    <button
                      className={styles.buttonadmin}
                      onClick={handleOpenLoginRedactor}
                    >
                      <HiDocumentAdd></HiDocumentAdd>
                      Redactor
                    </button>
                  </div>

                  <UserNav></UserNav>
                </div>
              </div>
            )
          ) : (
            <div className={styles.titulo2}>
               {/* <div>
                  <h2>Base de Conocimientos</h2>
                </div> */}
            <div className={styles.botones}>
              <div>
                <button
                  className={styles.buttonadmin}
                  onClick={handleOpenLoginRedactor}
                >
                  <HiDocumentAdd></HiDocumentAdd>
                  Redactor
                </button>
              </div>
              <div>
                <button
                  className={styles.buttonadmin}
                  onClick={handleOpenLoginAdmin}
                >
                  <RiHomeGearLine></RiHomeGearLine>
                  Admin
                </button>
              </div>
              <div>
                <button
                  className={styles.button_login}
                  onClick={handleOpenLoginModal}
                >
                  <FaUser></FaUser>
                  Login
                </button>
              </div>
            </div>
            </div>

          )}
        </div>
        </div>

        {/* <UserNav/> */}
      </div>
    </nav>
  );
};
