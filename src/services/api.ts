import axios, { AxiosError, AxiosInstance } from "axios";

import { StorageAuthTokenGet, StorageAuthTokenSave } from "@storage/storageAuthToken";
import { AppError } from "@utils/appError";

type SignOut = () => void;

type PromiseType = {
  onSuccess: (token: string) => void;
  onFailure: (error: AxiosError) => void;
}

type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (signOut: SignOut) => () => void;
}

const api = axios.create({
  baseURL: 'http://192.168.100.30:3333',
}) as APIInstanceProps;

let listRequest: Array<PromiseType> = [];
let isRefreshing = false;

api.registerInterceptTokenManager = Logout => {
  // gerenciar token em caso de invalido 
  const interceptTokenManager = api.interceptors.response.use((response) => response, async (requestError) => {
    if (requestError.response?.status === 401) {
      if (requestError.response.data?.message === 'token.expired' || requestError.response.data?.message === 'token.invalid') {
        const { refresh_token } = await StorageAuthTokenGet();

        if (!refresh_token) {
          Logout();
          return Promise.reject(requestError)
        }

        const originalRequestConfig = requestError.config;

        //Incluir requisição a fila
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            listRequest.push({
              onSuccess: (token: string) => {
                originalRequestConfig.headers = { 'Authorization': `Bearer ${token}` };
                resolve(api(originalRequestConfig));
              },
              onFailure: (error: AxiosError) => {
                reject(error)
              },
            })
          })
        }

        isRefreshing = true

        return new Promise(async (resolve, reject) => {
          try {
            const { data } = await api.post('/sessions/refresh-token', { refresh_token });
            await StorageAuthTokenSave({ token: data.token, refresh_token: data.refresh_token });

            if (originalRequestConfig.data) {
              originalRequestConfig.data = JSON.parse(originalRequestConfig.data);
            }

            originalRequestConfig.headers = { 'Authorization': `Bearer ${data.token}` };
            api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

            listRequest.forEach(request => {
              request.onSuccess(data.token);
            });

            console.log("TOKEN ATUALIZADO");

            resolve(api(originalRequestConfig));
          } catch (error: any) {
            console.log(error)
            listRequest.forEach(request => {
              request.onFailure(error);
            })

            Logout();
            reject(error);
          } finally {
            isRefreshing = false;
            listRequest = []
          }
        })

      }

      Logout();

    }

    if (requestError.response && requestError.response.data) {
      return Promise.reject(new AppError(requestError.response.data.message))
    } else {
      return Promise.reject(requestError)
    }
  });

  return () => {
    api.interceptors.response.eject(interceptTokenManager);
  }
}



export { api };