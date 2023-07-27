import { Env } from "@/environment";
import axios from "axios";
import jwt_decode from 'jwt-decode';
const basicContentType = { "Content-Type": "application/json" };


export const baseURL = Env.baseUrl;

const config = {
  baseURL: Env.baseUrl,
  headers: {
    "Content-Type": "application/json",
    get: basicContentType,
    post: basicContentType,
    put: basicContentType,
    delete: basicContentType,
    patch: basicContentType,
  },
  //   withCredentials:true,
};

const apiservice = axios.create(config);
const onRequest = (config) => {
  const accessTocken = JSON.parse(localStorage.getItem("accessTocken"))
  if(accessTocken){
    config.headers[
      "x-access-token"
    ] = `${accessTocken}`;
  }
  return config;
};

const onRequestEroor = (error) => {
  return Promise.reject(error);
};
/** Add logging here */

const onResponse = (response) => {
  let refreshToken =JSON.parse(localStorage.getItem('refreshToken'))
  const currentTimeStamp = new Date().getTime()
  if(refreshToken){
    const decodedToken = jwt_decode(refreshToken)
    if(currentTimeStamp <decodedToken?.exp){
      console.log(jwt_decode(refreshToken),"jwt_decode"); 

    }

  }
  return response;
};

const onResponseError = async (error) => {
  if (error.response) {
    const { status, data } = error.response;
    if (status === 401) {
      let refreshToken =JSON.parse(localStorage.getItem('refreshToken'))
      const payload={
        "refreshToken":refreshToken 
        
      }
      const response = await ApiService('login/refreshAccessToken', "PUT",payload)

           
      localStorage.setItem('accessTocken',JSON.stringify(response.data.accessToken))
      localStorage.setItem('refreshToken',JSON.stringify(response.data.refreshToken))

      // unauthorised error handler to be executed here
    } else if (data && data.status === 401) {


      { /*  unauthorised error handler to be exicuted here */ }
  
    }
  }
  return Promise.reject(error);
};

/** Adding the request interceptors */
apiservice.interceptors.request.use(onRequest, onRequestEroor);
apiservice.interceptors.response.use(onResponse, onResponseError);

export default function ApiService(path, method, request, headers, params) {
  return apiservice({
    data: request,
    method: method,
    url: path,
    params: params,
    headers: headers,
  }).then((res) => {
    if (res) {
      return res.data;
    } else {
      throw Object.assign(new Error("Invalid Response"), { code: 402 });
    }
  });
}
