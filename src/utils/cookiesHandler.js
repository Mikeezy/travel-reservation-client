import Cookies from 'universal-cookie';

const cookies = new Cookies();


export const getToken = () => {

    return cookies.get('lbk_a_t') || ''

}

export const setToken = (_token) => {

    return cookies.set('lbk_a_t', _token,{
        path : '/'
    })

}

export const removeToken = () => {

    return cookies.remove('lbk_a_t',{
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