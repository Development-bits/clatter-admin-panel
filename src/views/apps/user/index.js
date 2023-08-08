// ** User List Component
import Table from './Table'

// ** Reactstrap Imports
import { Row, Col, CardBody, CardHeader, Card } from 'reactstrap'

// ** Custom Components
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'

// ** Icons Imports
import { User, UserPlus, UserCheck, UserX } from 'react-feather'

// ** Styles
import '@styles/react/apps/app-users.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { allUserAction, userAction } from '../../../redux/user/userAction'

const UsersList = () => {
  const dispatch = useDispatch()
  const { allUserData, allUserDataLoading, allUserDataError } = useSelector(state => state.user)

  useEffect(() => {
    dispatch(allUserAction())
  }, [])

  return (
    <div className='app-user-list'>
      <Card style={{ background: "transparent" }}>
        <CardHeader>User Count</CardHeader>
        <CardBody>
          <Row>
            <Col lg='4' sm='6'>
              <StatsHorizontal
                className="shadow-sm"
                color='primary'
                statTitle='Total Users'
                icon={<User size={25} />}
                renderStats={<h3 className='fw-bolder mb-75'>{allUserData?.stats[0]?.totalUsers}</h3>}
              />
            </Col>
            <Col lg='4' sm='6'>
              <StatsHorizontal
                className="shadow-sm"
                color='warning'
                statTitle='Active Users'
                icon={<UserPlus size={25} />}
                renderStats={<h3 className='fw-bolder mb-75'>{allUserData?.stats[0]?.activeUsers}</h3>}
              />
            </Col>
            <Col lg='4' sm='6'>
              <StatsHorizontal
                className="shadow-sm"
                color='success'
                statTitle='Paid Users'
                icon={<UserCheck size={25} />}
                renderStats={<h3 className='fw-bolder mb-75'>{allUserData?.stats[0]?.paidUsers}</h3>}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Table allUserData={allUserData?.data} />

    </div>
  )
}

export default UsersList
