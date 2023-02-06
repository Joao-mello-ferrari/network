export interface User{
  id: number;
  role: string
  type: 'user' | 'enterprise';
  name: string;
  email: string;
  publicInfo: string;
  imageUrl: string;
  connections: string[];
}