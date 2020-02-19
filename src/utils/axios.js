import axios from "axios"
import {
    removeToken
} from "./cookiesHandler"
import { userLogout } from "../containers/dashboard/auth/reducer/actions"
import history from "./history"

const instance = axios.create({
    baseURL: process.env.REACT_APP_URL_ENDPOINT
})

const restrictedCode = ['TOKEN_NOT_PROVIDED','TOKEN_EXPIRED','TOKEN_INVALID']

export function configAxiosInterceptor(store) {

    instance.interceptors.response.use(function (response) {
        
        if(response.data.success === false && restrictedCode.includes(response.data.code)) {

            store.dispatch(userLogout())

            removeToken()

            history.push('/auth/signin',{
                messageFromAxiosInterceptor : response.data.message
            })

        }

        return response;
    }, function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    })

}

export default instance