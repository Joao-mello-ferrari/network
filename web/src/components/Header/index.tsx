import { FiUser, FiLogOut, FiCloud } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';

import styles from './styles.module.scss';

export function Header(){
  const { isAuthenticated, signOut, user } = useAuth();
  const push = useNavigate();
  
  function handleSignOut(){
    signOut();
    push('/login');
  }

  if(isAuthenticated){
    return(
      <header className={styles.header}>
        <span className={styles.logo}>ConnectTo</span>
        <div>
          <div className={styles.userInfo}>
            <span>{user?.name}</span>
            <span>{user?.email}</span>
          </div>
          { user?.imageUrl === ''
            ? <FiUser className={styles.avatar}/>
            : <img src={user?.imageUrl} alt="Avatar" className={styles.avatar} />
          }
          
          <FiLogOut className={styles.logout} onClick={handleSignOut}/>
        </div>
      </header>
    )
  }

  return(
    <header className={styles.header}>
      <span className={styles.logo}>ConnectTo</span>
      <div>
        <span className={styles.slogan}>A nova plataforma <strong>social</strong></span>
        <FiCloud className={styles.cloud}/>
      </div>
    </header>
  )
}