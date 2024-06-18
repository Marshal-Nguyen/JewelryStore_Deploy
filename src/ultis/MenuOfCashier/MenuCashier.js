import icons from "../icon"

const {GiReceiveMoney,BsCartPlus,BsCartCheck,BsCart3} = icons

export const sidebarMenuCashier = [
    {
        path: 'cs_order/cs_onprocess',
        text: 'Order',
        icons: <BsCart3  size={24} color="white" />,
        subMenu: [
            {
                path: 'cs_order/cs_onprocess',
                text: 'On Process',
                icons: <BsCartPlus size={24} color="white"/>,
            },
            {
                path: 'cs_order/cs_complete',
                text: 'Completed',
                icons: <BsCartCheck  size={24} color="white"/>,
            },
        ]
    },
    {
        path: 'cs_revenue',
        text: 'Revenue',
        icons: <GiReceiveMoney size={24} color="white" />
    },
]