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
import DataTable from "./table/index"
import {getAll,block} from './service/index'
import {dataLoad} from './reducer/actions'
import Header from "../../../components/dashboard/Headers/Header.jsx"
import ReactPaginate from 'react-paginate'
import {useDispatch} from 'react-redux'
import { useToasts } from 'react-toast-notifications'
import history from '../../../utils/history'
import notificationMessage from '../../../utils/notificationMessage'
import {reload} from '../../../utils/helper'
import "../../../assets/css/pagination.css"

const LIMIT = 10

const Index = (props) => {
    
    const [loading,setLoading] = useState(false)
    const [datas,setData] = useState([])
    const [pageCount,setPageCount] = useState(1)
    const [offset,setOffset] = useState(0)
    const dispatch = useDispatch()
    const { addToast } = useToasts()

    

    useEffect(() => {
        
        setLoading(true)

        async function fetchData() {

            try {
    
                const _datas = await getAll(offset,LIMIT)
                
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

    },[offset])

    

    function handlePageClick({selected}){

        setOffset(Math.ceil((+selected * +LIMIT)))

    }

    function edit(e) {
        e.preventDefault()
        dispatch(dataLoad(JSON.parse(e.currentTarget.dataset.item)))
        history.push('/admin/bus/save')
    }

    function add(e) {
        e.preventDefault()
        history.push('/admin/bus/save')
    }

    
    async function changeStatus(e) {
        e.preventDefault()
        
        try {
        
            await block(JSON.parse(e.currentTarget.dataset.item))

            addToast(notificationMessage.SUCCESS_MESSAGE, {
                appearance: 'success',
                autoDismiss: true,
            })

            reload('/admin/bus')

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
                                            color="success"
                                            onClick={add}
                                            size="sm"
                                        >
                                            Ajouter
                                        </Button>
                                    </Col>
                                </Row>
                            </CardHeader>

                            <DataTable datas={datas} loading={loading} edit={edit} changeStatus={changeStatus} />

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