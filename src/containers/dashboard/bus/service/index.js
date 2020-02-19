import axios from '../../../../utils/axios'
import {getToken} from '../../../../utils/cookiesHandler'

const URL_ENDPOINT = process.env.REACT_APP_URL_ENDPOINT

export async function getAll(offset,limit) {

    const response = await axios.get(`${URL_ENDPOINT}/v1/bus/getAll?offset=${offset}&limit=${limit}`,{
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

    const response = await axios.get(`${URL_ENDPOINT}/v1/bus/block/${_id}`,{
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

    const response = await axios.post(`${URL_ENDPOINT}/v1/bus/save`,values,{
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