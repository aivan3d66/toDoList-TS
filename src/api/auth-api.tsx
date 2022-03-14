import {ApiResponseType, instance} from "./api";

type GetAuthResponseType = {
  id: number,
  email: string,
  login: string
};
export type LoginParamsType = {
  email: string,
  password: string,
  rememberMe: boolean,
  captcha?: string,
}

export const authAPI = {
  getAuth() {
    return instance.get<ApiResponseType<GetAuthResponseType>>(`/auth/me`)
  },
  login(data: LoginParamsType) {
    return instance.post<ApiResponseType<{userId?: number}>>(`/auth/login`, data)
  },
  logout() {
    return instance.delete<ApiResponseType<LoginParamsType>>(`/auth/login`)
  },
}
