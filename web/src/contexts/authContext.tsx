import { createContext, ReactNode, useContext, useState } from "react";

interface User{
  id: number;
  role: string
  type: 'user' | 'enterprise';
  name: string;
  email: string;
  publicInfo: string;
  imageUrl: string;
  connections: string[];
}

interface LoggedUser extends User{
  privateInfo: string;
}

interface AuthContextData{
  isAuthenticated: boolean;
  user: User | null;
  searchedEntities: User[];
  connectedEntities: User[];
  signIn: (data: LoggedUser) => void;
  setSearchedEntities: (data: User[]) => void;
  setConnectedEntities: (data: User[]) => void;
  signOut: () => void;
}

interface AuthContextProviderProps{
  children: ReactNode;
}

const AuthContext = createContext({} as AuthContextData);

export function AuthContextProvider({ children }: AuthContextProviderProps){
  const [user, setUserState] = useState<LoggedUser | null>(()=>{
    const user = localStorage.getItem('@social');
    if(!user) return null;
    return JSON.parse(user) as LoggedUser;
  });
  const [searchedEntities, setSearchedEntitiesState] = useState<User[]>([]);
  const [connectedEntities, setConnectedEntitiesState] = useState<User[]>([]);

  const isAuthenticated = !!localStorage.getItem('@social');

  function signIn(user: LoggedUser){
    setUserState(user);
    localStorage.setItem('@social', JSON.stringify(user));
  }

  function setSearchedEntities(entities: User[]){
    setSearchedEntitiesState(entities);
  }

  function setConnectedEntities(entities: User[]){
    setConnectedEntitiesState(entities);
  }

  function signOut(){
    localStorage.removeItem('@social');
    setUserState(null);
    setConnectedEntities([]);
    setSearchedEntities([]);
  }

  return(
    <AuthContext.Provider value={{
      isAuthenticated,
      user,
      searchedEntities,
      connectedEntities,
      signIn,
      setSearchedEntities,
      setConnectedEntities,
      signOut
    }}>
      { children }
    </AuthContext.Provider>
  )
}

export function useAuth(){
  return useContext(AuthContext);
}