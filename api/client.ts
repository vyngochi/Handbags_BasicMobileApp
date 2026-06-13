import axios from "axios";

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_URL ?? undefined,
  timeout: 10000,
});

export const apiServer = axios.create({
  baseURL: process.env.EXPO_PUBLIC_SERVER_URL ?? undefined,
  timeout: 30000,
});
