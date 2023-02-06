import { useState } from 'react';
import Modal from 'react-modal';
import { useAuth } from '../../contexts/authContext';
import { api } from '../../services/api';

import styles from './styles.module.scss';

Modal.setAppElement('#root');

interface ModalProps{
  open: boolean;
  setOpen: (state: boolean) => void;
}

export function GraphModal({ open, setOpen }:ModalProps){
  const [graphCenter, setGraphCenter] = useState<'default' | number>('default');
  const { user } = useAuth();

  function handleChangeGraphCenter(){
    if(graphCenter === 'default' && user){
      return setGraphCenter(user?.id);
    }

    setGraphCenter('default');
  }

  const buttonText = graphCenter === 'default' ? 'centrado geral' : 'centrado em você';
  const fetchUrl = `${api.defaults.baseURL}/graph/${graphCenter}`;

  return(
    <Modal
      isOpen={open}
      className={styles.modal}
      overlayClassName={styles.overlay}
      onRequestClose={()=>{setOpen(false);}}
      contentLabel="Example Modal"
    >
      <main className={styles.modalMain}>
        <h2>
          Veja como está o grafo
          <button onClick={handleChangeGraphCenter}>
            {buttonText}
          </button>
        </h2>
        <img src={fetchUrl} alt="Database graph" />
      </main>
    </Modal>
  )
}