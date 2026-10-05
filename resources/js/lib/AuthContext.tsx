import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Configura o Axios padrão para usar a URL base correta e enviar cookies/tokens
axios.defaults.withCredentials = true;
axios.defaults.baseURL = '/api';

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('admin_token'));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        try {
          const response = await axios.get('/user');
          setUser({ name: response.data.name, email: response.data.email });
        } catch (error) {
          console.error('Sessão expirada ou token inválido');
          setToken(null);
          setUser(null);
          localStorage.removeItem('admin_token');
          delete axios.defaults.headers.common['Authorization'];
        }
      }
      setIsLoading(false);
    };

    fetchUser();
  }, [token]);

  const login = (newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('admin_token', newToken);
    axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
  };

  const logout = async () => {
    try {
      await axios.post('/logout');
    } catch (e) {
      // ignora erros de rede no logout
    }
    setToken(null);
    setUser(null);
    localStorage.removeItem('admin_token');
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
