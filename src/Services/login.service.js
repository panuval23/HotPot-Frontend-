import axios from "axios";
import { baseUrl } from "../environment.dev";

export function loginAPICall(loginModel) {
  return axios.post(baseUrl + "Authentication/Login", loginModel);
}
