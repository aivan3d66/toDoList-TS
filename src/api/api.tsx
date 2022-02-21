import axios from "axios";

export enum ResultCode {
  Success = 0,
  Error,
}
export type ApiResponseType<D = {}, RC = ResultCode> = {
  data: D,
  messages: Array<string>,
  resultCode: RC
}