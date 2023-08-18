import React, { useState } from 'react'
import SidebarNewAdmin from './Sidebar'
import Table from './Table'

const Admin = () => {
    const [show, setShow] = useState(false)
    const [editAdminProfile, setEditAdminProfile] = useState(null)
    const toggleSidebar = (row) => {
        if (row) {
            setEditAdminProfile(row)
        }
        setShow(!show)
    }

    return (
        <div className='app-user-list'>
            <Table toggleSidebar={toggleSidebar} />
            <SidebarNewAdmin open={show} toggleSidebar={toggleSidebar} editProfile={editAdminProfile} />
        </div>
    )
}

export default Admin