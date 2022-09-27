import React from 'react'
import styles from './notfound.module.scss'
import img_404 from '../imglogo/error404.jpg'


export const NotFound = () => {
  return (
    <div className={styles.not_found_page}>
      <img src={img_404} alt="not found" />
    </div>
  )
}
