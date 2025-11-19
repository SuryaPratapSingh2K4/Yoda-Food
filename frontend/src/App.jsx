import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import Login from './pages/Login';
import AddForm from './pages/AddForm';
import DashBoard from './pages/DashBoard';
import { Navigate } from 'react-router-dom';
import SignUp from './pages/signUp.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './features/authSlice.js';
import Modal from './pages/Modal.jsx';
import { ListOrderedIcon, ShoppingCartIcon } from 'lucide-react';
import Cart from './pages/Cart.jsx';
import Delivery from './pages/DeliveryItem.jsx';
function App() {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  return (
    <Router>
      <nav className='bg-gray-200 absolute top-0 left-0 right-0  px-6 py-3 flex gap-4 items-center justify-between'>
        <h2>Yoda-Foood</h2>
        {token ? <div className='flex gap-4 items-center'>
          <NavLink to='/dashboard' className='hover:scale-105 hover:font-bold'>Products</NavLink>
          <NavLink to='/add' className='hover:scale-105 hover:font-bold'>Add Products</NavLink>
          <NavLink to='/cart' className='hover:scale-105 hover:font-bold'><ShoppingCartIcon /></NavLink>
          <NavLink to='/mydelivery' className='hover:scale-105 hover:font-bold'><ListOrderedIcon /></NavLink>
          <NavLink onClick={() => dispatch(logout())} className='hover:scale-105 hover:font-bold'>Logout</NavLink>

        </div> : <>
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
          <Route path='/modal/:id' element={token ? <Modal /> : <Navigate to='/' />} />
          <Route path='/cart' element={token ? <Cart /> : <Navigate to='/' />} />
          <Route path='/delivery/:id' element={token ? <Delivery /> : <Navigate to='/' />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
