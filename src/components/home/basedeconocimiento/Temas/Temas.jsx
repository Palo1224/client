import { React, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NotFound } from "../../../../not_found/NotFound";
import { fetchTemas } from "../../../../redux/temas/temas";
import { Tema } from "../Tema/Tema";
import styles from "./temas.module.scss";
import sty from "../Tema/tema.module.scss";

import Loading from "../../Loading/Loading"
export const Temas = () => {
  let { temas } = useSelector((state) => state.temas);

  const [visible, setIsVisible] = useState(false);

  useEffect(() => {}, [temas]);
  setTimeout(function () {
    setIsVisible(true);
  }, 7000);
  return (
    <div className={styles.cards}>
      <div>
        {console.log(temas)}
       { temas && temas!=="No hay informacion" ?
        temas.length > 0 ? (
          temas.map((e) => {
            return (
              <div key={e.id}>
                <Tema
                  id={e.id}
                  tituloTema={e.tituloTema}
                  DescripTema={e.DescripTema}
                  author={e.author}
                  Date={e.Date}
                  referencia={e.referencia}
                />
              </div>
            );
          })
        ) : (
            !visible ?
          <div>
            <Loading></Loading>
          </div>
            :
            <div>
            <NotFound></NotFound>
          </div>
        )
        : 
          temas=="No hay informacion" ?
          <div className={sty.card}>
            
              <label>No hay informacion que buscas</label>
          </div>
          :
           <div>
          <NotFound></NotFound>
        </div>

          
         
        }
      </div>
    </div>
  );
};
