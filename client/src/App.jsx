import { useEffect } from 'react';
import { Routes, Route, } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'; 
import useAuth from './hooks/useAuth';
import 'react-toastify/dist/ReactToastify.css';

import { useDispatch, useSelector } from 'react-redux';
import { setLoggedIn, setLoggedOut, } from './redux/features/authSlice';


import RootLayout from './layouts/RootLayout'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login';
import Chat from './pages/Chat'
import AuthGuard from './components/AuthGuard'

function App() {
  const { verifyAuth } = useAuth();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      dispatch(setLoggedIn());
    } else {
      const initAuth = async () => {
        try {
          await verifyAuth();
        } catch (error) {
          console.error(error);
        }
      };
      initAuth();
    }
  }, [dispatch, verifyAuth]);
  



  return (
    <>
    <Routes>
      <Route path='/' element={<RootLayout isAuth={isLoggedIn} />}>
        <Route path='home' element={<Home/>}/>
        <Route path='signup' element={<Signup/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='chat' element={<AuthGuard isAuth={isLoggedIn}/>}>
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

//BASIC CONNECTION SETUP WITH MESG SENDING AS FUNCTION
// import { socket } from "./socket"
// useEffect(() => {
//   socket.connect();

//   return () => {
//     socket.disconnect();
//   }
// },[]);

// const sendMessage = () => {
//   socket.emit("send_message", {message:input});
// }
