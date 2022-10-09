import axios, { AxiosInstance } from "axios";

class Api {
  public axios: AxiosInstance;
  constructor(auth: string) {
    this.axios = axios.create({
      baseURL: process.env.REACT_APP_API_URL!,
      timeout: 10000,
      headers: {
        Authorization: `Bearer ${auth}`,
        "Content-Type": "application/json",
      },
    });
  }
}

export default Api;
