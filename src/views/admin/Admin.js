import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardHeader, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import SidebarNewAdmin from './Sidebar'
import Table from './Table'
import { getAdminAction } from '../../redux/createAdmin/adminAction'
import { useDispatch, useSelector } from 'react-redux'

const Admin = () => {
    const dispatch = useDispatch()
    const [show, setShow] = useState(false)
    const { getAdminData } = useSelector(state => state.admin)

    const toggleSidebar = () => setShow(!show)

    // useEffect(() => {
    //     dispatch(getAdminAction())
    // }, [])

    return (
        <>
            <Table getAdminData={null} total={null} toggleSidebar={toggleSidebar} />
            <SidebarNewAdmin open={show} toggleSidebar={toggleSidebar} />
        </>
    )
}

export default Admin