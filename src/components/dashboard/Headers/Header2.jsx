import React,{useEffect,useState} from "react";

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

import {getInformation} from '../../../containers/dashboard/index/service/index'

const Header = (props) => {

  const [daily,setDaily] = useState(0)
  const [weekly,setWeekly] = useState(0)
  const [monthly,setMonthly] = useState(0)
  const [monthlyTrvl,setMonthlyTrvl] = useState(0)

  useEffect(() => {
        

    (async function () {

        try {

            const [d,w,m,mT] = await getInformation()
            
            setDaily(d)
            setWeekly(w)
            setMonthly(m)
            setMonthlyTrvl(mT)

        } catch (error) {
        
            console.error(error)

        }
        
    })()
    
},[])

  return (
      <>
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
          <Container fluid>
            <div className="header-body">
              {/* Card stats */}
              <Row>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Place reservée
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {new Intl.NumberFormat('fr-FR').format(daily)}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            <i className="fas fa-list" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        
                        <span className="text-nowrap">{"Aujourd'hui"}</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Place reservée
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {new Intl.NumberFormat('fr-FR').format(weekly)}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                            <i className="fas fa-list" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        
                        <span className="text-nowrap">Cette semaine</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Place reservée
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {new Intl.NumberFormat('fr-FR').format(monthly)}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                            <i className="fas fa-list" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        
                        <span className="text-nowrap">Ce mois</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Voyage
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {new Intl.NumberFormat('fr-FR').format(monthlyTrvl)}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                            <i className="ni ni-delivery-fast" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        
                        <span className="text-nowrap">Ce mois</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </>
    )
}

export default Header;
