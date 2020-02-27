import React from 'react'
import {Redirect,Route} from 'react-router-dom'
import {
    connect
} from 'react-redux'


const REDIRECT_PATHNAME = "/auth/signin"

const PrivateRoute = ({component : Component, permission = [],currentUser, ...rest}) => (

    <Route {...rest} render={props => {
    
        if(typeof currentUser.id !== 'undefined'){

            if(Array.isArray(permission)){

                if(permission.length === 0){

                    return <Component {...props} />

                }else{

                    if(permission.includes(currentUser.role)) {
                
                        return <Component {...props} />

                    }else{
                        
                        return <Redirect 
                            to={{
                                pathname : REDIRECT_PATHNAME,
                                state : {
                                    from : props.location
                                }
                            }} 
                        />
                    }

                }

            }else{
            
                return <Redirect 
                            to={{
                                pathname : REDIRECT_PATHNAME,
                                state : {
                                    from : props.location
                                }
                            }} 
                        />

            }

        }else{
        
            return <Redirect 
                            to={{
                                pathname : REDIRECT_PATHNAME,
                                state : {
                                    from : props.location
                                }
                            }} 
                        />

        }

    }} />
    
)

const mapStateToProps = ({currentUser}) => {

    return {
        currentUser
    }
}


export default connect(mapStateToProps,null)(PrivateRoute)