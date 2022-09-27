
import styles from './footer.module.scss'
import{AiOutlineMail} from "react-icons/ai"


export const Footer = () => {
  return (
    <div className={styles.footer}>
             

      <div className={styles.logoEmail}>
        <a><AiOutlineMail size={30}/></a>
        </div>
        <div >

      <a data-auto-recognition="true" href="mailto:info@qwork.com.ar">
      Contáctanos info@qwork.com.ar</a>
      </div>
        
    </div>
  )
}
