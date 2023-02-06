import { FormEvent, useState } from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { useAuth } from '../../contexts/authContext';
import { User } from '../../interfaces/user';
import { api } from '../../services/api';

import commonStyles from '../common.module.scss';
import styles from './styles.module.scss';

interface LoggedUser extends User{
  privateInfo: string;
}

export function Login(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn } = useAuth();
  const push = useNavigate();

  async function handleLogin(e: FormEvent){
    e.preventDefault();
    const data = { email, password };

    try{
      const response = await api.post<LoggedUser>('login', data);
      signIn(response.data);
      push("/dashboard");
    } catch(err){
      toast("Usuário não encontrado. Cheque as credenciais.");
    }
  }

  return(
    <div className={commonStyles.container}>
      <Header/>
      <div className={styles.formContainer}>
        <form onSubmit={handleLogin}>
          <h1>Acessa a plataforma!</h1>
          <input 
            type="email" 
            placeholder="E-mail ..."
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />
          <input 
            type="password" 
            placeholder="Senha ..."
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />
          <button type="submit">Entrar</button>
          <a href="#">Esqueci minha senha <FiArrowUpRight/></a>
        </form>
      </div>

      <Footer />
    </div>
  )
}