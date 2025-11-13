import { browserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/signUp';
function App() {
  const token = localStorage.getItem("token");
  return (
    <Router>
      <nav>
        <Link>Products</Link>
        <Link>Add Products</Link>
        {token ? <Link>Logout</Link> : <><Link>Login</Link><Link>SignUp</Link></>}
      </nav>
      <Routes>
        {
          token ? (
            <>
              <Route path='/'/>
            </>
          ) : (
            <>
              <Route path='/' element={<Login/>}/>
              <Route path='/signup' element={<SignUp/>}/>
            </>
          )
        }
      </Routes>
    </Router>
  )
}

export default App
