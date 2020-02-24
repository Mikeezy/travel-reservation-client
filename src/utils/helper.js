import {
    removeToken
} from './cookiesHandler'
import history from './history'
import {
    userLogout
} from '../containers/dashboard/auth/reducer/actions'

export function Logout(dispatch) {

    dispatch(userLogout())
    removeToken()
    history.push('/')

}

export function getRoleFormated(data) {

    switch (data) {
        case 'admin':
            return 'Administrateur'
            

        case 'manager':
            return 'Gestionnaire'
            

        case 'super admin':
            return 'Super admin'
            

        case 'user':
            return 'Client'
            

        default:
            return null
            
    }

}

export function reload(page,state = {}) {

    history.push('/admin/reload')

    if(state && Object.keys(state).length > 0){
        history.push(page,state)
    }else{

        history.push(page)
    }
    

}