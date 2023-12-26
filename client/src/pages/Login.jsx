import { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import useAuth from "../hooks/useAuth";
import {useNavigate} from 'react-router-dom'


const Login = () => {
  const {login} = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loginInputs, setLoginInputs] = useState({
    userName: "",
    password: "",
  });


  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginInputs((prev) => ({ ...prev, [name]: value }));
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
      await login(loginInputs);
    } catch(error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="block max-w-sm rounded-lg p-6 border border-gray-500">
        <form onSubmit={handleSubmit} className="text-start text-lg">
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              User Name (your nick name)
              <input
                type="text"
                className="block border rounded-md p-2 w-full"
                onChange={handleLoginChange}
                value={loginInputs.userName}
                name="userName"
                required
              />
            </label>
          </div>
          <div className="mb-4 flex items-center">
            <label className="block text-gray-700 font-bold mb-2">
              Password
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="block border rounded-md p-2 w-full pr-10 focus:outline-none focus:shadow-outline"
                  onChange={handleLoginChange}
                  value={loginInputs.password}
                  name="password"
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={toggleShowPassword}
                >
                  {showPassword ? <BiShow size={20} /> : <BiHide size={20} />}
                </div>
              </div>
            </label>
          </div>

          <div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
