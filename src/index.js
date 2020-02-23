import React from "react";
import ReactDOM from "react-dom";
import dotEnv from 'dotenv'
import { Provider } from 'react-redux';
import * as serviceWorker from './utils/serviceWorker';
import store from './redux/store';
import Routes from './MainRoutes';
import {configAxiosInterceptor} from "./utils/axios"
import { ToastProvider} from 'react-toast-notifications'

import "./assets/vendor/nucleo/css/nucleo.css";
import "./assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/scss/argon-dashboard-react.scss";
import './assets/css/react-datetime.css'


dotEnv.config()
configAxiosInterceptor(store)

ReactDOM.render(
    <Provider store={store}>
      <ToastProvider>
        <Routes />
      </ToastProvider>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
