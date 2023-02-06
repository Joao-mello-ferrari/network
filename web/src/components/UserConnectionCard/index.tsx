import { FiImage } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/authContext';
import { api } from '../../services/api';
import styles from './styles.module.scss';

interface UserConnectionCardProps{
  data:{
    id: number;
    role: string
    type: 'user' | 'enterprise';
    name: string;
    email: string;
    publicInfo: string;
    imageUrl: string;
    connections: string[];
  }
}

export function UserConnectionCard({ data }:UserConnectionCardProps){
  const { 
    user, 
    connectedEntities,
    searchedEntities,
    setConnectedEntities, 
    setSearchedEntities 
  } = useAuth();

  const connections = {
    known: 'Conhecido(a)',
    friend: 'Amigo(a)',
    relative: 'Parente',
    customer: 'Cliente'
  };

  async function disconnect(connnection: string){
    const answer = confirm('Deseja realmente desconectar?');
    if(!answer) return;

    await api.put(`/relation/${user?.id}`, {
      entityId: data.id,
      relationType: connnection,
      operation: 'delete'
    });

    let newConnectedEntities = connectedEntities.map((item)=>{
      if(item.id !== data.id) return item;
      return {
        ...item,
        connections: item.connections.filter((name)=> name !== connnection)
      }
    });
    
    newConnectedEntities = newConnectedEntities.filter((item)=>item.connections.length !== 0);

    const newSearchedEntities = searchedEntities.map((item)=>{
      if(item.id !== data.id) return item;
      return {
        ...item,
        connections: item.connections.filter((name)=> name !== connnection)
      }
    });

    toast(`Conexão desfeita com ${data.name}`);
    setConnectedEntities(newConnectedEntities);
    setSearchedEntities(newSearchedEntities);
  }
  
  return(
    <div className={styles.card}>
      <div className={styles.topSection}>
        <div>
          <strong>{data.name}</strong>
          <span>{data.role}</span>
          <p>{data.publicInfo}</p>
        </div>
        <div className={styles.imgContainer}>
          { data.imageUrl !== ''
            ? <img src={data.imageUrl} alt="user/company iamge" />
            : <FiImage />
          }
        </div>
        
      </div>

      <div className={styles.bottomSection}>
        <span>Cadastrado(a) em 13/01/2023</span>
        <div className={styles.connections}>
          { data.connections.map((connection, index)=>(
            <span 
              key={index}
              onClick={()=>disconnect(connection)}
            >
              {/* @ts-ignore */}
              { connections[connection] }
            </span>
          ))
          }
        </div>
      </div>
    </div>
  )
}