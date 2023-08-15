// ** React Imports
import { Fragment, useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

// ** Third Party Components
import Select from 'react-select'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, MoreVertical, Trash2, Archive, FileText } from 'react-feather'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Reactstrap Imports
import {
    Row,
    Col,
    Card,
    Input,
    Label,
    Button,
    CardBody,
    CardTitle,
    CardHeader,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    UncontrolledDropdown,
    Badge
} from 'reactstrap'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
// import { getAdminAction } from '../../redux/createAdmin/adminAction'
import moment from 'moment/moment'
// import { deactivateAdminAction, deleteAdminAction, updateAdminAction } from '../../redux/createAdmin/adminAction'

const statusObj = {
    active: 'light-success',
    deactivated: 'light-warning',
    inactive: 'light-secondary',
    banned: 'light-danger',
}

export const columns = [
    {
        name: 'Admin Email',
        sortable: true,
        minWidth: '130px',
        sortField: 'email',
        selector: row => row.email,
        cell: row => <span className='text-capitalize'>{row.email}</span>

    },
    {
        name: 'Status',
        minWidth: '135px',
        sortable: true,
        sortField: 'adminStatus',
        selector: row => row.status,
        cell: row => (
            <Badge className='text-capitalize d-flex flex-column' color={statusObj[row.status]} pill>
                <span className='text-capitalize'>{row.status}</span>
            </Badge>
        )

    },
    {
        name: 'Created At',
        minWidth: '140px',
        sortable: true,
        sortField: 'createdAt',
        selector: row => row.createdAt,
        cell: row => (
            <div className='text-capitalize d-flex flex-column'>
                <span>
                    {moment(row.createdAt).format("MM/DD/YY")}
                </span>
                <smal>{moment(row.createdAt).format("hh:mm A")}</smal>
            </div>
        )
    },
    {
        name: 'Actions',
        minWidth: '100px',
        cell: row => (
            <div className='column-action'>
                <UncontrolledDropdown>
                    <DropdownToggle tag='div' className='btn btn-sm'>
                        <MoreVertical size={14} className='cursor-pointer' />
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem
                            tag='button'
                            className='w-100'
                            onClick={(e) => {
                                e.preventDefault()
                                dispatch(updateAdminAction())
                            }}
                        >
                            <Trash2 size={14} className='me-50' />
                            <span className='align-middle'>Update</span>
                        </DropdownItem>
                        <DropdownItem
                            tag='button'
                            className='w-100'
                            onClick={(e) => {
                                e.preventDefault()
                                dispatch(deactivateAdminAction())
                            }}
                        >
                            <FileText size={14} className='me-50' />
                            <span className='align-middle'>Deactivate</span>
                        </DropdownItem>
                        <DropdownItem
                            tag="button"
                            className='w-100'
                            onClick={(e) => {
                                e.preventDefault()
                                dispatch(deleteAdminAction())
                            }} >
                            <Archive size={14} className='me-50' />
                            <span className='align-middle'>Delete</span>
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </div>
        )
    }
]


// ** Table Header
const CustomHeader = ({ store, toggleSidebar, handlePerPage, rowsPerPage, handleFilter, searchTerm }) => {
    return (
        <div className='invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75'>
            <Row>
                <Col xl='6' className='d-flex align-items-center p-0'>
                    <div className='d-flex align-items-center w-100'>
                        <label htmlFor='rows-per-page'>Show</label>
                        <Input
                            className='mx-50'
                            type='select'
                            id='rows-per-page'
                            value={rowsPerPage}
                            onChange={handlePerPage}
                            style={{ width: '5rem' }}
                        >
                            <option value='10'>10</option>
                            <option value='25'>25</option>
                            <option value='50'>50</option>
                        </Input>
                        <label htmlFor='rows-per-page'>Entries</label>
                    </div>
                </Col>
                <Col
                    xl='6'
                    className='d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1'
                >
                    <div className='d-flex align-items-center mb-sm-0 mb-1 me-1'>
                        <label className='mb-0' htmlFor='search-invoice'>
                            Search:
                        </label>
                        <Input
                            id='search-invoice'
                            className='ms-50 w-100'
                            type='text'
                            value={searchTerm}
                            onChange={e => handleFilter(e.target.value)}
                        />
                    </div>
                    <Button className='add-new-user' color='primary' onClick={toggleSidebar}>
                        Add New Admin
                    </Button>
                </Col>
            </Row>
        </div>
    )
}

