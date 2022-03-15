export type Filters = {
  ALL: string,
  COMPLETED: string,
  ACTIVE: string,
}

export const FILTERS: Filters = {
  ALL: 'all',
  COMPLETED: 'completed',
  ACTIVE: 'active',
}

export const SET_ERROR_NAME = 'Field is required';

export const ROUTES = {
  LOGIN: "/login",
  APP: "/",
  HOME: "/toDoList-TS",
}
