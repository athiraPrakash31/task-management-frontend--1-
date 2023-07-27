import axios from "axios";
import { Env } from "./environment";

export default axios.create({
  baseURL: Env.baseUrl,
  headers: {
    // "Content-type": "application/json",
    'Content-type': 'multipart/form-data',
 "x-access-token" : JSON.parse(localStorage.getItem("accessTocken"))
  }
});
