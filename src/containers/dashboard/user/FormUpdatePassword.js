import React from "react"
import {
    Card,
    CardHeader,
    Form,
    Col,
    CardBody,
    Button,
    Row,
} from "reactstrap"
import {updatePassword} from './service/index'
import renderField from '../../../components/dashboard/renderField'
import {
    Field,
    reduxForm,
    reset
} from 'redux-form'
import notificationMessage from '../../../utils/notificationMessage'
import {connect} from 'react-redux'
import { required,minLength} from "../../../components/dashboard/validationInput/validationInput";
import { useToasts } from 'react-toast-notifications'

const minLength7 = minLength(7)
const minLength5 = minLength(5)

const UserPasswordForm = (props) => {

    const { addToast } = useToasts()

    const { handleSubmit, submitting, dispatch} = props

    async function submit(values){

        try {
        
            await updatePassword(values)

            dispatch(reset("userPasswordForm"))

            addToast(notificationMessage.SUCCESS_MESSAGE, {
                appearance: 'success',
                autoDismiss: true,
            })

        } catch (error) {
        
            addToast(error.config ? notificationMessage.ERROR_MESSAGE : error.message, {
                appearance: 'error',
                autoDismiss: true,
            })

        }

    }

    

    return (

                <Row>
                    <div className="col">
                        <Card className="bg-secondary  shadow">
                            <CardHeader className="bg-white border-0">
                                <h3 className="mb-0">Modifier mot de passe</h3>
                            </CardHeader>

                            <CardBody>

                                <Form onSubmit={handleSubmit(submit)}>
                                    
                                    <Row>
                                        <Col>
                                            <Field
                                                name="old_password"
                                                type="password"
                                                component={renderField}
                                                {...{
                                                    placeholder: '',
                                                    label : "Ancien mot de passe"
                                                }}
                                                validate={[required,minLength5]}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Field
                                                name="password"
                                                type="password"
                                                component={renderField}
                                                {...{
                                                    placeholder: '',
                                                    label : "Nouveau mot de passe"
                                                }}
                                                validate={[required,minLength7]}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Field
                                                name="confirm_password"
                                                type="password"
                                                component={renderField}
                                                {...{
                                                    placeholder: '',
                                                    label : "Confirmer mot de passe"
                                                }}
                                                validate={[required,minLength7]}
                                            />
                                        </Col>
                                    </Row>
                                
                                    <hr className="my-4" />

                                    <Row>

                                        <Col>

                                            <Button className="my-4" color="success" type="submit"  disabled={submitting}>
                                                {submitting ? 'Traitement...' : 'Valider'}
                                            </Button>

                                        </Col>
                            
                                    </Row>
                                </Form>

                            </CardBody>
                        </Card>
                    </div>
                </Row>

    )

}


const userPasswordFormReduxForm = reduxForm({
    form: 'userPasswordForm'
})(UserPasswordForm)

export default connect(null, null)(userPasswordFormReduxForm)