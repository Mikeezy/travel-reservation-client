import React, {useState} from "react"
import renderFieldWithIcon from '../../../components/dashboard/renderFieldWithIcon'
import { Field, reduxForm } from 'redux-form'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { required,email,minLength } from "../../../components/dashboard/validationInput/validationInput";
import {
    Button,
    Card,
    CardBody,
    Form,
    Row,
    CardHeader,
    Alert,
    Col
} from "reactstrap"
import {
    auth
} from "./service/index"
import {
    userAuthenticated
} from "./reducer/actions"
import notificationMessage from '../../../utils/notificationMessage'
import {
    setToken,
    getToken,
    removeToken
} from '../../../utils/cookiesHandler'
import history from '../../../utils/history'

const minLength5 = minLength(5)

const Signin = ({handleSubmit, submitting, dispatch, location : {state}}) => {
    
    const [alertMessage,setAlertMessage] = useState({show:false, type : 'danger', message : ''})
    const [alertMessageFromAxiosInterceptor,setAlertMessageFromAxiosInterceptor] = useState({show:true, type : 'danger'})

    async function submit(values){
        
        try {
        
            const {token,...data} = await auth(values)

            if(data.role === "user"){

                setAlertMessage({
                    show: true,
                    type : 'warning',
                    message : `En tant que client, vous n'êtes pas autorisé a acceder à cette interface !`
                })

            }else{

                if(getToken()){
    
                    removeToken()
                    
                }
    
                setToken(token)
    
                dispatch(userAuthenticated(data))
    
                if(state && state.from && state.from.pathname !== "/auth/signin"){

                    history.push(state.from.pathname)

                }else{

                    history.push('/admin/index')
                }
            }

        } catch (error) {

            setAlertMessage({
                show: true,
                type : 'danger',
                message : error.config ? notificationMessage.ERROR_MESSAGE : error.message
            })

        }

    }


    return (
        <>
            <Col lg="5" md="7">

                <Card className="bg-secondary shadow border-0">
                    
                    {alertMessage.show && (

                        <CardHeader className="bg-transparent pb-5">

                            <div className="text-center">
                            
                                <Alert color={alertMessage.type} isOpen={alertMessage.show} toggle={() => setAlertMessage({...alertMessage,show : false})}>
                                    {alertMessage.message}
                                </Alert>

                            </div>

                        </CardHeader>
                        
                    )}

                    {state && state.messageFromAxiosInterceptor && alertMessageFromAxiosInterceptor.show && (

                        <CardHeader className="bg-transparent pb-5">

                            <div className="text-center">
                            
                                <Alert color={alertMessageFromAxiosInterceptor.type} isOpen={alertMessageFromAxiosInterceptor.show} toggle={() => setAlertMessageFromAxiosInterceptor({...alertMessageFromAxiosInterceptor,show : false})}>
                                    {state.messageFromAxiosInterceptor}
                                </Alert>

                            </div>

                        </CardHeader>
                        
                    )}


                    <CardBody className="px-lg-5 py-lg-5">
                    
                        <div className="text-center text-muted mb-4">
                            <small>Connectez-vous</small>
                        </div>

                        <Form role="form" onSubmit={handleSubmit(submit)} >
                            
                            <Field
                                name="email"
                                type="email"
                                component={renderFieldWithIcon}
                                {...{
                                    icon: 'ni ni-email-83',
                                    placeholder: 'Email',
                                    addonType : 'prepend',
                                    inputGroupClassname : 'input-group-alternative',
                                    formGroupClassname : 'mb-3'
                                }}
                                validate={[required,email]}
                            />

                            <Field
                                name="password"
                                type="password"
                                component={renderFieldWithIcon}
                                {...{
                                    icon: 'ni ni-lock-circle-open',
                                    placeholder: 'Mot de passe',
                                    addonType : 'prepend',
                                    inputGroupClassname : 'input-group-alternative'
                                }}
                                validate={[required,minLength5]}
                            />

                            <div className="text-center">
                                <Button className="my-4" color="primary" type="submit"  disabled={submitting}>
                                    {submitting ? 'Vérification...' : 'Valider'}
                                </Button>
                            </div>

                        </Form>

                    </CardBody>

                </Card>

                <Row className="mt-3">

                    <Col xs="6">

                        <Link to="/auth/resetPassword_" className="text-light" >
                            <small>Mot de passe oublié ?</small>
                        </Link>
                        
                    </Col>

                </Row>
            </Col>
        </>
    )

}

const SigninFormReduxForm = reduxForm({
    form: 'signinForm'
})(Signin)

export default connect(null,null)(SigninFormReduxForm)