import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import {createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/Home";
import UserPage from "./routes/UserPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
    
      },
      {
        path: "/userpage",
        element: <UserPage />,
    
      },
    ]

  },
 
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
