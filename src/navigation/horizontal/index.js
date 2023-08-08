import { Box, DollarSign, Home } from "react-feather";

// ** Merge & Export
export default [
    {
        id: 'dashboards',
        title: 'Dashboard',
        icon: <Home />,
        navLink: '/dashboard'
    },
    {
        id: 'apps',
        title: 'Apps',
        icon: <Box />,
        navLink: '/user'
    },
    {
        id: 'billings',
        title: 'Billing',
        icon: <DollarSign size={20} />,
        navLink: '/billings'
    }
]
