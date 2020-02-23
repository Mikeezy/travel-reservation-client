import React, {useState} from "react"
import renderFieldWithIcon from '../../../components/dashboard/renderFieldWithIcon'
import { Field, reduxForm,reset } from 'redux-form'
import {connect} from 'react-redux'
import { required,email} from "../../../components/dashboard/validationInput/validationInput";
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
    resetPassword
} from "./service/index"
import notificationMessage from '../../../utils/notificationMessage'

const ResetPassword = ({handleSubmit, submitting, dispatch}) => {
    
    const [alertMessage,setAlertMessage] = useState({show:false, type : 'danger', message : ''})

    async function submit(values){
        
        try {
        
            await resetPassword(values)

            setAlertMessage({
                show: true,
                type : 'success',
                message : notificationMessage.RESET_PASSWORD_SUCCESS_MESSAGE
            })

            dispatch(reset('resetPasswordForm'))

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


                    <CardBody className="px-lg-5 py-lg-5">
                    
                        <div className="text-center text-muted mb-4">
                            <small>Mot de passe oublié</small>
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

                            <div className="text-center">
                                <Button className="my-4" color="primary" type="submit"  disabled={submitting}>
                                    {submitting ? 'Vérification...' : 'Valider'}
                                </Button>
                            </div>

                        </Form>

                    </CardBody>

                </Card>

            </Col>
        </>
    )

}

const ResetPasswordFormReduxForm = reduxForm({
    form: 'resetPasswordForm'
})(ResetPassword)

export default connect(null,null)(ResetPasswordFormReduxForm)