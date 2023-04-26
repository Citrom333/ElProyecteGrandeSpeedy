import React from 'react'
import ReactDOM from 'react-dom/client'
import AdminPage from './AdminPage'
import OrdersListPage from './Pages/OrdersListPage'
import App from './App'
import './index.css'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import OrdersUpdatePage from './Pages/OrderUpdatePage'
import AddNewOrder from './Pages/AddNewOrder'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:
      [
        {
          path: "/admin",
          element: <AdminPage />,
          children:
            [
              {
                path: "/admin/orders",
                element: <OrdersListPage />
              },
              {
                path: "/admin/orders/addnew",
                element: <AddNewOrder />
              },
              {
                path: "/admin/orders/update/:id",
                element: <OrdersUpdatePage />
              }
            ]
        },
      ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);