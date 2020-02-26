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
import {updateProfile} from './service/index'
import renderField from '../../../components/dashboard/renderField'
import {
    Field,
    reduxForm
} from 'redux-form'
import notificationMessage from '../../../utils/notificationMessage'
import {connect} from 'react-redux'
import { required,minLength} from "../../../components/dashboard/validationInput/validationInput";
import { useToasts } from 'react-toast-notifications'
import {
    userAuthenticated
} from "../auth/reducer/actions"
import {reload} from '../../../utils/helper'

const minLength2 = minLength(2)
const minLength12 = minLength(12)

const UserProfileForm = (props) => {

    const { addToast } = useToasts()

    const { handleSubmit, submitting, dispatch, pristine} = props

    async function submit(values){

        try {
        
            await updateProfile(values)

            values.fullname = `${values.lastname} ${values.firstname}`
            
            dispatch(userAuthenticated(values))

            reload('/admin/user-profile')

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
                                <h3 className="mb-0">Profil</h3>
                            </CardHeader>

                            <CardBody>

                                <Form onSubmit={handleSubmit(submit)}>
                                    
                                    <Row>
                                        <Col>
                                            <Field
                                                name="lastname"
                                                type="text"
                                                component={renderField}
                                                {...{
                                                    placeholder: '',
                                                    label : "Nom"
                                                }}
                                                validate={[required,minLength2]}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Field
                                                name="firstname"
                                                type="text"
                                                component={renderField}
                                                {...{
                                                    placeholder: '',
                                                    label : "Prénom"
                                                }}
                                                validate={[required,minLength2]}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Field
                                                name="phone_number"
                                                type="text"
                                                component={renderField}
                                                {...{
                                                    placeholder: 'Téléphone (exemple : +22998574411)',
                                                    label : "Téléphone"
                                                }}
                                                validate={[required,minLength12]}
                                            />
                                        </Col>
                                    </Row>
                                
                                    <hr className="my-4" />

                                    <Row>

                                        <Col>

                                            <Button className="my-4" color="success" type="submit"  disabled={pristine || submitting}>
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


const userProfileFormReduxForm = reduxForm({
    form: 'userProfileForm',
    enableReinitialize: true
})(UserProfileForm)

export default connect(null, null)(userProfileFormReduxForm)