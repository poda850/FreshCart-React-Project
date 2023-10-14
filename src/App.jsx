import React, { useContext, useEffect } from 'react';
import './App.css';
import { RouterProvider, createHashRouter } from 'react-router-dom'

import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Products from './Components/Products/Products';
import Register from './Components/Register/Register';
import Categories from './Components/Categories/Categories';
import CategoryDetials from './Components/CategoryDetials/CategoryDetials';
import Brands from './Components/Brands/Brands';
import BrandDetials from './Components/BrandDetials/BrandDetials';
import Cart from './Components/Cart/Cart';
import NotFound from './Components/NotFound/NotFound';
import { TokenContext } from './Components/Context/TokenContext';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import ProductDetials from './Components/ProductDetials/ProductDetials';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import VerifyResetCode from './Components/VerifyResetCode/VerifyResetCode';
import UpdateLoggedUserPassword from './Components/UpdateLoggedUserPassword/UpdateLoggedUserPassword';
import ResetPassword from './Components/ResetPassword/ResetPassword';


let routers = createHashRouter([
  {
    path: '/', element: <Layout />, children: [
      { index: true, element: <ProtectedRoute> <Home /> </ProtectedRoute> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'forgotPassword', element:<ForgotPassword />},
      { path: 'verifyResetCode', element:<ProtectedRoute><VerifyResetCode /></ProtectedRoute>  },
      { path: 'resetPassword', element:<ProtectedRoute><ResetPassword /></ProtectedRoute>  },
      { path: 'updateLoggedUserPassword', element:<ProtectedRoute><UpdateLoggedUserPassword /></ProtectedRoute>  },
      { path: 'products', element:  <ProtectedRoute> <Products /> </ProtectedRoute> },
      { path: 'productDetials/:id', element:  <ProtectedRoute> <ProductDetials /> </ProtectedRoute> },
      { path: 'categories', element: <ProtectedRoute> <Categories /> </ProtectedRoute>  },
      { path: 'categoryDetials/:id', element: <ProtectedRoute> <CategoryDetials/> </ProtectedRoute>  },
      { path: 'brands', element: <ProtectedRoute> <Brands /> </ProtectedRoute> },
      { path: 'brandDetials/:id', element: <ProtectedRoute> <BrandDetials /> </ProtectedRoute> },
      { path: 'cart', element: <ProtectedRoute> <Cart /> </ProtectedRoute> },
      { path: '*', element: <NotFound /> },
    ]
  },
])

export default function App() {

  let { setUserToken } = useContext(TokenContext)
  useEffect(
    () => {
      if (localStorage.getItem('userToken') !== null) {
        setUserToken(localStorage.getItem('userToken'))
      }
    });
  return <>
    <RouterProvider router={routers}></RouterProvider>
  </>
}

