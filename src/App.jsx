import React from 'react'
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Shop from './pages/Shop'
import Error from './pages/Error'
import Header from './components/Header'
import Footer from './components/Footer'
import Cart from './pages/Cart'
import Discord from './pages/Discord'
import { Toaster } from 'react-hot-toast'
import { ConfigProvider } from 'antd'
import AosProvider from './components/AosProvider'
import Login from './pages/Login'
import { useSelector } from 'react-redux'
// data-aos="fade-down" data-aos-delay="500" data-aos-duration="1000"
export default function App() {

  function PageLayout() {
    return <>
      <Header />
      <div className="min-h-[80vh]">
        <Outlet />
      </div>

      <Footer />
    </>
  }
  function ProtectedPagesLayout() {
    const site = useSelector(state => state.site)
    if (!site.isLoggedIn) {
      return <Navigate to="/login" replace/>
    }
    return <>
      {/* <Header /> */}
      <div className="min-h-[80vh]">
        <Outlet />
      </div>
      {/* <Footer /> */}
    </>
  }

  const pageRoutes = createBrowserRouter([
    {
      path: "/",
      element: <PageLayout />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/about",
          element: <About />
        },
        {
          path: '/contact',
          element: <Contact />
        },
        {
          path: '/shop',
          element: <Shop />
        },
        {
          path: '/cart',
          element: <Cart />
        },
        {
          path: '/login',
          element: <Login />
        }

      ],
      errorElement: <Error />
    },
    {
      path: '/dashboard',
      element: <ProtectedPagesLayout />,
      children: [
        {
          path: '/dashboard/overview',
          element: <Discord />
        }
      ]
    }
  ])

  return (
    <>
    <Toaster />
    <ConfigProvider >
      <AosProvider >
      <RouterProvider router={pageRoutes}></RouterProvider>
      </AosProvider>
    </ConfigProvider>

    </>
  )
}
