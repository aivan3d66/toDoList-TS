import {ApiResponseType, instance} from "./api";

type GetAuthResponseType = {
  id: number,
  email: string,
  login: string
};
type LoginResponseType = {
  email: string,
  password: string,
  rememberMe: boolean,
  captcha: string,
}

export const authAPI = {
  getAuth() {
    return instance.get<ApiResponseType<GetAuthResponseType>>(`/auth/me`)
  },
  login(email: string, password: string, rememberMe: boolean, captcha: string,) {
    return instance.post<ApiResponseType<LoginResponseType>>(`/auth/login`, {email, password, rememberMe, captcha})
  },
  logout() {
    return instance.delete<ApiResponseType<LoginResponseType>>(`/auth/login`)
  },
}
