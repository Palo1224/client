import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTemas } from "../../../redux/temas/temas";
import styles from "./filterbar.module.scss";
import { BiRefresh } from "react-icons/bi";
import { fetchEmpresas } from "../../../redux/empresas/empresas";
export const FilterBar = () => {
  const [ref, setRef] = useState("");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  let id = user?.id || null;
  const [empresa, setEmpresa] = useState("");

  useEffect(()=>{
    dispatch(fetchEmpresas())
  },[dispatch,id])
const {empresas}=useSelector(state=>state.empresas)
  const handleReferencia = (e) => {
    setRef(e.target.value);
    if (id !== null) {
      if (e.target.value == "") {
        dispatch(fetchTemas({ id: id }));
      } else {
        dispatch(fetchTemas({ ref: e.target.value, id: id }));
      }
    } else {
      if (e.target.value == "") {
        dispatch(fetchTemas({}));
      } else {
        dispatch(fetchTemas({ ref: e.target.value }));
      }
    }
  };
  const handleDeleteRef = (e) => {
    e.preventDefault();
    setRef("");
    if (id !== null) {
      dispatch(fetchTemas({ id: id }));
    } else {
      dispatch(fetchTemas({}));
    }
  };
  const handleDeleteEmpresa = (e) => {
    e.preventDefault();
    setEmpresa("");
    if (id !== null) {
      dispatch(fetchTemas({ id: id }));
    } else {
      dispatch(fetchTemas({}));
    }
  };
  const handleSelectEmpresa = (e) => {
    setEmpresa(e.target.value);
    dispatch(
      fetchTemas({
        empresa: e.target.value,
      })
    );
  };
  return (
    <div className={styles.filterbar}>
      <div>
        <label>Filtros por: </label>
      </div>
      <div className={styles.inputref}>
        <div>
          <p>Referencia:</p>

        </div>
        <div>
          <input
            value={ref}
            onChange={handleReferencia}
            type="number"
            min="1"
          ></input>
          <button title="Refrescar" onClick={handleDeleteRef}>
            <></>
            <BiRefresh size={14} />
          </button>
        </div>
      </div>
      <div>

        {id ?
        user?.idPerfiles=="Administrador" && user?.idEmpresas ? (
    
          <div className={styles.inputref}>
          <p>Empresas</p>
          <div>
          <select
            className={styles.form_select}
            value={empresa}
            onChange={handleSelectEmpresa}
          >
            <option disabled value="">Empresas</option>
  
            
       {empresas &&
            empresas.map((e) => (
                <option value={e.DescripEmpresa} key={e.id}>
                  {e.DescripEmpresa}
                </option>
              ))}
          </select>

          <button title="Refrescar" onClick={handleDeleteEmpresa}>
          <></>
          <BiRefresh size={14} />
        </button>
        </div>

        </div>
  
        ) :  <div className={styles.inputref}>
        <p>Empresas</p>
        <div>

        <select
          className={styles.form_select}
          value={empresa}
          onChange={handleSelectEmpresa}
        >
          <option disabled value="">Empresas</option>

          
     {user?.idEmpresas &&
          user.idEmpresas.map((e) => (
              <option value={e} key={e}>
                {e}
              </option>
            ))}
        </select>
        <button title="Refrescar" onClick={handleDeleteEmpresa}>
        <></>
        <BiRefresh size={14} />
      </button>
      </div> 

      </div> 
        :  null }
      </div>
    </div>
  );
};
