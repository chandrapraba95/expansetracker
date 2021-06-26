import React from "react";
import {Provider} from "react-redux";
import { store } from "./Store";
import App from "./App";
import { ToastProvider, useToasts } from 'react-toast-notifications';

const NextApp = () =>
<Provider store={store}>
  <ToastProvider autoDismiss={true} autoDismissTimeout={1000}  placement="top-center">
    <App />
  </ToastProvider>
</Provider>;


export default NextApp;
