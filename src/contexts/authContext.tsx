import { createContext, ReactNode, useEffect, useState } from "react";

import { StorageAuthTokenSave, StorageAuthTokenGet, StorageAuthTokenRemove } from '@storage/storageAuthToken';
import { StorageUserGet, StorageUserRemove, StorageUserSave } from '@storage/storageUser';

import { api } from '@services/api';
import { UserDTO } from "../interfaces/userDTO";

export type AuthContextDataProps = {
  user: UserDTO;
  isLoadingUserStorageData: boolean;
  Login: (email: string, password: string) => Promise<void>;
  Logout: () => Promise<void>;
  UpdateUserProfile: (userUpdated: UserDTO) => Promise<void>;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {

  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true);

  async function UserAndTokenUpdate(userData: UserDTO, token: string) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    setUser(userData);
  }

  async function StorageUserAndTokenSave(userData: UserDTO, token: string, refresh_token: string) {
    try {
      setIsLoadingUserStorageData(true)
      await StorageUserSave(userData);
      await StorageAuthTokenSave({ token, refresh_token });

    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function Login(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions', { email, password });

      if (data.user && data.token && data.refresh_token) {
        await StorageUserAndTokenSave(data.user, data.token, data.refresh_token);
        UserAndTokenUpdate(data.user, data.token)
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function Logout() {
    try {
      setIsLoadingUserStorageData(true);
      setUser({} as UserDTO);
      await StorageUserRemove();
      await StorageAuthTokenRemove();
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function UpdateUserProfile(userUpdated: UserDTO) {
    try {
      setUser(userUpdated);
      await StorageUserSave(userUpdated);
    } catch (error) {
      throw error;
    }
  }

  async function LoadUserData() {
    try {
      setIsLoadingUserStorageData(true);

      const userLogged = await StorageUserGet();
      const { token } = await StorageAuthTokenGet();

      if (token && userLogged) {
        UserAndTokenUpdate(userLogged, token);
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  useEffect(() => {
    LoadUserData()
  }, [])

  // useEffect(() => {
  //   const subscribe = api.registerInterceptTokenManager(signOut);

  //   return () => {
  //     subscribe();
  //   }
  // },[])

  return (
    <AuthContext.Provider value={{
      user,
      isLoadingUserStorageData,
      Login,
      Logout,
      UpdateUserProfile,
    }}>
      {children}
    </AuthContext.Provider>
  )
}