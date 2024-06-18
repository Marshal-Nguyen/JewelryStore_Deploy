import IconManager from "./IconManager"

const { FaChartSimple,
    TbReportSearch,
    MdManageAccounts,
    CiGift,
    MdOutlineAssignmentReturned,
    TbDeviceIpadCancel,
    RiAccountPinCircleFill,
    BiLogOut, FaChevronDown, IoMdArrowDropdown, IoMdArrowDropup, TbFileInvoice, CgUserList, LiaFileInvoiceDollarSolid, GrUserManager,
    MdOutlineManageAccounts, GiStonePile, LiaGiftsSolid, VscGitPullRequestGoToChanges, GiGoldNuggets, GiReceiveMoney, GiEmeraldNecklace, GiCrystalEarrings, GiDiamondRing, GiNecklaceDisplay, AiOutlineGold,
    LiaMoneyBillWaveSolid, LiaCircleNotchSolid } = IconManager

export const sidebarMenuManager = [

    {
        path: 'productManager',
        text: 'Product',
        iconAdmin: <GiStonePile size={24} color="white" />,
        iconAdmin2: <IoMdArrowDropdown size={24} color="white" />,
        iconAdmin3: <IoMdArrowDropup size={24} color="white" />,
        subMenu: [
            {
                path: 'productManager/diamond',
                text: 'Diamond',
                icons: <GiDiamondRing size={24} color="white" />,
            },
            {
                path: 'productManager/jewelry',
                text: 'Jewelry',
                icons: <GiEmeraldNecklace size={24} color="white" />,
            },
            {
                path: 'productManager/rgold',
                text: 'Retail Gold',
                icons: <GiCrystalEarrings size={24} color="white" />,
            },
            {
                path: 'productManager/wholesalegold',
                text: 'Wholesale Gold',
                icons: <LiaCircleNotchSolid size={24} color="white" />,
            },
        ]
    },
    {
        path: 'Dashboard',
        text: 'Dashboard',
        iconAdmin: <FaChartSimple size={24} color="white" />
    },
    {
        path: 'Report',
        text: 'Report',
        iconAdmin: <TbReportSearch size={24} color="white" />,
        iconAdmin2: <IoMdArrowDropdown size={24} color="white" />,
        iconAdmin3: <IoMdArrowDropup size={24} color="white" />,
        subMenu: [
            {
                path: 'Report/Invoice',
                text: 'Invoice',
                iconAdmin: <TbFileInvoice size={24} color="white" />
            },
            {
                path: 'Report/ProductSold',
                text: 'Product sold',
                iconAdmin: <LiaFileInvoiceDollarSolid size={24} color="white" />
            },
            {
                path: 'Report/Employee',
                text: 'Employee',
                iconAdmin: <CgUserList size={24} color="white" />
            }

        ],

    },
    {
        path: 'Manage',
        text: 'Manage',
        iconAdmin: <MdManageAccounts size={24} color="white" />,
        iconAdmin2: <IoMdArrowDropdown size={24} color="white" />,
        iconAdmin3: <IoMdArrowDropup size={24} color="white" />,
        subMenu: [
            {
                path: 'Manage/productMana',
                text: 'Product',
                iconAdmin: <GiStonePile size={24} color="white" />
            },
            {
                path: 'Manage/customerMana',
                text: 'Customer',
                iconAdmin: <GrUserManager size={24} color="white" />
            },
            {
                path: 'Manage/point',
                text: 'Point of customer',
                iconAdmin: <GiGoldNuggets size={24} color="white" />
            },
            {
                path: 'Manage/staff',
                text: 'Staff',
                iconAdmin: <MdOutlineManageAccounts size={24} color="white" />
            }

        ],
    },
    {
        path: 'Promotionmanager',
        text: 'Promotion',
        iconAdmin: <CiGift size={24} color="white" />,
        iconAdmin2: <IoMdArrowDropdown size={24} color="white" />,
        iconAdmin3: <IoMdArrowDropup size={24} color="white" />,
        subMenu: [
            {
                path: 'Promotionmanager/promotionlist',
                text: 'Promotion list',
                iconAdmin: <LiaGiftsSolid size={24} color="white" />
            },
            {
                path: 'Promotionmanager/promotionrequest',
                text: 'History Request',
                iconAdmin: <VscGitPullRequestGoToChanges size={24} color="white" />
            }
        ],
    },
    {
        path: 'ReturnPolicy',
        text: 'Return policy',
        iconAdmin: <MdOutlineAssignmentReturned size={24} color="white" />
    },

]