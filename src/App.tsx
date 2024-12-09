import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Create from './components/Create'
import Home from './components/Home'
import Update from './components/Update'
import Register from './components/Register'
import Login from './components/Login'
import ProtectRoutes from './components/ProtectRoutes'

function App() {
const isAuthentected = localStorage.getItem("token")
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectRoutes />}>
          <Route path='/home' element={<Home />}/>
          <Route path='/create' element={<Create />}/>
        </Route>
        <Route path='/update/:documentId' element={<Update />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<Login />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
