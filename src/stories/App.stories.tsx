import React from "react";
import App from "../App";
import {ReduxStoreProviderDecorator} from "./RedusStoreProviderDecorator";

export default {
  title: 'Project/App Component',
  component: App,
  decorators: [ReduxStoreProviderDecorator]
}

export const AppExample = (props: any) => {
  return (
    <App/>
  )
}