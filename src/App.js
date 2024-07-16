import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';


import { Public, Ring, Diamond, Customer, Jewelry, Necklace, Earring, Bangles, WholesaleGold, RetailGold, SearchInvoice, Promotion, Return_Ex, Buy, Warranty, BuyOut, OnprocessSeller, CompleteSeller, Bill } from './page/Seller';

import { Cs_Public, Cs_Complete, Cs_Revenue, Cs_OnProcess, Cs_WaitingPayment, Cs_BuyProduct, Cs_OnProcessBuy, Cs_CompleteBuy, PaymentResult, Cs_Bill } from './page/Cashier';


import path from './ultis/path'
import Cs_Order from './page/Cashier/Cs_Order';
import Dashboard from './page/Admin/Dashboard'
import Report from './page/Admin/Report/Report';
import Manage from './page/Admin/Manage/Manage';
import Invoice from '../src/page/Admin/Report/Invoice'
import Employee from '../src/page/Admin/Report/Employee'
import ProductSold from '../src/page/Admin/Report/ProductSold'
import CustomerAdmin from './page/Admin/Manage/CustomerAdmin';
import ProductAdmin from './page/Admin/Manage/ProductAdmin';
import Staff from '../src/page/Admin/Manage/Staff';
import PromotionAdmin from './page/Admin/Promotion/PromotionAdmin';
import PromotionList from './page/Admin/Promotion/PromotionList';
import PromotionRequest from './page/Admin/Promotion/PromotionRequest';
import ReturnPolicy from './page/Admin/ReturnPolicy';
import Point from './page/Admin/Manage/Point';
import Manager from './page/Manager/Manager';

import DiamondManager from './page/Manager/Product/DiamondManager';
import JewelryManager from './page/Manager/Product/JewelryManager';
import RetailGoldManager from './page/Manager/Product/RetailGoldManager';
import WholesaleGoldManager from './page/Manager/Product/WholesaleGoldManager';
import ReportMana from './page/Manager/Report/ReportMana';
import EmployeeMana from './page/Manager/Report/EmployeeMana';
import InvoiceMana from './page/Manager/Report/InvoiceMana';
import ProductSoldMana from './page/Manager/Report/ProductSoldMana';
import CustomerMana from './page/Manager/Manage/CustomerMana';
import ManageMana from './page/Manager/Manage/ManageMana';
import PointMana from './page/Manager/Manage/PointMana';
import ProductMana from './page/Manager/Manage/ProductMana';
import StaffMana from './page/Manager/Manage/StaffMana';
import PromotionListMana from './page/Manager/Promotion/PromotionListMana';
import PromotionRequestMana from './page/Manager/Promotion/PromotionRequestMana';
import PromotionManager from './page/Manager/Promotion/PromotionManager'
import ReturnPolicyView from './page/Manager/ReturnPolicy/ReturnPolicyView';
import Stall from './page/Manager/Report/Stall';
import DiamondWarehouseManager from './page/Manager/Warehouse/DiamondWarehouseManager'
import JewelryWarehouseManager from './page/Manager/Warehouse/JewelryWarehouseManager'
import WholesaleGoldWarehouseManager from './page/Manager/Warehouse/WholesaleGoldWarehouseManager'
import RetailGoldWarehouseManager from './page/Manager/Warehouse/RetailGoldWarehouseManager'
import Price from './page/Manager/Material/Price';
import Material from './page/Manager/Material/Material';
import SpecialDiscountRequest from './page/Manager/SpecialDiscount/SpecialDiscountRequest';
import DetailPage from './page/Manager/SpecialDiscount/DetailPage';
import Payment from './page/Manager/Report/Payment';
import CustomerDetail from './page/Manager/Manage/CustomerDetail';
import PaymentReturn from './page/Cashier/PaymentReturn';
import CreateProduct from './page/Manager/Product/CreateProduct';
import ScreenGold from './page/Seller/ScreenGold';
function App() {
  // test redux có hoạt động không
  // const {test,homeData} = useSelector(state => state.app)
  // console.log(test)

  return (
    <>

      <div className=''>

        <Routes>
   
       
        
          {/* Seller */}
          <Route path={path.PUBLIC} element={<Public />}>
            <Route path={path.DIAMOND} element={<Diamond />} />
            <Route path={path.CUSTOMER} element={<Customer />} />
            <Route path={path.JEWELRY} element={<Jewelry />}>
              <Route path={path.RING} element={<Ring />} />
              <Route path={path.NECKLACE} element={<Necklace />} />
              <Route path={path.EARRING} element={<Earring />} />
              <Route path={path.BANGLES} element={<Bangles />} />
            </Route>
            <Route path={path.WHOLESALEGOLD} element={<WholesaleGold />} />
            <Route path={path.RETAILGOLD} element={<RetailGold />} />
            <Route path={path.SEARCHINVOICE} element={<SearchInvoice />} >
              <Route path={path.ONPROCESS} element={<OnprocessSeller />} />
              <Route path={path.COMPLETED} element={<CompleteSeller />} />
            </Route>
            <Route path={path.SCREENGOLD} element={<ScreenGold/>} />
            <Route path={path.RETURN_EX} element={<Return_Ex />} >
              <Route path={path.BUY} element={<Buy />} />
              <Route path={path.BUYOUT} element={<BuyOut />} />
            </Route>
          </Route>
          {/* Cashier */}
          <Route path={path.CS_PUBLIC} element={<Cs_Public />}>
            <Route path={path.PAYMENTRESULT} element={<PaymentResult />} />
            <Route path={path.CS_ORDER} element={<Cs_Order />}>
              <Route path={path.CS_WAITINGPAYMENT} element={<Cs_WaitingPayment />} />
              <Route path={path.CS_ONPROCESS} element={<Cs_OnProcess />} />
              <Route path={path.CS_COMPLETE} element={<Cs_Complete />} />
              <Route path={"payment-return"} element={<PaymentReturn />} />
            </Route>
            <Route path={path.CS_BUYPRODUCT} element={<Cs_BuyProduct />}>
              <Route path={path.CS_ONPROCESSBUY} element={<Cs_OnProcessBuy />} />
              <Route path={path.CS_COMPLETEBUY} element={<Cs_CompleteBuy />} />
            </Route>
            {/* <Route path='cs_bill/:id' element={<Cs_Bill />} /> */}
          </Route>
          <Route path='cs_bill/:id' element={<Cs_Bill />} />
          <Route path='bill/:id' element={<Bill />} />
       
        </Routes>
      </div>



      <ToastContainer

      />


    </>
  );
}

export default App;
