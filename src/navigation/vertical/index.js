
import { Circle, DollarSign, Home, Power, User, UserPlus } from 'react-feather'

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
        children: [
            {
                id: 'transaction',
                title: 'Transaction',
                icon: <Circle size={12} />,
                navLink: '/billing/transaction'
            },
            {
                id: 'subscription',
                title: 'Subscription',
                icon: <Circle size={12} />,
                navLink: '/billing/subscription'
            }
        ]

    },
    {
        id: 'admin',
        title: 'Admin',
        icon: <UserPlus size={20} />,
        navLink: '/admin',
        access: 'superAdmin'
    },
]
