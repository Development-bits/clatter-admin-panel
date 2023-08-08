// ** Reducers Imports
import navbar from './navbar'
import layout from './layout'
import auth from './auth/authSlice'
import dashboard from "./dashboard/dashboardSlice"
import user from "./user/userSlice"

const rootReducer = {
  auth,
  navbar,
  layout,
  dashboard,
  user
}

export default rootReducer
