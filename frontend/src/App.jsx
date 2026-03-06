import { Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"


const ProtectedRoute = ({children}) => {
    const token = localStorage.getItem('token')
    return token?children:""
}

const App = () => {
  return (
      <div>
          <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/dashboard' element={
                  <ProtectedRoute>
                      <Dashboard/>
                  </ProtectedRoute>
              } 
              />

              <Route path="*" element={<Login/>} />
              

          </Routes>
      
    </div>
  )
}

export default App
