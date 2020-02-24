import React,{useState} from "react"
import {
    Card,
    CardHeader,
    Container,
    CardFooter,
    Col,
    Button,
    Row,
} from "reactstrap"
import DataTable from "./table/index"
import {getAllSearchBooking,block} from './service/index'
import {dataLoad} from './reducer/actions'
import Header from "../../../components/dashboard/Headers/Header.jsx"
import ReactPaginate from 'react-paginate'
import {useDispatch} from 'react-redux'
import { useToasts } from 'react-toast-notifications'
import history from '../../../utils/history'
import notificationMessage from '../../../utils/notificationMessage'
import {reload} from '../../../utils/helper'
import FormSearchBooking from './FormSearchBooking'
import "../../../assets/css/pagination.css"

const LIMIT = 10

const Index = (props) => {
    
    const [loading,setLoading] = useState(false)
    const [datas,setData] = useState([])
    const [searchValue,setSearchValue] = useState({})
    const [pageCount,setPageCount] = useState(1)
    const dispatch = useDispatch()
    const { addToast } = useToasts()

    

    async function fetchData(offset) {

        setLoading(true)

        try {

            const _datas = await getAllSearchBooking(searchValue,offset,LIMIT)
            
            setData(_datas.data)

        } catch (error) {
        
            console.error(error)
            setData([])

        }
        setLoading(false)
    }

    

    async function handlePageClick({selected}){

        const offset = Math.ceil((+selected * +LIMIT))

        await fetchData(offset)

    }

    function edit(e) {
        e.preventDefault()
        dispatch(dataLoad(JSON.parse(e.currentTarget.dataset.item)))
        history.push('/admin/travel/save')
    }

    function add(e) {
        e.preventDefault()
        history.push('/admin/travel/save')
    }


    
    async function changeStatus(e) {
        e.preventDefault()
        
        try {
        
            await block(JSON.parse(e.currentTarget.dataset.item))

            addToast(notificationMessage.SUCCESS_MESSAGE, {
                appearance: 'success',
                autoDismiss: true,
            })

            reload('/admin/travel/search')

        } catch (error) {
        
            addToast(error.config ? notificationMessage.ERROR_MESSAGE : error.message, {
                appearance: 'error',
                autoDismiss: true,
            })

        }
    }

    async function getBookings(e) {
        e.preventDefault()
        
        const data = JSON.parse(e.currentTarget.dataset.item)

        history.push(`/admin/travel/getBookings/${data.id}`,{
            from : '/admin/travel/search'
        })
    }

    async function addBooking(e) {
        e.preventDefault()
        
        const data = JSON.parse(e.currentTarget.dataset.item)

        history.push(`/admin/travel/addBookings/${data.id}`)
    }

    return (
        <>
            <Header />
            
            <Container className="mt--7" fluid>

                <FormSearchBooking setLoading={setLoading} setData={setData} setPageCount={setPageCount} setSearchValue={setSearchValue} limit={LIMIT} />
                <br/>
                <br/>
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
                                            color="success"
                                            onClick={add}
                                            size="sm"
                                        >
                                            Ajouter
                                        </Button>
                                    </Col>
                                </Row>
                            </CardHeader>

                            <DataTable datas={datas} loading={loading} edit={edit} changeStatus={changeStatus} getBookings={getBookings} addBooking={addBooking} />

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