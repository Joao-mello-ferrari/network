import styles from './styles.module.scss';

export function Footer(){
  return(
    <footer className={styles.footer}>
      <span>@copyright - Todos os direitos reservados.</span>
      <span>&nbsp;Desenvolvido por João Mello e Pedro Edom - 01/2023</span>
    </footer>
  )
}