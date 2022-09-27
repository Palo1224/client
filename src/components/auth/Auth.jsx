import React from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../redux/modalSlice/modalSlice";
import { CrearClasifTema } from "../Admin/Creacion/CrearClasifTema";
import { CrearEmpresas } from "../Admin/Creacion/CrearEmpresas";
import { CrearPerfil } from "../Admin/Creacion/CrearPerfil";
import { CrearSistemaRef } from "../Admin/Creacion/CrearSistemaRef";
import Loading from "../home/Loading/Loading";

import { Login } from "../login/Login";
import { LoginAdmin } from "../login/LoginAdmin";
import { LoginRedactor } from "../login/LoginRedactor";

import "./auth.css";

export const Auth = () => {
  const { isOpen } = useSelector((state) => state.modal);
  const {
    activeLoginModal,
    activeCreacionSistRef,
    activeCreacionClasifTema,
    activeCreacionPerfil,
    activeCreacionEmpresa,
    activeLoginAdmin,
    activeLoginRedactor,activeLoadingArchivo
    

  } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(modalActions.setModalValue());
    dispatch(modalActions.activateLoginModal(false));
    dispatch(modalActions.activeLoginAdmin(false));
    dispatch(modalActions.activeCreacionSistRef(false));
    dispatch(modalActions.activeCreacionClasifTema(false));
    dispatch(modalActions.activeCreacionPerfil(false));
    dispatch(modalActions.activeCreacionEmpresa(false));
    dispatch(modalActions.activeLoadingArchivo(false));

    
    dispatch(modalActions.activeLoginRedactor(false));

  };

  return ReactDOM.createPortal(
    <>
      {isOpen && (
        <>
          <div className="overlay__modal">
          <div className="modal">
            <button className="close__icon" onClick={handleCloseModal}>
              X
            </button>
            <div className="form_container">
              {activeLoginModal && <Login />}
              </div>
              <div className="form_container">
              {activeLoginAdmin && <LoginAdmin />}
              </div>
              <div className="form_container">
              {activeLoginRedactor && <LoginRedactor />}
              </div>
              {/* <div className="form_tema">
                {activeCreacionTema && <CreacionDeTema />}
              </div> */}
              <div className="form_container">
                {activeCreacionSistRef && <CrearSistemaRef />}
              </div>
              

              <div className="form_container">
                {activeCreacionClasifTema && <CrearClasifTema />}
              </div>
              <div className="form_container">
                {activeCreacionPerfil && <CrearPerfil />}
              </div>
              <div className="form_container">
                {activeCreacionEmpresa && <CrearEmpresas/>}
              </div>
              <div className="form_container">
                {activeLoadingArchivo && <Loading/>}
              </div>

              </div>
            </div>
        </>
      )}
    </>,
    document.getElementById("root")
  );
};
