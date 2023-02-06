import { KeyboardEvent, useState } from 'react';
import { FiDatabase, FiSearch } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/authContext';
import { api } from '../../services/api';
import { EntityLi } from './Entity';

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

interface SearchAsideProps{
  lowerHeight: boolean;
}

export function SearchAside({ lowerHeight }:SearchAsideProps){
  const [search, setSearch] = useState('');
  const [searchKey, setSearchKey] = useState('default');

  const { user, searchedEntities, setSearchedEntities } = useAuth();

  const style = lowerHeight ? { height: 'calc(84vh - 1rem)' } : {};

  async function handleSearch(){
    if(search === ''){
      alert('Digite ao menos uma letra!');
      document.getElementById('search')?.focus();
      return;
    }  

    if(searchKey === 'default'){
      alert('Selecione um parâmetro de busca!');
      document.getElementById('searchKey')?.focus();
      return;
    }  

    const response = await api.get<{ entities:SearchResultItem[] }>(
      `/entities/${user?.id}`, 
      { params: 
        { 
          search: search.toLowerCase(), 
          searchKey 
        }
    });
    toast(`Sua busca encontrou ${response.data.entities.length} resultado(s)`);
    setSearchedEntities(response.data.entities);
  }

  function handleSearchByKeyDown(e: KeyboardEvent<HTMLInputElement>){
    if(e.key !== 'Enter') return;
    handleSearch();
  }

  function handleSearchByClick(){
    if(search === '') return;
    handleSearch();
  }

  return(
    <aside className={styles.aside} style={style}>
      <div className={styles.inputsContainer}>
        <label htmlFor="search">
          <input 
            type="text" 
            placeholder='Busque por perfis'
            id='search'
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            onKeyDown={handleSearchByKeyDown}
          />
          <FiSearch onClick={handleSearchByClick}/>
        </label>
        <select 
          name="searchKey" 
          id="searchKey"
          defaultValue="default"
          onChange={(e)=>setSearchKey(e.target.value)}
          placeholder="2321321"
        >
          <option value="default" hidden disabled>Buscar por</option>
          <option value="name">Nome</option>
          <option value="email">Email</option>
          <option value="publicInfo">Descrição</option>
        </select>
      </div>

      <ul>
        { 
          searchedEntities.map((item) => (
            <EntityLi 
              key={item.id}
              data={item}
            />
          ))
        }
      </ul>

      { searchedEntities.length === 0 &&
        <span className={styles.placeholderText}>
          Busque por conexões!
          <FiDatabase/>
        </span>
      }
    </aside>
  )
}