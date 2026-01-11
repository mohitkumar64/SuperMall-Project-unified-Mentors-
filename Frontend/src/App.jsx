
import './App.css'
import { Routes , Route } from 'react-router-dom'

import MainPage from './Pages/MainPanel'

import DataProvider from './outlet/DataProvider'
import Login from './Pages/Auth/Login'
import Signup from './Pages/Auth/Singup'
import AdminDashboard from './Pages/Admin/AdminDashboard.jsx'
import MerchantDashboard from './Pages/MerchantDashboard/MerchantDashboard.jsx'
import {AuthProvider} from './context/AuthProvider.jsx'
import AdminRoute from './ProtectedRoutes/AdminRoute.jsx'
import MerchantRoute from './ProtectedRoutes/MerchantRoute.jsx'
import Shops from './Pages/Admin/ManageShop/Shops.jsx'
import ManageProducts from './Pages/MerchantDashboard/ManageProducts.jsx'
import ManageFloors from './Pages/Admin/ManageFloors/ManageFloor.jsx'
import ManageMerchants from './Pages/Admin/ManageMerchant/ManageMerchant.jsx'
import ProductDetails from './Pages/ProductDetails.jsx'

function App() {
 

  return (
  <AuthProvider >
      <Routes >
        <Route element={<DataProvider />}>
          <Route  index element={<MainPage />} />
           <Route  path='/productDetails/:id' element={<ProductDetails />} />
        </Route>
      <Route path='/login' element= {<Login />} />
        <Route path='/singup' element= {<Signup />} />

       
        <Route path='/admin' element={<AdminRoute />} > 
            <Route path='/admin/Dashboard' element={<AdminDashboard />}/>
            <Route path='/admin/manageShops' element={<Shops />} />
             <Route path='/admin/manageFloors' element={<ManageFloors />} />
               <Route path='/admin/manageMerchants' element={<ManageMerchants />} />
        </Route>
          <Route path='/merchant' element={<MerchantRoute />} > 
            <Route path='/merchant/Dashboard' element={<MerchantDashboard />}/>
            <Route path='/merchant/manageProducts' element={<ManageProducts />} />
        </Route>
 
      </Routes>
    </AuthProvider>
  )
}

export default App
