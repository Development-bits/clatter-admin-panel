import React, { useState } from 'react'
import SidebarNewAdmin from './Sidebar'
import Table from './Table'

const Admin = () => {
    const [show, setShow] = useState(false)
    const toggleSidebar = () => setShow(!show)

    return (
        <>
            <Table toggleSidebar={toggleSidebar} />
            <SidebarNewAdmin open={show} toggleSidebar={toggleSidebar} />
        </>
    )
}

export default Admin