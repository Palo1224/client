import React from "react";
import styles from "./Loading.module.scss";

function Loading() {
  return (
    <div className={styles.container}>
      {console.log(window.location.href)}
        <div className={styles.spinner}></div>

    </div>
  );
}

export default Loading;