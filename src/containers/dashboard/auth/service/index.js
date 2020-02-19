import axios from '../../../../utils/axios'

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