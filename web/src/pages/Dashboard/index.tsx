import { useState, useEffect } from 'react';
import { FiMap, FiRss } from 'react-icons/fi';
import { Footer } from '../../components/Footer';
import { GraphModal } from '../../components/GraphModal';
import { Header } from '../../components/Header';
import { SearchAside } from '../../components/SearchAside';
import { UserConnectionCard } from '../../components/UserConnectionCard';
import { useAuth } from '../../contexts/authContext';
import { api } from '../../services/api';

import commonStyles from '../common.module.scss';
import styles from './styles.module.scss';

interface SearchResultItem{
  id: number;
  role: string
  type: 'user' | 'enterprise';
  name: string;
  email: string;
  publicInfo: string;
  imageUrl: string;
  connections: string[];
}

export function Dashboard(){
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user, connectedEntities, setConnectedEntities } = useAuth();

  useEffect(()=>{
    async function get(){
      const response = await api.get<{relations: SearchResultItem[]}>(`/relations/${user?.id}`);
      
      setConnectedEntities(response.data.relations);
    }

    if(user?.id) get();
  },[user]);

  const reduceAsideHeight = connectedEntities.length < 2;

  return(
    <div className={commonStyles.container}>
      <GraphModal open={isModalOpen} setOpen={setIsModalOpen}/>

      <Header/>
      <main className={styles.dashboard}>
        <SearchAside lowerHeight={reduceAsideHeight}/>

        <div className={styles.mainContainer}>
          <h2>
            Visualize as suas conexões!
            <FiRss/>
          </h2>
          <div className={styles.grid}>
            { connectedEntities.map((item)=>(
              <UserConnectionCard 
                key={item.id}
                data={item}
              />
            ))}

            { connectedEntities.length === 0 &&
              <div className={styles.defaultText}>
                <h2>
                  Parece que você é novo por aqui.
                </h2>
                <span>
                  Faça conexões no menu ao lado!
                </span>
              </div>
            }
          </div>
        </div>
      </main>
      <Footer/>

      <div 
        className={styles.openGraphWidget}
        onClick={()=>setIsModalOpen(true)}
      >
        Ver grafo
        <FiMap/>
      </div>
    </div>
  )
}