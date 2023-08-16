import React, { useEffect } from 'react'
import Table from "./Table"
import { useDispatch, useSelector } from 'react-redux'
import { adminBillingAction } from '../../../redux/subscription/subscriptionAction'

const Subscription = () => {
    return (
        <Table />
    )
}

export default Subscription