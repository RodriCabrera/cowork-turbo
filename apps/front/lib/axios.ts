/* eslint-disable no-useless-constructor */
import axios, { AxiosInstance } from 'axios'

export default class Axios {
  private static instance: AxiosInstance
  private constructor() {}

  static getInstance(): AxiosInstance {
    if (!Axios.instance) {
      Axios.instance = axios.create()
    }
    return Axios.instance
  }

  static setToken(token?: string) {
    if (token) {
      if (!Axios.instance) Axios.getInstance()
      Axios.instance.defaults.headers.common.Authorization = token
    }
  }
}
