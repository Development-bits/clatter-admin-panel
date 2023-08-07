import { Box, DollarSign, Home } from "react-feather";

// ** Merge & Export
export default [
    {
        id: 'dashboards',
        title: 'Dashboard',
        icon: <Home />,
        navLink: '/admin/dashboard'
    },
    {
        id: 'apps',
        title: 'Apps',
        icon: <Box />,
        navLink: '/admin/apps/user/list'
    },
    {
        id: 'billings',
        title: 'Billing',
        icon: <DollarSign size={20} />,
        navLink: '/admin/billings'
    }
]
