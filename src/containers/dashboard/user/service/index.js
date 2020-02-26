import axios from '../../../../utils/axios'
import {getToken} from '../../../../utils/cookiesHandler'

const URL_ENDPOINT = process.env.REACT_APP_URL_ENDPOINT

export async function getAll(offset,limit) {

    const response = await axios.get(`${URL_ENDPOINT}/v1/user?offset=${offset}&limit=${limit}`,{
        headers : {
            'Authorization' : `Bearer ${getToken()}`
        }
    })

    if (response.data.success) {

        return response.data.data

    } else {

        throw new Error(response.data.message)

    }

}

export async function block({_id}) {

    const response = await axios.get(`${URL_ENDPOINT}/v1/user/block/${_id}`,{
        headers : {
            'Authorization' : `Bearer ${getToken()}`
        }
    })

    if (response.data.success) {

        return response.data.data

    } else {

        throw new Error(response.data.message)

    }

}

export async function save(values) {

    const datas = {
        ...values,
        role : values.role.value
    }
    const response = await axios.post(`${URL_ENDPOINT}/v1/user/signupAdminPartOne`,datas,{
        headers : {
            'Authorization' : `Bearer ${getToken()}`
        }
    })

    if (response.data.success) {

        return response.data.data

    } else {

        throw new Error(response.data.message)

    }

}

export async function updateProfile(values) {

    const response = await axios.post(`${URL_ENDPOINT}/v1/user/updateProfile`,values,{
        headers : {
            'Authorization' : `Bearer ${getToken()}`
        }
    })

    if (response.data.success) {

        return response.data.data

    } else {

        throw new Error(response.data.message)

    }

}

export async function updatePassword(values) {

    const response = await axios.post(`${URL_ENDPOINT}/v1/user/updatePassword`,values,{
        headers : {
            'Authorization' : `Bearer ${getToken()}`
        }
    })

    if (response.data.success) {

        return response.data.data

    } else {

        throw new Error(response.data.message)

    }

}