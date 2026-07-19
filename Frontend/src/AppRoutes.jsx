import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Register from './Features/auth/pages/Register'
import Login from './Features/auth/pages/Login'
import Home from './Features/auth/pages/Home'

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/home' element={<Home />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes