import axios from "axios";
import { setTokens, clearTokens } from "../utils/token";
import api from "./axios";
const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export async function login(email, password) {
  const { data } = await api.post(
    `${BASE_URL}/api/token/`,
    { email, password , username: email},
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  // store tokens
  setTokens(data.access, data.refresh);
  return data;
}

export async function signup(payload) {
  console.log(">>>>>>>>>>payload",payload);
  // payload: { email, password, first_name, last_name }
  const { data } = await api.post(`${BASE_URL}/api/v1/cold-emailer/signup/`, payload, {
    headers: { "Content-Type": "application/json" },
  });
  console.log("data",data);
  setTokens(data.access, data.refresh);
  return data;
}

export function logout() {
  clearTokens();
}
