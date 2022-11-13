import React from "react";
import { Link } from "react-router-dom";
import styles from "./tema.module.scss";
import { TiDocumentText } from "react-icons/ti";
export const Tema = ({
  id,
  tituloTema,
  DescripTema,
  author,
  Date,
  referencia,
}) => {
  return (
    <div>
      <Link to={`/home/${id}`}>
        <div className={styles.card}>
          <div>
            <div>
              <h5>
                <span>
                  <TiDocumentText />
                </span>
                {tituloTema}
              </h5>

              <p>{`${DescripTema.slice(0, 360)}`}</p>
              <div></div>
            </div>
          </div>
          <div>
            <p>
              {Date} Creado por: {author}
            </p>
            <p className={styles.ref}>Ref: #{referencia}</p>

            <p> </p>
          </div>
        </div>
      </Link>
    </div>
  );
};
