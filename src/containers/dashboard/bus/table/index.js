import React from "react"
import { Table, Column, HeaderCell, Cell } from 'rsuite-table'
import {
    Badge,
} from "reactstrap"
import {Link} from "react-router-dom"

import 'rsuite-table/dist/css/rsuite-table.css'

const DataTable = ({datas,loading,edit,changeStatus}) => {


    return (
                        <Table 
                            virtualized
                            data={datas} 
                            autoHeight
                            loading={loading}
                            locale={{
                                emptyMessage: 'La liste est vide',
                                loading : 'Chargement...'
                            }}
                            >
                            
                            <Column width={450} align="center" resizable>
                                <HeaderCell>Nom</HeaderCell>
                                <Cell dataKey="name" />
                            </Column>

                            <Column width={250} align="center" resizable>
                                <HeaderCell>{`Numéro d'immatriculation`}</HeaderCell>
                                <Cell dataKey="immatriculation_number" />
                            </Column>

                            <Column width={100} align="center" resizable>
                                <HeaderCell>Capacité</HeaderCell>
                                <Cell dataKey="capacity" />
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

                            <Column width={250} align="left">
                                <HeaderCell>Actions</HeaderCell>
                                <Cell>
                                    {(rowData, rowIndex) => 
                                        <>
                                            <Link to='' onClick={edit} data-item={JSON.stringify(rowData)} >Modifier</Link> {" | "} <Link to='' onClick={changeStatus} data-item={JSON.stringify(rowData)} >Changer statut</Link>
                                        </>
                                    }
                                </Cell>
                            </Column>
                        </Table>
    )

}

export default DataTable