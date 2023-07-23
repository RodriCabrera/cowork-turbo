/* eslint-disable no-useless-constructor */
import axios, { AxiosInstance } from 'axios'

export default class Axios {
  private static instance: AxiosInstance
  private constructor() {}

  static getInstance(token?: string): AxiosInstance {
    if (!Axios.instance) {
      Axios.instance = axios.create({
        baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
        headers: { 'Content-type': 'application/json' }
      })
    }
    if (token) Axios.setToken(token)
    return Axios.instance
  }

  private static setToken(token: string) {
    Axios.instance.defaults.headers.common.Authorization = `Bearer ${token}`
  }
}
