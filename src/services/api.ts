import { AppError } from "@utils/appError";
import axios from "axios";

const api = axios.create({
  baseURL: 'http://192.168.0.10:3333'
})

//interceptar requisição
const requisicao = api.interceptors.request.use(
  (config) => { //sucesso
    console.log('INTERCEPTOR => ', config)
    return config
  },
  (error) => { //erro
    return Promise.reject(error);
  }
)

//interceptar respostar da requisição
const response = api.interceptors.response.use(
  (response) => { //sucesso
    console.log('INTERCEPTOR RESPONSE => ', response)
    return response
  },
  (error) => { //erro
    console.log('INTERCEPTOR RESPONSE ERROR => ', error)
    if (error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.message));
    }
    else {
      return Promise.reject(error);
    }
  }
)

export { api }