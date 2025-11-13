import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import Login from './pages/Login';
import AddForm from './pages/AddForm';
import DashBoard from './pages/DashBoard';
import { Navigate } from 'react-router-dom';
import SignUp from './pages/signUp.jsx';
function App() {
  const token = localStorage.getItem("token");
  return (
    <Router>
      <nav className='bg-gray-200 fixed top-0 left-0 right-0  px-6 py-3 flex gap-4 items-center justify-between'>
        <h2>Yoda-Foood</h2>
        {token ? <>
          <NavLink to='/dashboard'>Products</NavLink>
          <NavLink to='/add'>Add Products</NavLink>
          <NavLink onClick={() => localStorage.removeItem("token")}>Logout</NavLink>
        </> : <>
          <NavLink to='/'>Login</NavLink>
          <NavLink to='/signup'>SignUp</NavLink>
        </>}
      </nav>
      <div className='bg-slate-50'>
        <Routes>
          <Route path='/' element={!token ? <Login /> : <Navigate to='/dashboard' />} />
          <Route path='/signup' element={!token ? <SignUp /> : <Navigate to='/dashboard' />} />

          <Route path='/dashboard' element={token ? <DashBoard /> : <Navigate to='/' />} />
          <Route path='/add' element={token ? <AddForm /> : <Navigate to='/' />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
