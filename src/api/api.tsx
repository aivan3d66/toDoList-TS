import axios from "axios";

export enum ResultCode {
  Success = 0,
  Error,
}

export type FieldsErrorsType = Array<{ field: string, error: string }>;
export type ApiResponseType<D = {}, RC = ResultCode> = {
  data: D,
  messages: Array<string>,
  resultCode: RC
}

const BASE_URL: string = `https://social-network.samuraijs.com/api/1.1`;

export const instance = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
  headers: {
    'API-KEY': '326f0c95-3947-488e-9603-2e37b5da986c',
  }
})