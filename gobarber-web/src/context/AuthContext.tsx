import React, { createContext, useCallback, useState, useContext} from 'react';
import api from '../services/apiClient';

import history from '../utils/history';

interface AuthState {
  token: string,
  user: object,
}

interface SignInCredentials {
  email: string,
  password: string,
}

interface AuthContextData {
  user: object,
  signIn(credentials: SignInCredentials): Promise<void>,
  signOut(): void,
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {


    const token = localStorage.getItem('@Gobarber:token');
    const user = localStorage.getItem('@Gobarber:user');

    if (token && user) {
      return {token, user: JSON.parse(user)};
    }

    return {} as AuthState;
  });


  const signIn = useCallback(async({ email, password }) => {
    const response = await api.post('/sessions', {
      email, 
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem('@Gobarber:token', JSON.stringify(token));
    localStorage.setItem('@Gobarber:user', JSON.stringify(user));

    api.defaults.headers.Authorization = `Bearer ${token}`;

    setData({ token, user });
    //history.push('/');
  }, []);

  const signOut = useCallback(async() => {
    setData({} as AuthState);
    
    localStorage.removeItem('@Gobarber:token');
    localStorage.removeItem('@Gobarber:user');
    
    api.defaults.headers.Authorization = undefined;
  }, []);

  return (
  <AuthContext.Provider value={{ user: data.user, signIn, signOut}}>
    {children}
  </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export {AuthProvider, useAuth};