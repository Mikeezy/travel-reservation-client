import React from 'react';
import {
    Container,
    Col,
    Row,
} from "reactstrap"
import {connect} from 'react-redux'
import Header from "../../../components/dashboard/Headers/Header.jsx"
import FormProfile from './FormProfile'
import FormUpdatePassword from './FormUpdatePassword'

const Profile = (props) => {

    const {currentUser} = props

    return (
        <>
            <Header />

            <Container className="mt--7" fluid>

                <Row>

                    {currentUser && currentUser.role !== "super admin" && (

                        <Col xs="6">
    
                            <FormProfile initialValues={{
                                firstname : currentUser.firstname,
                                lastname : currentUser.lastname,
                                phone_number : currentUser.phone_number
                            }} />
    
                        </Col>
                    )}

                    <Col xs="6">

                        <FormUpdatePassword />

                    </Col>

                </Row>

            </Container>
        </>
    )
}

const mapStateToProps = ({currentUser}) => {
    return {
        currentUser
    }
}

export default connect(mapStateToProps, null)(Profile)