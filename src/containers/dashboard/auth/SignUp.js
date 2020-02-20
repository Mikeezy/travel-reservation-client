import React, {useState,useEffect} from "react"
import renderFieldWithIcon from '../../../components/dashboard/renderFieldWithIcon'
import { Field, reduxForm } from 'redux-form'
import {connect} from 'react-redux'
import { required,minLength, confirmPassword } from "../../../components/dashboard/validationInput/validationInput";
import {
    Button,
    Card,
    CardBody,
    Form,
    CardHeader,
    Alert,
    Col
} from "reactstrap"
import {
    checkToken,
    signupAdminConfirm
} from "./service/index"
import notificationMessage from '../../../utils/notificationMessage'
import history from '../../../utils/history'
import {
    useParams
} from 'react-router-dom'

const minLength2 = minLength(2)
const minLength7 = minLength(7)
const minLength12 = minLength(12)
const confirmPasswordRequired = confirmPassword('password')

const INIT = "INIT"
const PENDING = "PENDING"
const FINISH = "FINISH"

function getMessage (error) {
    if(error.code === 'TOKEN_EXPIRED'){
        return "Le lien utilisé a expiré, veuillez reprendre le processus svp"
    }else if(error.code === 'TOKEN_INVALID'){
        return "Ce lien est invalide, veuillez revérifier ce dernier svp !"
    }else{
        return error.message
    }
}

const Signup = ({handleSubmit, submitting}) => {
    
    const [alertMessage,setAlertMessage] = useState({show:true, type : 'warning', message : 'Vérification en cours...'})
    const [step,setStep] = useState(INIT)
    let { token } = useParams()

    useEffect(() => {
        
        async function check(){
            
            try {
            
                await checkToken(token)
    
                setStep(PENDING)
    
            } catch (error) {
    
                setAlertMessage({
                    show:true,
                    type : 'danger',
                    message : error.config ? notificationMessage.ERROR_MESSAGE : getMessage(error)
                })
    
            }

        }

        check()


    },[token])


    async function submit(values){
        
        try {
        
            await signupAdminConfirm(values,token)

            setStep(FINISH)

            setAlertMessage({
                show: true,
                type : 'success',
                message : `Compte crée avec succès ! vous pouvez maintenant vous connecter.`
            })

        } catch (error) {

            setAlertMessage({
                show: true,
                type : 'danger',
                message : error.config ? notificationMessage.ERROR_MESSAGE : getMessage(error)
            })

        }

        

    }

    function goToHome(e) {
        e.preventDefault()

        history.push('/')
    }


    return (
        <>
            <Col lg="5" md="7">

                <Card className="bg-secondary shadow border-0">
                    
                    {[INIT,FINISH].includes(step) && (

                        <CardHeader className="bg-transparent pb-5">

                            <div className="text-center">
                            
                                <Alert color={alertMessage.type}>
                                    {alertMessage.message}
                                </Alert>

                                {step === FINISH && (
                                    <>
                                        <br/>
                                        <Button className="my-4" color="info" onClick={goToHome} >
                                            Connexion
                                        </Button>
                                    </>
                                )}

                            </div>

                        </CardHeader>
                        
                    )}

                    
                    {step === PENDING && (

                        <CardBody className="px-lg-5 py-lg-5">
                        
                            <div className="text-center text-muted mb-4">
                                <small>Inscription</small>
                            </div>
    
                            <Form role="form" onSubmit={handleSubmit(submit)} >
                                
                                <Field
                                    name="lastname"
                                    type="text"
                                    component={renderFieldWithIcon}
                                    {...{
                                        icon: 'ni ni-badge',
                                        placeholder: 'Nom',
                                        addonType : 'prepend',
                                        inputGroupClassname : 'input-group-alternative',
                                        formGroupClassname : 'mb-3'
                                    }}
                                    validate={[required,minLength2]}
                                />

                                <Field
                                    name="firstname"
                                    type="text"
                                    component={renderFieldWithIcon}
                                    {...{
                                        icon: 'ni ni-badge',
                                        placeholder: 'Prénom',
                                        addonType : 'prepend',
                                        inputGroupClassname : 'input-group-alternative',
                                        formGroupClassname : 'mb-3'
                                    }}
                                    validate={[required,minLength2]}
                                />

                                <Field
                                    name="phone_number"
                                    type="text"
                                    component={renderFieldWithIcon}
                                    {...{
                                        icon: 'ni ni-collection',
                                        placeholder: 'Téléphone (exemple : +22998574411)',
                                        addonType : 'prepend',
                                        inputGroupClassname : 'input-group-alternative',
                                        formGroupClassname : 'mb-3'
                                    }}
                                    validate={[required,minLength12]}
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
                                    validate={[required,minLength7]}
                                />

                                <Field
                                    name="confirm_password"
                                    type="password"
                                    component={renderFieldWithIcon}
                                    {...{
                                        icon: 'ni ni-lock-circle-open',
                                        placeholder: 'Confirmer mot de passe',
                                        addonType : 'prepend',
                                        inputGroupClassname : 'input-group-alternative'
                                    }}
                                    validate={[required,confirmPasswordRequired]}
                                />
    
                                <div className="text-center">
                                    <Button className="my-4" color="primary" type="submit"  disabled={submitting}>
                                        {submitting ? 'Traitement en cours...' : 'Valider'}
                                    </Button>
                                </div>
    
                            </Form>
    
                        </CardBody>

                    )}


                </Card>

            </Col>
        </>
    )

}

const SignupFormReduxForm = reduxForm({
    form: 'signupForm'
})(Signup)

export default connect(null,null)(SignupFormReduxForm)