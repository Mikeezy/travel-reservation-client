import axios from '../../../../utils/axios'
import axios2 from 'axios'

const URL_ENDPOINT = process.env.REACT_APP_URL_ENDPOINT

export async function auth(values) {

    const response = await axios.post(`${URL_ENDPOINT}/v1/auth/signinAdmin`, values)

    if (response.data.success) {

        if (response.data.data.blocked) {

            throw new Error(`Votre compte a été bloqué, veuillez contacter l'administrateur svp !`)

        } else if (!response.data.data.status) {

            throw new Error(`Veuillez confirmer votre inscription via le mail envoyé à votre adresse svp !`)

        } else {

            return response.data.data

        }

    } else {

        throw new Error(response.data.message)

    }

}

export async function resetPassword(values) {

    const response = await axios2.post(`${URL_ENDPOINT}/v1/auth/resetPasswordPartOne`, values)

    if (response.data.success) {

        return response.data.data

    } else {

        throw new Error(response.data.message)

    }

}

export async function resetPasswordConfirm(values,token) {

    const response = await axios2.post(`${URL_ENDPOINT}/v1/auth/resetPasswordPartTwo/${token}`,values)

    if (response.data.success) {

        return response.data.data

    } else {

        const error = new Error(response.data.message)
        error.code = response.data.code

        throw error

    }

}

export async function signupConfirm(token) {

    const response = await axios2.get(`${URL_ENDPOINT}/v1/auth/signupPartTwo/${token}`)

    if (response.data.success) {

        return response.data.data

    } else {

        const error = new Error(response.data.message)
        error.code = response.data.code

        throw error

    }

}

export async function checkToken(token) {

    const response = await axios2.get(`${URL_ENDPOINT}/v1/auth/checkToken/${token}`)

    if (response.data.success) {

        return response.data.data

    } else {

        const error = new Error(response.data.message)
        error.code = response.data.code

        throw error

    }

}

export async function signupAdminConfirm(values,token) {

    const response = await axios2.post(`${URL_ENDPOINT}/v1/auth/signupAdminPartTwo/${token}`,values)

    if (response.data.success) {

        return response.data.data

    } else {

        const error = new Error(response.data.message)
        error.code = response.data.code

        throw error

    }

}