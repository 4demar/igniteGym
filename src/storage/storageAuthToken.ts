import AsyncStorage from '@react-native-async-storage/async-storage';
import { AUTH_STORAGE } from './storageConfig';

type StorageAuthTokenProps = {
  token: string;
  refresh_token: string;
}

export async function StorageAuthTokenSave({ token, refresh_token }: StorageAuthTokenProps) {
  await AsyncStorage.setItem(AUTH_STORAGE, JSON.stringify({ token, refresh_token }));
}

export async function StorageAuthTokenGet() {
  const response = await AsyncStorage.getItem(AUTH_STORAGE);

  const { token, refresh_token }: StorageAuthTokenProps = response ? JSON.parse(response) : {}

  return { token, refresh_token };
}

export async function StorageAuthTokenRemove() {
  await AsyncStorage.removeItem(AUTH_STORAGE);
}