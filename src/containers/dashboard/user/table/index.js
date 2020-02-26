import React from "react"
import { Table, Column, HeaderCell, Cell } from 'rsuite-table'
import {
    Badge,
} from "reactstrap"
import {Link} from "react-router-dom"
import {getRoleFormated} from '../../../../utils/helper'
import moment from "moment"

import 'rsuite-table/dist/css/rsuite-table.css'

const DataTable = ({datas,loading,changeStatus}) => {


    return (
                        <Table 
                            virtualized
                            data={datas} 
                            loading={loading}
                            locale={{
                                emptyMessage: 'La liste est vide',
                                loading : 'Chargement...'
                            }}
                            >
                            
                            <Column width={300} align="center" resizable>
                                <HeaderCell>Nom complet</HeaderCell>
                                <Cell dataKey="fullname" />
                            </Column>

                            <Column width={200} align="center" resizable>
                                <HeaderCell>Email</HeaderCell>
                                <Cell dataKey="email" />
                            </Column>

                            <Column width={150} align="center" resizable>
                                <HeaderCell>Téléphone</HeaderCell>
                                <Cell dataKey="phone_number" />
                            </Column>

                            <Column width={150} align="center" resizable>
                                <HeaderCell>Role</HeaderCell>
                                <Cell>
                                    {(rowData,rowIndex) => 
                                        getRoleFormated(rowData.role)
                                    }
                                </Cell>
                            </Column>

                            <Column width={100} align="center" resizable>
                                <HeaderCell>Etat</HeaderCell>
                                <Cell>
                                    {(rowData,rowIndex) => 
                                        <Badge color="" className="badge-dot mr-4">
                                            <i className={rowData.blocked ? "bg-danger" : "bg-success"} />
                                            {rowData.blocked ? "Bloqué" : "Débloqué"}
                                        </Badge>
                                    }
                                </Cell>
                            </Column>

                            <Column width={200} align="center"  resizable>
                                <HeaderCell>Date création</HeaderCell>
                                <Cell>
                                    {(rowData,rowIndex) => 
                                        moment(rowData.created_at).format('DD/MM/YYYY HH:mm:ss')
                                    }
                                </Cell>
                            </Column>

                            <Column width={120} align="left">
                                <HeaderCell>Actions</HeaderCell>
                                <Cell>
                                    {(rowData, rowIndex) => 
                                        
                                        <Link to='' onClick={changeStatus} data-item={JSON.stringify(rowData)} >Changer état</Link>

                                    }
                                </Cell>
                            </Column>
                        </Table>
    )

}

export default DataTable