import React, {useState,useEffect} from "react"
import {
    Card,
    CardHeader,
    Alert,
    Col
} from "reactstrap"
import {
    signupConfirm
} from "./service/index"
import notificationMessage from '../../../utils/notificationMessage'
import {
    useParams
} from 'react-router-dom'

function getMessage (error) {
    if(error.code === 'TOKEN_EXPIRED'){
        return "Le lien utilisé a expiré, veuillez reprendre le processus svp"
    }else if(error.code === 'TOKEN_INVALID'){
        return "Ce lien est invalide, veuillez revérifier ce dernier svp !"
    }else{
        return error.message
    }
}

const SignupConfirmation = (props) => {
    
    const [alertMessage,setAlertMessage] = useState({type : 'warning', message : 'Vérification en cours...'})
    let { token } = useParams()

    useEffect(() => {
        
        async function check(){
            
            try {
            
                await signupConfirm(token)
    
                setAlertMessage({
                    type : 'success',
                    message : "Compte confirmé avec succès !, vous pouvez maintenant vous connecter."
                })
    
            } catch (error) {
    
                setAlertMessage({
                    type : 'danger',
                    message : error.config ? notificationMessage.ERROR_MESSAGE : getMessage(error)
                })
    
            }

        }

        check()


    },[token])



    return (
        <>
            <Col lg="5" md="7">

                <Card className="bg-secondary shadow border-0">
                    
                    <CardHeader className="bg-transparent pb-5">

                        <div className="text-center">
                        
                            <Alert color={alertMessage.type}>
                                {alertMessage.message}
                            </Alert>

                        </div>

                    </CardHeader>

                </Card>

            </Col>
        </>
    )

}


export default SignupConfirmation