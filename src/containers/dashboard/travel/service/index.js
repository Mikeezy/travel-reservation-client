import axios from '../../../../utils/axios'
import {getToken} from '../../../../utils/cookiesHandler'

const URL_ENDPOINT = process.env.REACT_APP_URL_ENDPOINT

export async function getAll(offset,limit) {

    const response = await axios.get(`${URL_ENDPOINT}/v1/travel?offset=${offset}&limit=${limit}`,{
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

export async function getAllBooking(offset,limit,id) {

    const response = await axios.get(`${URL_ENDPOINT}/v1/booking/${id}?offset=${offset}&limit=${limit}`,{
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

export async function getTowns() {

    const response = await axios.get(`${URL_ENDPOINT}/v1/town/getAllForSelect`,{
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

export async function getBus() {

    const response = await axios.get(`${URL_ENDPOINT}/v1/bus/getAllForSelect`,{
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

    const response = await axios.get(`${URL_ENDPOINT}/v1/travel/block/${_id}`,{
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

export async function blockBooking({_id}) {

    const response = await axios.get(`${URL_ENDPOINT}/v1/booking/block/${_id}`,{
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
    let dataDriving = []

    for (const item of values.driving) {
        
        dataDriving.push({
            bus : item.value
        })
    }

    const data = {
        ...values,
        from : values.from.value,
        to : values.to.value,
        driving : dataDriving
    }

    const response = await axios.post(`${URL_ENDPOINT}/v1/travel/save`,data,{
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

export async function saveBooking(values) {
    

    const response = await axios.post(`${URL_ENDPOINT}/v1/booking/save`,values,{
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