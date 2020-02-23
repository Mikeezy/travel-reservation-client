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
import {saveBooking} from './service/index'
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
import { required, minLength, minValue} from "../../../components/dashboard/validationInput/validationInput";
import { useToasts } from 'react-toast-notifications'
import {
    useParams
} from 'react-router-dom'

const minLength2 = minLength(2)
const minLength12 = minLength(12)
const minValue1 = minValue(1)

const BookingForm = (props) => {
    
    const { addToast } = useToasts()
    const {id} = useParams()

    const { handleSubmit, submitting, dispatch} = props

    async function submit(values){

        try {
        
            await saveBooking({
                travel : id,
                guest : {
                    fullname : values.fullname,
                    phone_number : values.phone_number
                },
                passenger_number : values.passenger_number
            })

            dispatch(reset("bookingForm"))

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

        dispatch(reset("bookingForm"))

    }

    function goBack(e) {
        e.preventDefault()
        history.goBack()
    }

    return (
        <>
            <Header />
            
            <Container className="mt--7" fluid>

                <Row>
                    <div className="col">
                        <Card className="bg-secondary  shadow">
                            <CardHeader className="bg-white border-0">
                                <Row className="align-items-center">
                                    <Col xs="8">
                                        <h3 className="mb-0">Réservation</h3>
                                    </Col>
                                    <Col className="text-right" xs="4">
                                        <Button
                                            color="secondary"
                                            onClick={goBack}
                                            size="sm"
                                        >
                                            Retour
                                        </Button>
                                    </Col>
                                </Row>
                            </CardHeader>

                            <CardBody>

                                <Form onSubmit={handleSubmit(submit)}>
                                    
                                    <Row>
                                        <Col>
                                            <Field
                                                name="fullname"
                                                type="text"
                                                component={renderField}
                                                {...{
                                                    placeholder: '',
                                                    label : "Nom complet"
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
                                                    placeholder: 'exemple : +22998574411',
                                                    label : "Téléphone"
                                                }}
                                                validate={[required,minLength12]}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Field
                                                name="passenger_number"
                                                type="number"
                                                component={renderField}
                                                {...{
                                                    placeholder: '',
                                                    label : "Nombre de place"
                                                }}
                                                validate={[required,minValue1]}
                                            />
                                        </Col>
                                    </Row>
                                    
                                    <hr className="my-4" />

                                    <Row>

                                        <Col>

                                            <Button className="my-4" color="secondary" type="submit" onClick={clearValues} disabled={submitting}>
                                                Effacer
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

const bookingFormReduxForm = reduxForm({
    form: 'bookingForm'
})(BookingForm)

export default connect(null, null)(bookingFormReduxForm)