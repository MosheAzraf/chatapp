import {useState} from 'react'
import { BiHide, BiShow } from "react-icons/bi";
import useAuth from '../hooks/useAuth';
import ErrorMessage from '../components/ErrorMessage';


const Signup = () => {
  const [signUpInputs, setSignUpInputs] = useState({
    firstName:"",
    lastName:"",
    userName:"",
    password:""
  });
  const [error, setError] = useState(null);
  const {register} = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUpChange = (e) => {
    const {name, value} = e.target;
    setSignUpInputs((prev) => ({...prev, [name]:value}))
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await register.mutateAsync({
        firstName: signUpInputs.firstName,
        lastName: signUpInputs.lastName,
        userName: signUpInputs.userName,
        password: signUpInputs.password,
      });
    } catch (error) {
      if(error) {
        setError(error);
      }
    }
  }  
  
  return (
    <div className='flex justify-center'>
      <div className='block max-w-s, rounded-lg p-6 border border-gray-500'>
        <form onSubmit={handleSubmit} className='text-start text-lg'>
          <div className='mb-4'>
            <label className='block text-gray-700 font-bold mb-2'>
              First Name
              <input type="text" 
                      className='block border rounded-md p-2 w-full' 
                      onChange={handleSignUpChange} 
                      value={signUpInputs.firstName} 
                      name='firstName'
                      required
                      />
            </label>
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 font-bold mb-2'>
              Last Name
              <input type="text" 
                      className='block border rounded-md p-2 w-full' 
                      onChange={handleSignUpChange} 
                      value={signUpInputs.lastName} 
                      name='lastName'/>
            </label>
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 font-bold mb-2'>
              User Name (Your Nickname)
              <input type="text" 
                      className='block border rounded-md p-2 w-full' 
                      onChange={handleSignUpChange} 
                      value={signUpInputs.userName} 
                      name='userName'/>
            </label>
          </div>
          <div className='mb-4 flex items-center'>
            <label className='block text-gray-700 font-bold mb-2'>
              Password
              <div className='relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className='block border rounded-md p-2 w-full pr-10 focus:outline-none focus:shadow-outline'
                  onChange={handleSignUpChange}
                  value={signUpInputs.password}
                  name='password'
                />
                <div
                  className='absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer'
                  onClick={toggleShowPassword}
                >
                  {showPassword ? <BiShow size={20} /> : <BiHide size={20} />}
                </div>
              </div>
            </label>
          </div>
          <div>
            <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline'>
              Sign Up
            </button>
          </div>
          {
            error && <ErrorMessage message={error}/>
          }
        </form>
      </div>
    </div>

  )
}

export default Signup

