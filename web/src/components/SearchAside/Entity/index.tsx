import { FiHome, FiImage, FiUser } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useAuth } from '../../../contexts/authContext';
import { api } from '../../../services/api';
import styles from './styles.module.scss';

interface EntityLiProps{
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

export function EntityLi({ data }:EntityLiProps){
  const { 
    user, 
    connectedEntities,
    searchedEntities,
    setConnectedEntities, 
    setSearchedEntities 
  } = useAuth();

  async function connect(connnection: string){
    const answer = confirm('Deseja realmente conectar?');

    if(!answer) return;

    await api.put(`/relation/${user?.id}`, {
      entityId: data.id,
      relationType: connnection,
      operation: 'create'
    });

    let newConnectedEntities = connectedEntities;

    if(data.connections.length === 0){
      const newConnectedEntity = { ...data, connections:[connnection] }; 
      newConnectedEntities.push(newConnectedEntity);
    } else{
      newConnectedEntities = connectedEntities.map((item)=>{
        if(item.id !== data.id) return item;
        return {
          ...item,
          connections: [...item.connections, connnection]
        }
      });
    }

    const newSearchedEntities = searchedEntities.map((item)=>{
      if(item.id !== data.id) return item;
      return {
        ...item,
        connections: [...item.connections, connnection]
      }
    })

    toast(`Conexão realizada com ${data.name}`);
    setConnectedEntities(newConnectedEntities);
    setSearchedEntities(newSearchedEntities);
  }
  
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
    <li className={styles.entity}>
      <div className={styles.entityType}>
        { data.type === 'user'
          ? <FiUser />
          : <FiHome />
        }
      </div>

      <div className={styles.user}>
        <div>
          <span className={styles.userName}>{data.name}</span>
          <span>{data.role}</span>
        </div>
        { data.imageUrl !== ''
          ? <img src={data.imageUrl} alt="user/company iamge" />
          : <FiImage />
        }
      </div>

      <div className={styles.connections}>
        { ((data.type === 'user' && user?.type === 'enterprise') ||
          (data.type === 'enterprise' && user?.type === 'user')) &&
          (data.connections.includes('customer')
            ? <span className={styles.connected} onClick={()=>disconnect('customer')}>Cliente</span>
            : <span onClick={()=>connect('customer')}>Tornar cliente</span>
          )
        }

        { data.type === 'user' && user?.type !== 'enterprise' &&
          ( data.connections.includes('known')
            ? <span className={styles.connected} onClick={()=>disconnect('known')}>Conhecido</span>
            : <span onClick={()=>connect('known')}>Tornar conhecido</span>
          )
        }

        { data.type === 'user' && user?.type !== 'enterprise' &&
          ( data.connections.includes('friend')
            ? <span className={styles.connected} onClick={()=>disconnect('friend')}>Amigo</span>
            : <span onClick={()=>connect('friend')}>Tornar amigo</span>
          )
        }

        { data.type === 'user' && user?.type !== 'enterprise' &&
          ( data.connections.includes('relative')
            ? <span className={styles.connected} onClick={()=>disconnect('relative')}>Parente</span>
            : <span onClick={()=>connect('relative')}>Tornar parente</span>
          )
        }
      </div>
    </li>
  )
}