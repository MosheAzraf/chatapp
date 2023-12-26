import { useEffect, useState } from 'react';
import { Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import useAuth from './hooks/useAuth';

import RootLayout from './layouts/RootLayout'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login';
import Chat from './pages/Chat'
import AuthGuard from './components/AuthGuard'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<RootLayout  />}>
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
