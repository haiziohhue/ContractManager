import axios from "axios";
import { getToken } from "../utils/token";

// axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers["Authorzation"] = `Brearer ${getToken()?getToken():''}`;

export const login = async (password: string) => {
  return await axios.post("/login", {
    password: password,
  });
};
export const upload = async (data: FormData) => {
  return await axios.post("/api/file", data, {
    headers: {
      ["Content-Type"]: "multipart/form-data",
    },
  });
};
export const getFiles = async (params:{context?:string}):Promise<{data:{data:EntityContract[],[key:string]:unknown}}> => {
  return await axios.get(`/api/file/?${params.context?'context='+params.context:''}`,{
    maxContentLength:2000000
  });
}
export const deleteById = async (id: number) => {
  return await axios.delete(`/api/file/${id}`);
}
export const downloadFile = async (name:string)=>{
  return await axios.get(`/rowfiles/${name}`,{
    responseType: 'blob',
  });
}