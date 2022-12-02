import React, { useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm";
import axios from "axios";
import logo from "../../imglogo/logo.png";
import { useDispatch} from "react-redux";
import { modalActions } from "../../redux/modalSlice/modalSlice";
import styles from "./login.module.scss";
import { fetchPerfil } from "../../redux/perfiles/perfil";
import { loginSuccess } from "../../redux/user/users";
import Swal from "sweetalert2";

export const LoginRedactor = () => {
  const [formValues, handleInputChange] = useForm({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPerfil());
  }, [dispatch]);

  const { email, password } = formValues;

  const [userError, setUserError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  const loginUserAdmin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3001/signin/redactor",
        formValues
      );

      if (res.data) {
        dispatch(loginSuccess(res.data));

        Swal.fire({
          icon: "success",
          title: "Acceso!",
          showConfirmButton: false,
        });
        window.location.href = " /crearTema";

        dispatch(modalActions.setModalValue());
      } else {
        Swal.fire({
          icon: "error",
          title: `${res.data}`,
          showConfirmButton: true,
          confirmButtonColor: "#347cc3",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: `${error.response.data}`,
        showConfirmButton: true,
        confirmButtonColor: "#347cc3",
      });
    }
  };

  const switchFormForgot = () => {
    dispatch(modalActions.activateLoginAdmin(false));
    dispatch(modalActions.activateForgotPass(true));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUserAdmin();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.login_form}>
        <img width={"160px"} src={logo} />
        <h2>Redactor</h2>
        <br></br>
        {userError === true ? (
          <label className={styles.errorMessage}>{errorMessage}</label>
        ) : null}
        <label>Email*</label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={handleInputChange}
          required
        />
        <label>Password*</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleInputChange}
          required
        />
        <div className={styles.login__button}>
          <button type="submit">Enviar</button>
        </div>
        <div id="forgot" className={styles.switch_form}>
          <p onClick={switchFormForgot}>Olvidaste tu contraseña?</p>
        </div>
      </form>
    </div>
  );
};
