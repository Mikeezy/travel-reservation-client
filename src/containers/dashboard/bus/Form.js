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
import {
    Field,
    reduxForm,
    reset
} from 'redux-form'
import history from '../../../utils/history'
import notificationMessage from '../../../utils/notificationMessage'
import {connect} from 'react-redux'
import { required, minLength,minValue} from "../../../components/dashboard/validationInput/validationInput";
import { useToasts } from 'react-toast-notifications'
import {dataClear} from './reducer/actions'

const minLength4 = minLength(4)
const minLength2 = minLength(2)
const minValue4 = minValue(4)

const BusForm = (props) => {

    const { addToast } = useToasts()

    const { handleSubmit, pristine, submitting,initialValues, dispatch} = props

    async function submit(values){

        try {
        
            await save(values)

            if(initialValues.id){

                dispatch(dataClear())
            }

            dispatch(reset("busForm"))

            addToast(notificationMessage.SUCCESS_MESSAGE, {
                appearance: 'success',
                autoDismiss: true,
            })

            if(initialValues.id){

                history.push('/admin/bus')

            }

        } catch (error) {
        
            addToast(error.config ? notificationMessage.ERROR_MESSAGE : error.message, {
                appearance: 'error',
                autoDismiss: true,
            })

        }

    }

    function clearValues(e){
        e.preventDefault()

        dispatch(reset("busForm"))

        if(initialValues.id){

            dispatch(dataClear())

            history.push('/admin/bus')

        }
    }

    return (
        <>
            <Header />
            
            <Container className="mt--7" fluid>

                <Row>
                    <div className="col">
                        <Card className="bg-secondary  shadow">
                            <CardHeader className="bg-white border-0">
                                <h3 className="mb-0">Bus</h3>
                            </CardHeader>

                            <CardBody>

                                <Form onSubmit={handleSubmit(submit)}>
                                    <Field
                                        name="id"
                                        type="hidden"
                                        component="input"
                                    />
                                    <Row>
                                        <Col>
                                            <Field
                                                name="name"
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
                                                name="immatriculation_number"
                                                type="text"
                                                component={renderField}
                                                {...{
                                                    placeholder: '',
                                                    label : "Numéro d'immatriculation"
                                                }}
                                                validate={[required,minLength4]}
                                            />
                                        </Col>
                                    </Row>
                                
                                    <Row>
                                        <Col>
                                            <Field
                                                name="capacity"
                                                type="number"
                                                component={renderField}
                                                {...{
                                                    placeholder: '',
                                                    label : "Capacité"
                                                }}
                                                validate={[required,minValue4]}
                                            />
                                        </Col>
                                    </Row>

                                    <hr className="my-4" />

                                    <Row>

                                        <Col>

                                            <Button className="my-4" color="secondary" type="submit" onClick={clearValues} disabled={submitting}>
                                                {initialValues.id ? 'Retour' : 'Effacer'}
                                            </Button>

                                            {" "}

                                            <Button className="my-4" color="success" type="submit"  disabled={initialValues.id ? pristine || submitting : submitting}>
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

const mapStateToProps = ({currentBus}) => {
    return {
        initialValues: currentBus
    }
}

const busFormReduxForm = reduxForm({
    form: 'busForm',
    enableReinitialize: true,
    destroyOnUnmount : false
})(BusForm)

export default connect(mapStateToProps, null)(busFormReduxForm)