import React from 'react'
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap'
import Transaction from './transaction/Transaction'
import Subscription from './subscription/Subscription'


const Billings = () => {
    return (
        <>
            <Row className='match-height'>
                <Col>
                    <Card>
                        <CardHeader>
                            <h5>Transaction</h5>
                        </CardHeader>
                        <CardBody>
                            <Transaction />
                        </CardBody>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <CardHeader>
                            <h5>
                                Subscription
                            </h5>
                        </CardHeader>
                        <CardBody>
                            <Subscription />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </ >
    )
}

export default Billings