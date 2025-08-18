import axios from "axios";
import { baseUrl } from "../environment.dev";

export function registerAPICall(registerModel) {
  return axios.post(baseUrl + "Authentication/Register", registerModel);
}
