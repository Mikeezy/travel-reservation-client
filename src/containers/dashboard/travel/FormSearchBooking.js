import React,{useState,useEffect} from "react"
import {
    Card,
    CardHeader,
    Form,
    Col,
    CardBody,
    Button,
    Row,
} from "reactstrap"
import {getTowns,getAllSearchBooking} from './service/index'
import renderFieldSelectSimple from '../../../components/dashboard/renderFieldSelectSimple'
import renderFieldDateTime from '../../../components/dashboard/renderFieldDateTime'
import {
    Field,
    reduxForm,
    reset
} from 'redux-form'
import {connect} from 'react-redux'
import { useToasts } from 'react-toast-notifications'
import notificationMessage from '../../../utils/notificationMessage'


const SearchBookingForm = (props) => {
    
    const [towns,setTowns] = useState([])
    const [towns2,setTowns2] = useState([])
    const { addToast } = useToasts()

    const { handleSubmit, submitting, dispatch,setLoading,setData,setPageCount,setSearchValue,limit} = props

    useEffect(() => {

        (async function () {

            try {

                const townsData = await getTowns()
                
                setTowns(townsData)
                setTowns2(townsData)

            } catch (error) {
            
                console.error(error)
                setTowns([])
                setTowns2([])
    
            }

        })()
        
    },[])

    

    function clearValues(e){
        e.preventDefault()

        dispatch(reset("searchBookingForm"))

    }

    async function submitCheck(values){
        
        const datas = {
            ...values
        }

        setLoading(true)

        try {

            if(datas.from){
                datas.from = datas.from.value
            }

            if(datas.to){
                datas.to = datas.to.value
            }

            const _datas = await getAllSearchBooking(datas,0,limit)
                
            setData(_datas.data)

            setPageCount(Math.ceil(+_datas.total / +limit))

            setSearchValue(values)
            

        } catch (error) {
        
            console.error(error)
            setData([])
            setPageCount(1)
            setSearchValue({})

            addToast(error.config ? notificationMessage.ERROR_MESSAGE : error.message, {
                appearance: 'error',
                autoDismiss: true,
            })

        }

        setLoading(false)

    }

    return (

                <Row>
                    <div className="col">
                        <Card className="bg-secondary  shadow">
                            <CardHeader className="bg-white border-0">
                                <h3 className="mb-0">Rechercher</h3>
                            </CardHeader>

                            <CardBody>

                                <Form onSubmit={handleSubmit(submitCheck)}>
                                    
                                    <Row>
                                        <Col xs="4" >
                                            <Field
                                                name="from"
                                                component={renderFieldSelectSimple}
                                                {...{
                                                    placeholder: 'Selectionner...',
                                                    label : "Ville de départ",
                                                    options : towns,
                                                    searchableValue : true,
                                                }}
                                                
                                            />
                                        </Col>

                                        <Col xs="4" >

                                            <Field
                                                name="to"
                                                component={renderFieldSelectSimple}
                                                {...{
                                                    placeholder: 'Selectionner...',
                                                    label : "Ville d'arrivée",
                                                    options : towns2,
                                                    searchableValue : true,
                                                }}
                                                
                                            />

                                        </Col>

                                        <Col xs="4" >

                                            <Field
                                                name="date_departing"
                                                component={renderFieldDateTime}
                                                {...{
                                                    placeholder: '',
                                                    dateFormat:'DD/MM/YYYY',
                                                    label : "Date de départ"
                                                }}
                                                
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
                                                {submitting ? 'En cours...' : 'Valider'}
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

const searchBookingFormReduxForm = reduxForm({
    form: 'searchBookingForm',
    destroyOnUnmount : false
})(SearchBookingForm)

export default connect(null, null)(searchBookingFormReduxForm)