// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import { TabContent, TabPane } from 'reactstrap'


// ** User Components
import UserTimeline from './UserTimeline'
import UserProjectsList from './UserProjectsList'

const UserTabs = ({ active, toggleTab }) => {
  return (
    <Fragment>
      <TabContent activeTab={active}>
        <TabPane tabId='1'>
          <UserProjectsList />
          <UserTimeline />
        </TabPane>
      </TabContent>
    </Fragment>
  )
}
export default UserTabs
