import Cookies from 'universal-cookie';

const cookies = new Cookies();


export const getToken = () => {

    return cookies.get('xxxx') || ''

}

export const setToken = (_token) => {

    return cookies.set('xxxx', _token,{
        path : '/'
    })

}

export const removeToken = () => {

    return cookies.remove('xxxx',{
        path : '/'
    })

}

export const getByName = (_name) => {

    return cookies.get(`${_name}`)

}

export const setByName = (_name, _token) => {

    return cookies.set(`${_name}`, _token,{
        path : '/'
    })

}

export const removeByName = (_name) => {

    return cookies.remove(`${_name}`)

}