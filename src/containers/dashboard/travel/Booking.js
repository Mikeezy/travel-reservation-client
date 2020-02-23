import React,{useState,useEffect} from "react"
import {
    Card,
    CardHeader,
    Container,
    CardFooter,
    Col,
    Button,
    Row,
} from "reactstrap"
import DataTable from "./table/index_booking"
import {getAllBooking,blockBooking} from './service/index'
import Header from "../../../components/dashboard/Headers/Header.jsx"
import ReactPaginate from 'react-paginate'
import { useToasts } from 'react-toast-notifications'
import history from '../../../utils/history'
import notificationMessage from '../../../utils/notificationMessage'
import {reload} from '../../../utils/helper'
import {useParams} from 'react-router-dom'
import "../../../assets/css/pagination.css"

const LIMIT = 10

const Index = ({location : {state}}) => {
    
    const [loading,setLoading] = useState(false)
    const [datas,setData] = useState([])
    const [pageCount,setPageCount] = useState(1)
    const [offset,setOffset] = useState(0)
    const { addToast } = useToasts()
    const {id} = useParams()

    

    useEffect(() => {
        
        setLoading(true)

        async function fetchData() {

            try {
    
                const _datas = await getAllBooking(offset,LIMIT,id)
                
                setData(_datas.data)

                if(offset === 0) {
                    setPageCount(Math.ceil(+_datas.total / +LIMIT))
                }
    
            } catch (error) {
            
                console.error(error)
    
            }
            setLoading(false)
        }
        
        fetchData()

    },[offset,id])

    

    function handlePageClick({selected}){

        setOffset(Math.ceil((+selected * +LIMIT)))

    }

    function goBack(e) {
        e.preventDefault()

        if(state && state.from){

            history.push(state.from)
        }

        history.push('/admin/travel')
    }

    
    async function changeStatus(e) {
        e.preventDefault()
        
        try {
        
            await blockBooking(JSON.parse(e.currentTarget.dataset.item))

            addToast(notificationMessage.SUCCESS_MESSAGE, {
                appearance: 'success',
                autoDismiss: true,
            })

            if(state && state.from){

                reload(`/admin/travel/getBookings/${id}`,state)
            }

            reload(`/admin/travel/getBookings/${id}`)

        } catch (error) {
        
            addToast(error.config ? notificationMessage.ERROR_MESSAGE : error.message, {
                appearance: 'error',
                autoDismiss: true,
            })

        }
    }

    return (
        <>
            <Header />
            
            <Container className="mt--7" fluid>

                <Row>
                    <div className="col">
                        <Card className="shadow">

                            <CardHeader className="bg-white border-0">
                                <Row className="align-items-center">
                                    <Col xs="8">
                                        <h3 className="mb-0">Liste</h3>
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

                            <DataTable datas={datas} loading={loading} changeStatus={changeStatus} />

                            <CardFooter className="py-4">
                                <nav aria-label="...">

                                    <ReactPaginate
                                        previousLabel={'Précédent'}
                                        nextLabel={'Suivant'}
                                        breakLabel={'...'}
                                        breakClassName={'break-me'}
                                        pageCount={pageCount ? pageCount : 1}
                                        marginPagesDisplayed={2}
                                        pageRangeDisplayed={5}
                                        onPageChange={handlePageClick}
                                        containerClassName={'pagination'}
                                        subContainerClassName={'pages pagination'}
                                        activeClassName={'active'}
                                        />

                                </nav>
                            </CardFooter>
                        </Card>
                    </div>
                </Row>

            </Container>
        </>
    )

}

export default Index