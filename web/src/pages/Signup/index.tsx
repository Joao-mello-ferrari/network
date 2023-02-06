import { FormEvent, RefObject, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { api } from '../../services/api';

import commonStyles from '../common.module.scss';
import styles from './styles.module.scss';

export function SignUp(){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState('user');
  const [role, setRole] = useState('');
  const [imageUrl, setimageUrl] = useState('');
  const [password, setPassword] = useState('');

  const push = useNavigate();

  const publicInfoRef = useRef() as RefObject<HTMLTextAreaElement>;
  const privateInfoRef = useRef() as RefObject<HTMLTextAreaElement>;

  async function handleSignup(e: FormEvent){
    e.preventDefault();

    const data = {
      name,
      email,
      password,
      role,
      type,
      imageUrl,
      publicInfo: publicInfoRef.current?.value,
      privateInfo: privateInfoRef.current?.value
    }

    await api.post('signup', data);
    toast("Conta criada com sucesso!");
    push("/login");
  }

  return(
    <div className={commonStyles.container}>
      <Header/>
      <div className={styles.formContainer}>
        <form onSubmit={handleSignup}>
          <h1>Crie sua conta!</h1>
          <input 
            type="text" 
            placeholder="Nome ..."
            value={name}
            onChange={(e)=>setName(e.target.value)}
            required
          />
          <input 
            type="email" 
            placeholder="E-mail ..."
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />
          <select 
            name="type" 
            id="type"
            onChange={(e) => setType(e.target.value)}
            value={type}
          >
            <option value="user">Usuário</option>  
            <option value="enterprise">Empresa</option>  
          </select>
          <input 
            type="password" 
            placeholder="Senha ..."
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />
          <input 
            type="text" 
            placeholder="Função ..."
            value={role}
            onChange={(e)=>setRole(e.target.value)}
          />
          <input 
            type="text" 
            placeholder="Url do avatar ..."
            value={imageUrl}
            onChange={(e)=>setimageUrl(e.target.value)}
          />

          <div className={styles.border}/>

          <textarea name="public-info" id="public" placeholder='Descrição pública' ref={publicInfoRef} required/>
          <textarea name="private-info" id="public" placeholder='Informações privadas' ref={privateInfoRef}/>
          
          <button type="submit">Cadastrar</button>
        </form>
      </div>

      <Footer />
    </div>
  )
}