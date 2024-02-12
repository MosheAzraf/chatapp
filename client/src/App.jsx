import { useEffect } from 'react';
import { Routes, Route, } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'; 
import useAuth from './hooks/useAuth';
import 'react-toastify/dist/ReactToastify.css';

import RootLayout from './layouts/RootLayout'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login';
import Chat from './pages/Chat'
import AuthGuard from './components/AuthGuard'



function App() {
  const {verifyAuth} = useAuth();


  useEffect(() => {
    const checkAuth = async () => {
      await verifyAuth();
    }
    
    checkAuth();
  },[verifyAuth]);

  return (
    <>
    <Routes>
      <Route path='/' element={<RootLayout/>}>
        <Route path='home' element={<Home/>}/>
        <Route path='signup' element={<Signup/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='chat' element={<AuthGuard />}>
          <Route index element={<Chat/>}/>
        </Route> 
      </Route> 
    </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
    </>
  )
}

export default App
