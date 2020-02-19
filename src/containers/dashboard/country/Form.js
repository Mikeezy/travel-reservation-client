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
import { required, minLength} from "../../../components/dashboard/validationInput/validationInput";
import { useToasts } from 'react-toast-notifications'
import {dataClear} from './reducer/actions'

const minLength2 = minLength(2)

const CountryForm = (props) => {

    const { addToast } = useToasts()

    const { handleSubmit, pristine, submitting,initialValues, dispatch} = props

    async function submit(values){

        try {
        
            await save(values)

            if(initialValues.id){

                dispatch(dataClear())
            }

            dispatch(reset("countryForm"))

            addToast(notificationMessage.SUCCESS_MESSAGE, {
                appearance: 'success',
                autoDismiss: true,
            })

            if(initialValues.id){

                history.push('/admin/country')

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

        dispatch(reset("countryForm"))

        if(initialValues.id){

            dispatch(dataClear())

            history.push('/admin/country')

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

const mapStateToProps = ({currentCounty}) => {
    return {
        initialValues: currentCounty
    }
}

const countryFormReduxForm = reduxForm({
    form: 'countryForm',
    enableReinitialize: true,
    destroyOnUnmount : false
})(CountryForm)

export default connect(mapStateToProps, null)(countryFormReduxForm)