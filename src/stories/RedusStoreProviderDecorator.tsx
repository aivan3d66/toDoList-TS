import React from "react"
import {Provider} from "react-redux"
import store from "../state/redux-store"

export const ReduxStoreProviderDecorator = (story: any) => {
  return (
    <Provider store={store}>
      story();
    </Provider>
  )
}