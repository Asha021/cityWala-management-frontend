import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
// import './index.css'
import { AuthProvider, useAuth } from './context/AuthContext'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import AdminLogin, { AdminBanners, AdminCategories, AdminDashboard, AdminUsers } from './pages/admin/AdminLogin'
// import AdminSubcategories from '../../frontend/src/pages/admin/AdminSubcategories'
import AdminSubcategories from './pages/admin/AdminSubcategories'
import AddPlans from './pages/admin/AddPlans'
import AllPlans from './pages/admin/AllPlans'

function App() {
  const [count, setCount] = useState(0)

  const ProtectedUser = ({ children }) => {
    const { user } = useAuth()
    return user ? children : <Navigate to="/account/login" />
  }

  const ProtectedAdmin = ({ children }) => {
    const { admin } = useAuth()
    return admin ? children : <Navigate to="/admin/login" />
  }

  const ProtectedPartner = ({ children }) => {
    const { partner } = useAuth()
    return partner ? children : <Navigate to="/partner/login" />
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Admin */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<ProtectedAdmin> <AdminDashboard /> </ProtectedAdmin>} />
          <Route path="/admin/users" element={<ProtectedAdmin> <AdminUsers /> </ProtectedAdmin>} />
          <Route path='/admin/plans/add' element={<ProtectedAdmin> <AddPlans /> </ProtectedAdmin>} />
          <Route path="/admin/plans/edit/:id" element={<ProtectedAdmin> <AddPlans /> </ProtectedAdmin>} />
          <Route path="/admin/categories/add" element={<ProtectedAdmin><AdminCategories /></ProtectedAdmin>} />
          {/* <Route path="/admin/plans" element={<ProtectedAdmin> <AllPlans /> </ProtectedAdmin>} /> */}
          <Route path="/admin/plans" element={<ProtectedAdmin> <AllPlans /> </ProtectedAdmin>} />

          {/* <Route path="/admin/plans/add" element={<AddPlan />} /> */}

          {/* <Route path="/admin/plans/edit/:id" element={<AddPlan />} /> */}

          {/* <Route path="/admin/categories" element={<ProtectedAdmin><AdminCategoriesAdd /></ProtectedAdmin>} /> */}
          <Route path="/admin/subcategories" element={<ProtectedAdmin> <AdminSubcategories /> </ProtectedAdmin>} />
          <Route path="/admin/banners" element={<ProtectedAdmin><AdminBanners /></ProtectedAdmin>} />
          {/* <Route path="/admin/matrimonial" element={<ProtectedAdmin><AdminMatrimonial /></ProtectedAdmin>} /> */}
          {/* <Route path="/admin/advertise" element={<ProtectedAdmin><AdminAdvertise /></ProtectedAdmin>} /> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
