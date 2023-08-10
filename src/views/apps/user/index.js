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
import { allUserAction } from '../../../redux/user/userAction'

const UsersList = () => {
  const dispatch = useDispatch()
  const { allUserData, allUserDataLoading, allUserDataError } = useSelector(state => state.user)
  useEffect(() => {
    dispatch(allUserAction())
  }, [])

  return (
    <div className='app-user-list'>
      <Card style={{ background: "#f8f8f8db" }}>
        <CardHeader>
          <h5>User Count</h5>
        </CardHeader>
        <CardBody>
          <Row>
            {allUserData?.stats?.map((item) => {
              return (
                <Col lg='4' sm='6'>
                  <StatsHorizontal
                    className="shadow-sm"
                    color='primary'
                    statTitle={item?.title}
                    icon={<User size={25} />}
                    renderStats={<h3 className='fw-bolder mb-75'>{item?.count}</h3>}
                  />
                </Col>
              )
            })}
          </Row>
        </CardBody>
      </Card>

      <Table allUserData={allUserData?.data} total={allUserData?.total} />

    </div>
  )
}

export default UsersList
