import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Register from './Features/auth/pages/Register'
import Login from './Features/auth/pages/Login'

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes