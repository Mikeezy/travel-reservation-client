import React,{useState,useEffect} from "react"
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
import {save,getTowns,getBus} from './service/index'
import Header from "../../../components/dashboard/Headers/Header.jsx"
import renderField from '../../../components/dashboard/renderField'
import renderFieldSelectMulti from '../../../components/dashboard/renderFieldSelectMulti'
import renderFieldSelectSimple from '../../../components/dashboard/renderFieldSelectSimple'
import renderFieldDateTime from '../../../components/dashboard/renderFieldDateTime'
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
import {dataClear} from './reducer/actions'

const minLength2 = minLength(2)
const minValue0 = minValue(0)

const TravelForm = (props) => {
    
    const [towns,setTowns] = useState([])
    const [towns2,setTowns2] = useState([])
    const [bus,setBus] = useState([])
    const { addToast } = useToasts()

    const { handleSubmit, pristine, submitting,initialValues, dispatch} = props

    useEffect(() => {

        (async function () {

            try {

                const townsData = await getTowns()
                const busData = await getBus()
                
                setTowns(townsData)
                setTowns2(townsData)
                setBus(busData)

            } catch (error) {
            
                console.error(error)
                setTowns([])
                setTowns2([])
                setBus([])
    
            }

        })()
        
    },[initialValues])

    async function submit(values){

        try {
        
            await save(values)

            if(initialValues.id){

                dispatch(dataClear())
            }

            dispatch(reset("travelForm"))

            addToast(notificationMessage.SUCCESS_MESSAGE, {
                appearance: 'success',
                autoDismiss: true,
            })

            if(initialValues.id){

                history.push('/admin/travel')

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

        dispatch(reset("travelForm"))

        if(initialValues.id){

            dispatch(dataClear())

            history.push('/admin/travel')

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
                                <h3 className="mb-0">Voyage</h3>
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
                                                name="from"
                                                component={renderFieldSelectSimple}
                                                {...{
                                                    placeholder: 'Selectionner...',
                                                    label : "Ville de départ",
                                                    options : towns,
                                                    searchableValue : true,
                                                }}
                                                validate={[required]}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Field
                                                name="to"
                                                component={renderFieldSelectSimple}
                                                {...{
                                                    placeholder: 'Selectionner...',
                                                    label : "Ville d'arrivée",
                                                    options : towns2,
                                                    searchableValue : true,
                                                }}
                                                validate={[required]}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Field
                                                name="price"
                                                type="number"
                                                component={renderField}
                                                {...{
                                                    placeholder: '',
                                                    label : "Prix"
                                                }}
                                                validate={[required,minValue0]}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Field
                                                name="date_departing"
                                                component={renderFieldDateTime}
                                                {...{
                                                    placeholder: '',
                                                    dateFormat:'DD/MM/YYYY',
                                                    timeFormat : 'HH:mm',
                                                    label : "Date de départ"
                                                }}
                                                validate={[required]}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Field
                                                name="date_arriving"
                                                component={renderFieldDateTime}
                                                {...{
                                                    placeholder: '',
                                                    dateFormat:'DD/MM/YYYY',
                                                    timeFormat : 'HH:mm',
                                                    label : "Date d'arrivée"
                                                }}
                                                validate={[required]}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Field
                                                name="driving"
                                                component={renderFieldSelectMulti}
                                                {...{
                                                    placeholder: 'Selectionner...',
                                                    label : "Bus",
                                                    options : bus,
                                                    searchableValue : true,
                                                }}
                                                validate={[required]}
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

const mapStateToProps = ({currentTravel}) => {
    return {
        initialValues: currentTravel
    }
}

const travelFormReduxForm = reduxForm({
    form: 'travelForm',
    enableReinitialize: true,
    destroyOnUnmount : false
})(TravelForm)

export default connect(mapStateToProps, null)(travelFormReduxForm)