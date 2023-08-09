// ** Reactstrap Imports
import { Row, Col, CardHeader, CardBody, Card } from 'reactstrap'

// ** Custom Components
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'

// ** Styles
import '@styles/react/libs/charts/apex-charts.scss'
import { User, UserCheck, UserPlus, UserX } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { dashAction } from '../../../redux/dashboard/dashboardAction'
import InvoiceList from './InvoiceList'

const AnalyticsDashboard = () => {
  const dispatch = useDispatch()
  const { dashboardData, dashboardLoading, dashBoardError } = useSelector(state => state.dashboard)

  useEffect(() => {
    dispatch(dashAction())
  }, [])

  return (
    <div id='dashboard-analytics'>
      <Card style={{ background: "#f8f8f8db" }}>
        <CardHeader>
          <h5>Daily Stats</h5>
        </CardHeader>

        <CardBody>
          <Row className='match-height'>
            {dashboardData ?
              dashboardData?.dailyStats?.map((item) => {
                let icon = null;
                let iconColor = ''
                if (item.title === "Subscribers") {
                  icon = <User size={15} />
                  iconColor = 'primary'
                } else if (item.title === "Signup") {
                  icon = <UserPlus size={15} />
                  iconColor = 'success'
                } else if (item.title === "Sales") {
                  icon = <UserCheck size={15} />
                  iconColor = 'danger'
                } else {
                  icon = <User size={15} />
                  iconColor = 'info'
                }
                return (
                  <Col lg='3' sm='6' key={item.title}>
                    <StatsHorizontal
                      className="shadow-sm"
                      color={iconColor}
                      statTitle={item?.title}
                      icon={icon}
                      renderStats={<h3 className='fw-bolder mb-75'>{item?.count}</h3>}
                    />
                  </Col>
                )
              }) : null}

          </Row>
        </CardBody>
      </Card>
      <Card style={{ background: "#f8f8f8db" }}>
        <CardHeader>
          <h5>Monthly Stats</h5>
        </CardHeader>

        <CardBody>
          <Row className='match-height'>
            {dashboardData ?
              dashboardData?.monthlyStats?.map((item) => {
                let icon = null;
                let iconColor = ''
                if (item.title === "Subscribers") {
                  icon = <User size={15} />
                  iconColor = 'primary'
                } else if (item.title === "Signup") {
                  icon = <UserPlus size={15} />
                  iconColor = 'success'
                } else if (item.title === "Sales") {
                  icon = <UserCheck size={15} />
                  iconColor = 'danger'
                } else {
                  icon = <User size={15} />
                  iconColor = 'info'
                }
                return (
                  <Col lg='3' sm='6' key={item.title}>
                    <StatsHorizontal
                      className="shadow-sm"
                      color={iconColor}
                      statTitle={item?.title}
                      icon={icon}
                      renderStats={<h3 className='fw-bolder mb-75'>{item?.count}</h3>}
                    />
                  </Col>
                )
              }) : null}

          </Row>
        </CardBody>
      </Card>
      <Card style={{ background: "#f8f8f8db" }}>
        <CardHeader>
          <h5>Plans</h5>
        </CardHeader>
        <CardBody>
          <Row className='match-height'>
            {dashboardData?.data.packagesSold?.map((item) => {
              return (
                <>
                  {item.name !== "Free Trial" && (
                    <Col lg='4' sm='6' key={item.id}>
                      <StatsHorizontal
                        className="shadow-sm"
                        color='success'
                        statTitle={item.name}
                        icon={<UserCheck size={15} />}
                        renderStats={
                          <h3 className='fw-bolder mb-75 d-flex flex-column'>
                            <span>{item.totalPlanSold}</span>
                            <span>${item.totalAmount}</span>
                          </h3>
                        }
                      />
                    </Col>
                  )}
                </>
              )
            })}

          </Row>
        </CardBody>
      </Card>

      <Row className='match-height'>
        <Col xxl='10' xl='12' lg='12' sm='12'>
          <InvoiceList tableData={dashboardData?.data.latestSubs} />
        </Col>
      </Row>
    </div >
  )
}

export default AnalyticsDashboard
