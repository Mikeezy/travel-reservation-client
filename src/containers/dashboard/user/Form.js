import React from "react"
import {
    Card,
    CardHeader,
    Container,
    Form,
    Col,
    CardBody,
    Button,
    Row,
} from "reactstrap"
import {save} from './service/index'
import Header from "../../../components/dashboard/Headers/Header.jsx"
import renderField from '../../../components/dashboard/renderField'
import renderFieldSelectSimple from '../../../components/dashboard/renderFieldSelectSimple'
import {
    Field,
    reduxForm,
    reset
} from 'redux-form'
import notificationMessage from '../../../utils/notificationMessage'
import {connect} from 'react-redux'
import { required,email} from "../../../components/dashboard/validationInput/validationInput";
import { useToasts } from 'react-toast-notifications'

const UserForm = (props) => {

    const { addToast } = useToasts()

    const { handleSubmit, submitting, dispatch} = props

    async function submit(values){

        try {
        
            await save(values)


            dispatch(reset("userForm"))

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

    function clearValues(e){
        e.preventDefault()

        dispatch(reset("userForm"))

    }

    return (
        <>
            <Header />
            
            <Container className="mt--7" fluid>

                <Row>
                    <div className="col">
                        <Card className="bg-secondary  shadow">
                            <CardHeader className="bg-white border-0">
                                <h3 className="mb-0">Utilisateur</h3>
                            </CardHeader>

                            <CardBody>

                                <Form onSubmit={handleSubmit(submit)}>
                                    
                                    <Row>
                                        <Col>
                                            <Field
                                                name="email"
                                                type="email"
                                                component={renderField}
                                                {...{
                                                    placeholder: '',
                                                    label : "Email"
                                                }}
                                                validate={[required,email]}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Field
                                                name="role"
                                                component={renderFieldSelectSimple}
                                                {...{
                                                    placeholder: 'Selectionner...',
                                                    label : "Role",
                                                    options : [{
                                                        value : "admin",
                                                        label : "Admin"
                                                    },
                                                    {
                                                        value : "manager",
                                                        label : "Gestionnaire"
                                                    }]
                                                }}
                                                validate={[required]}
                                            />
                                        </Col>
                                    </Row>
                                
                                    <hr className="my-4" />

                                    <Row>

                                        <Col>

                                            <Button className="my-4" color="secondary" type="submit" onClick={clearValues} disabled={submitting}>
                                                {'Effacer'}
                                            </Button>

                                            {" "}

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

            </Container>
        </>
    )

}


const userFormReduxForm = reduxForm({
    form: 'userForm',
    enableReinitialize: true,
    destroyOnUnmount : false
})(UserForm)

export default connect(null, null)(userFormReduxForm)