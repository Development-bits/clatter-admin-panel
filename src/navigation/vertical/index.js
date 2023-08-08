
import { DollarSign, Home, User } from 'react-feather'

// ** Merge & Export
export default [
    {
        id: 'dashboards',
        title: 'Dashboard',
        icon: <Home size={20} />,
        badge: 'light-warning',
        navLink: '/dashboard'
    },
    {
        id: 'users',
        title: 'User',
        icon: <User size={20} />,
        navLink: '/user'
    },
    {
        id: 'billings',
        title: 'Billing',
        icon: <DollarSign size={20} />,
        navLink: '/billings'
    },
]
