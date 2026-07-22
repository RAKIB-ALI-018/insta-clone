import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Register from './Features/auth/pages/Register'
import Login from './Features/auth/pages/Login'
import Feed from './Features/post/pages/Feed'
import CreatePost from './Features/post/components/CreatePost'

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/feed' element={<Feed />} />
                <Route path='/create' element={<CreatePost/>} />
                
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes