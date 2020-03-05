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

const formatedPlaceDisplay = (seat_number) => {
    
    const data = seat_number.reduce((acc,curr,index) => {
        
        return `${acc}${index !== 0 ? ', ':'' }${curr.number} (${curr.bus.immatriculation_number})`

    },'')

    return data

}

const DataTable = ({datas,loading,changeStatus}) => {

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
                                            Siège(s) : {formatedPlaceDisplay(rowData.seat_number)}<br/>
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
                                <HeaderCell>Nom complet</HeaderCell>
                                <Cell>
                                    {(rowData,rowIndex) =>
                                        <>
                                            {rowData.isGuest ? (

                                                <p>{rowData.guest.fullname}</p>

                                            ) : (

                                                <p>{rowData.user.lastname} {rowData.user.firstname}</p>
                                            )}
                                        </>
                                    }
                                </Cell>
                            </Column>

                            <Column width={150} align="center" resizable>
                                <HeaderCell>Téléphone</HeaderCell>
                                <Cell>
                                {(rowData,rowIndex) =>
                                    <>
                                        {rowData.isGuest ? (

                                            <p>{rowData.guest.phone_number}</p>

                                        ) : (

                                            <p>{rowData.user.phone_number}</p>
                                        )}
                                    </>
                                }
                                </Cell>
                            </Column>


                            <Column width={150} align="center" resizable>
                                <HeaderCell>Date réservation</HeaderCell>
                                <Cell>
                                    {(rowData,rowIndex) => 
                                        <p>{moment(rowData.date_booking).format('DD/MM/YYYY HH:mm')}</p>
                                    }
                                </Cell>
                            </Column>

                            <Column width={150} align="center" resizable>
                                <HeaderCell>Nbre de place</HeaderCell>
                                <Cell>
                                    {(rowData,rowIndex) => 
                                        <p>{rowData.passenger_number}</p>
                                    }
                                </Cell>
                            </Column>

                            <Column width={150} align="center" resizable>
                                <HeaderCell>Référence</HeaderCell>
                                <Cell>
                                    {(rowData,rowIndex) => 
                                        <p>{rowData.reference}</p>
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

                            <Column width={150} align="left">
                                <HeaderCell>Actions</HeaderCell>
                                <Cell>
                                    {(rowData, rowIndex) => 
                                        <Link to='' onClick={changeStatus} data-item={JSON.stringify(rowData)}> Changer statut </Link>
                                    }
                                </Cell>
                            </Column>
                        </Table>
    )

}

export default DataTable