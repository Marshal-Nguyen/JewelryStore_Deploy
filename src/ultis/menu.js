import icons from "./icon"

const { GiNecklaceDisplay, GiDiamondRing, LiaCircleNotchSolid, LiaMoneyBillWaveSolid, SlPeople, GiEmeraldNecklace, GiStonePile, AiOutlineGold, SlDiamond, LiaFileInvoiceDollarSolid, CiGift, TbArrowsExchange2, TbLogout2, MdDiamond, GiCrystalEarrings } = icons

export const sidebarMenu = [
    // {
    //     path: 'revenue',
    //     text:'Revenue',
    //     icons: <LiaMoneyBillWaveSolid size={24} color="white"/>
    // },
    {
        path: 'customer',
        text: 'Customer',
        icons: <SlPeople size={24} color="white" />
    },
    {
        path: 'jewelry/ring',
        text: 'Jewelry',
        icons: <GiNecklaceDisplay size={24} color="white" />,
        subMenu: [
            {
                path: 'jewelry/ring',
                text: 'Ring',
                icons: <GiDiamondRing size={24} color="white" />,
            },
            {
                path: 'jewelry/necklace',
                text: 'Necklace',
                icons: <GiEmeraldNecklace size={24} color="white" />,
            },
            {
                path: 'jewelry/earring',
                text: 'Earring',
                icons: <GiCrystalEarrings size={24} color="white" />,
            },
            {
                path: 'jewelry/bangles',
                text: 'Bangles',
                icons: <LiaCircleNotchSolid size={24} color="white" />,
            },
        ]
    },
    {
        path: 'wholesaleGold',
        text: 'Wholesale Gold',
        icons: <GiStonePile size={24} color="white" />
    },
    {
        path: 'retailGold',
        text: 'Retail Gold',
        icons: <AiOutlineGold size={24} color="white" />
    },
    {
        path: '',
        text: 'Diamond',
        end: true,
        icons: <MdDiamond size={24} color="white" />
    },
    {
        path: 'searchInvoice/onprocessSeller',
        text: 'Invoice',
        icons: <LiaFileInvoiceDollarSolid size={24} color="white" />
    },
    // {
    //     path: 'promotion',
    //     text: 'Promotion',
    //     icons: <CiGift size={24} color="white" />
    // },
    {

        path: 'purchase/buyIn',
        text:'Purchase',
        icons: <TbArrowsExchange2 size={24} color="white"/>,
      

    },
   
    {
        path: '/login',
        text: 'Log out',
        icons: <TbLogout2 size={24} color="white" />
    },

]