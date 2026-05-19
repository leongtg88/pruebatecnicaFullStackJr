import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import api from '../api/axios';

interface User {
  _id: string;
  username: string;
  email: string;
}

interface AuthContextType {
  token: string | null;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Efecto para verificar el token al recargar la página
  useEffect(() => {
    const verifyToken = async () => {
      if (token) {
        try {
          // Podrías hacer una petición a /api/auth/me para obtener los datos del usuario
          const { data } = await api.get('/auth/me'); // Asegúrate de tener esta ruta en el backend
          setUser(data.user);
        } catch (error) {
          console.error('Token inválido');
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
        }
      }
      setIsLoading(false);
    };
    verifyToken();
  }, [token]);

  const login = async (email: string, password: string) => {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', data.token);
    setToken(data.token);
    // Después del login, podrías obtener los datos del usuario
    const userRes = await api.get('/auth/me');
    setUser(userRes.data.user);
  };

  const register = async (username: string, email: string, password: string) => {
   await api.post('/auth/register', { username, email, password });
    // Después de registrarse, automáticamente iniciamos sesión
    await login(email, password);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};