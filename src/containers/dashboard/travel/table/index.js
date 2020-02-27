import React,{useState} from "react"
import { Table, Column, HeaderCell, Cell } from 'rsuite-table'
import {
    Badge,
    Button
} from "reactstrap"
import {Link} from "react-router-dom"
import moment from "moment"

import 'rsuite-table/dist/css/rsuite-table.css'

const rowKey = '_id'

const ExpandCell = ({ rowData, dataKey, expandedRowKeys, onChange, ...props }) => (
    <Cell {...props}>
        <Button
            size="sm"
            onClick={() => {
                onChange(rowData);
            }}
        >
            {expandedRowKeys.some(key => key === rowData[rowKey]) ? '-' : '+'}
        </Button>
    </Cell>
)

const formatedBusDisplay = (driving) => {
    
    const data = driving.reduce((acc,curr,index) => {
        
        return `${acc}${index !== 0 ? ', ':'' }${curr.label}`

    },'')

    return data

}

const DataTable = ({datas,loading,edit,changeStatus,getBookings,addBooking}) => {

    const [expandedRowKeys,setExpandedRowKeys] = useState([])
    

    function handleExpanded(rowData, dataKey) {
    
        let open = false;
        const nextExpandedRowKeys = [];
    
        expandedRowKeys.forEach(key => {
            if (key === rowData[rowKey]) {
                open = true;
            } else {
                nextExpandedRowKeys.push(key);
            }
        });
    
        if (!open) {
            nextExpandedRowKeys.push(rowData[rowKey]);
        }

        setExpandedRowKeys(nextExpandedRowKeys)
        
    }
    
    return (
                        <Table 
                            virtualized
                            data={datas} 
                            autoHeight
                            rowKey={rowKey}
                            expandedRowKeys={expandedRowKeys}
                            loading={loading}
                            locale={{
                                emptyMessage: 'La liste est vide',
                                loading : 'Chargement...'
                            }}
                            renderRowExpanded={rowData => {
                                return (
                                    <div>
                                        <p>
                                            Prix : {new Intl.NumberFormat('fr-FR').format(rowData.price)} XOF &nbsp;/&nbsp; Bus : {formatedBusDisplay(rowData.driving)}<br/>
                                            Nombre de place restant : {rowData.remaining_place} &nbsp;/&nbsp; Nombre de place reservée : {rowData.passengers_already_get}<br/>
                                            Date de création : {moment(rowData.created_at).format('DD/MM/YYYY HH:mm:ss')} &nbsp;/&nbsp; <Link to='' onClick={edit} data-item={JSON.stringify({
                                                id : rowData.id,
                                                name : rowData.name,
                                                from : rowData.from,
                                                to : rowData.to,
                                                price : rowData.price,
                                                date_departing : rowData.date_departing,
                                                date_arriving : rowData.date_arriving,
                                                driving : rowData.driving,
                                            })} >Modifier</Link>  &nbsp;/&nbsp; <Link to='' onClick={changeStatus} data-item={JSON.stringify({
                                                _id : rowData._id,
                                            })} >Changer statut</Link>
                                        </p>
                                    </div>
                                );
                            }}
                            >
                            
                            <Column width={70} align="center">
                                <HeaderCell>#</HeaderCell>
                                <ExpandCell
                                    dataKey="_id"
                                    expandedRowKeys={expandedRowKeys}
                                    onChange={handleExpanded}
                                />
                            </Column>

                            <Column width={250} align="center" resizable>
                                <HeaderCell>Nom</HeaderCell>
                                <Cell dataKey="name" />
                            </Column>

                            <Column width={200} align="center" resizable>
                                <HeaderCell>Lieu de départ</HeaderCell>
                                <Cell>
                                    {(rowData,rowIndex) => 
                                        <p>{rowData.from.label}</p>
                                    }
                                </Cell>
                            </Column>

                            <Column width={200} align="center" resizable>
                                <HeaderCell>{"Lieu d'arrivé"}</HeaderCell>
                                <Cell>
                                    {(rowData,rowIndex) => 
                                        <p>{rowData.to.label}</p>
                                    }
                                </Cell>
                            </Column>

                            <Column width={200} align="center" resizable>
                                <HeaderCell>Date de départ</HeaderCell>
                                <Cell>
                                    {(rowData,rowIndex) => 
                                        <p>{rowData.date_departing}</p>
                                    }
                                </Cell>
                            </Column>

                            <Column width={200} align="center" resizable>
                                <HeaderCell>{"Date d'arrivée"}</HeaderCell>
                                <Cell>
                                    {(rowData,rowIndex) => 
                                        <p>{rowData.date_arriving}</p>
                                    }
                                </Cell>
                            </Column>

                            <Column width={100} resizable>
                                <HeaderCell>Statut</HeaderCell>
                                <Cell>
                                    {(rowData,rowIndex) => 
                                        <Badge color="" className="badge-dot mr-4">
                                            <i className={rowData.status ? "bg-success" : "bg-warning"} />
                                            {rowData.status ? "Activé" : "Désactivé"}
                                        </Badge>
                                    }
                                </Cell>
                            </Column>

                            <Column width={350} align="left">
                                <HeaderCell>Actions</HeaderCell>
                                <Cell>
                                    {(rowData, rowIndex) => 
                                        <>
                                            <Link to='' onClick={getBookings} data-item={JSON.stringify({
                                                id : rowData.id,
                                            })} >Voir réservations</Link> {" | "} <Link to='' onClick={addBooking} data-item={JSON.stringify({
                                                id : rowData.id,
                                            })} >Ajouter réservation</Link>
                                        </>
                                    }
                                </Cell>
                            </Column>
                        </Table>
    )

}

export default DataTable