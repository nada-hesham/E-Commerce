
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout.jsx'
import Register from './components/Register/Register.jsx'
import Home from './components/Home/Home'
import Login from './components/Login/Login.jsx'
import ContextProvider from '../conText/ContextProvider.jsx'
import NotFound from './components/NotFound/NotFound.jsx'
import Cart from './components/Cart/Cart.jsx'
import ProtectedRouter from './components/ProtectedRouter/ProtectedRouter.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Product from './components/Product/Product.jsx'
import Brands from './components/Brands/Brands';
import ProductDetails from './components/ProductDetails/ProductDetails.jsx'
import { ReactQueryDevtools } from './../node_modules/@tanstack/react-query-devtools/src/index';
import ConTextCartProvider from './ConTextCart/ConTextCartProvider.jsx'
import { Toaster } from 'react-hot-toast'
import WishList from './components/WishList/WishList.jsx'
import WishListContext from './WishListContext/WishListContext.jsx'
import Payment from './components/Payment/Payment.jsx'
import AllOrders from './components/Orders/AllOrders.jsx'
import ForgetPassword from './components/ForgetPassword/ForgetPassword.jsx'
import UpdatePassword from './components/UpdatePassword/UpdatePassword.jsx'


 let Client = new QueryClient()
function App() {

  let router = createBrowserRouter([ 
    {path:"" , element: <Layout/> ,children:[
      {index:true, element: <ProtectedRouter><Home/></ProtectedRouter>},
      {path:"home", element: <ProtectedRouter><Home/></ProtectedRouter>},
      {path:"register" , element:<Register/>},
      {path:"login" , element:<Login/>},
      {path:"updatepassword" , element:<UpdatePassword/>},
      {path:"forgetpassword" , element:<ForgetPassword/>},
      {path:"cart" , element:<ProtectedRouter><Cart/></ProtectedRouter>},
      {path:"payment" , element:<ProtectedRouter><Payment/></ProtectedRouter>},
      {path:"product" , element:<ProtectedRouter><Product/></ProtectedRouter>},
      {path:"allorders" , element:<ProtectedRouter><AllOrders/></ProtectedRouter>},
      {path:"brands" , element:<ProtectedRouter><Brands/></ProtectedRouter>},
      {path:"wishlist" , element:<ProtectedRouter><WishList/></ProtectedRouter>},
      {path:"productDetails/:id/:category" , element:<ProtectedRouter><ProductDetails/></ProtectedRouter>},
      {path:"*" , element:<NotFound/>},
    ]}
  ])

  return <>
 
  <WishListContext>
<QueryClientProvider client={Client}>
  <ReactQueryDevtools/>
  <ConTextCartProvider>
  <ContextProvider>
  <Toaster />
  <RouterProvider router={router}/>
  </ContextProvider>
  </ConTextCartProvider>
  </QueryClientProvider>
  </WishListContext>


  
  </>
}

export default App