const Table = ({ getAdminData, total, toggleSidebar }) => {
    const dispatch = useDispatch()
    // ** States
    const [sort, setSort] = useState('desc')
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [sortColumn, setSortColumn] = useState('id')
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [currentStatus, setCurrentStatus] = useState({ value: '', label: 'All', number: 0 })




    // ** Get data on mount
    useEffect(() => {
        let timerId; // To debounce the API call
        let obj = {
            page: currentPage,
            status: currentStatus.value,
            limit: rowsPerPage,
            keyword: searchTerm
        }

        if (searchTerm) {
            timerId = setTimeout(() => {
                // dispatch(getAdminAction(obj))
            }, 3000)
        } else {
            timerId = setTimeout(() => {
                // dispatch(getAdminAction(obj))
            }, 100)
        }
        if (getAdminData) {
            toggleSidebar()
            timerId = setTimeout(() => {
                // dispatch(getAdminAction(obj))
            }, 1000)
        }
        // Cleanup function to clear the debounce timer and prevent memory leaks
        return () => {
            clearTimeout(timerId);
        };
    }, [dispatch, currentPage, rowsPerPage, searchTerm, currentStatus, getAdminData])

    useEffect(() => {
        setCurrentPage(1)
    }, [currentStatus])

    const statusOptions = [
        { value: '', label: 'All', number: 0 },
        { value: 'active', label: 'Active', number: 1 },
        { value: 'deactivated', label: 'Deactivated', number: 2 }
    ]

    // ** Function in get data on page change
    const handlePagination = page => {
        setCurrentPage(page.selected + 1)
    }

    // ** Function in get data on rows per page
    const handlePerPage = e => {
        const value = parseInt(e.currentTarget.value)
        setRowsPerPage(value)
    }

    // ** Function in get data on search query change
    const handleFilter = val => {
        setSearchTerm(val)
    }

    // ** Custom Pagination
    const CustomPagination = () => {
        const count = Number(Math.ceil(total / rowsPerPage))

        return (
            <ReactPaginate
                previousLabel={''}
                nextLabel={''}
                pageCount={count || 1}
                activeClassName='active'
                forcePage={currentPage !== 0 ? currentPage - 1 : 0}
                onPageChange={page => handlePagination(page)}
                pageClassName={'page-item'}
                nextLinkClassName={'page-link'}
                nextClassName={'page-item next'}
                previousClassName={'page-item prev'}
                previousLinkClassName={'page-link'}
                pageLinkClassName={'page-link'}
                containerClassName={'pagination react-paginate justify-content-end my-2 pe-1'}
            />
        )
    }

    // ** Table data to render
    const dataToRender = () => {
        const filters = {
            status: currentStatus.value,
            q: searchTerm
        }

        const isFiltered = Object.keys(filters).some(function (k) {
            return filters[k]?.length > 0
        })

        if (getAdminData?.length > 0 && !isFiltered) {
            return getAdminData
        } else if (getAdminData?.length === 0 && isFiltered) {
            return []
        } else {
            return getAdminData?.slice(0, rowsPerPage)
        }
    }

    const handleSort = (column, sortDirection) => {
        setSort(sortDirection)
        setSortColumn(column.sortField)
    }

    const handleCurrentStatus = (value) => {
        if (!value) {
            return
        }
        if (value.value !== '' && value.label) {
            setCurrentStatus({ label: value.label, value: value.value })
        } else {
            setCurrentStatus({ label: value.label, value: value.value })
        }

    }

    return (
        <Fragment>
            <Card>
                <CardHeader>
                    <CardTitle tag='h4'>Filters</CardTitle>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col md='4'>
                            <Label for='status-select'>Admin Status</Label>
                            <Select
                                theme={selectThemeColors}
                                isClearable={false}
                                className='react-select'
                                classNamePrefix='select'
                                options={statusOptions}
                                value={currentStatus || ''}
                                onChange={handleCurrentStatus}
                            />
                        </Col>
                    </Row>
                </CardBody>
            </Card>

            <Card className='overflow-hidden'>
                <div className='react-dataTable'>
                    <DataTable
                        noHeader
                        subHeader
                        sortServer
                        pagination
                        responsive
                        paginationServer
                        columns={columns}
                        onSort={handleSort}
                        sortIcon={<ChevronDown />}
                        className='react-dataTable'
                        paginationComponent={CustomPagination}
                        data={dataToRender()}
                        subHeaderComponent={
                            <CustomHeader
                                store={getAdminData}
                                searchTerm={searchTerm}
                                rowsPerPage={rowsPerPage}
                                handleFilter={handleFilter}
                                handlePerPage={handlePerPage}
                                toggleSidebar={toggleSidebar}
                            />
                        }
                    />
                </div>
            </Card>
        </Fragment>
    )
}

export default Table
