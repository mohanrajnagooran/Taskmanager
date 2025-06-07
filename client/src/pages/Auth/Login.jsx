import React, { useContext, useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/userContext';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const {updateUser} = useContext(UserContext);

  const navigate = useNavigate();

  //handle login form submit
  const handleLogin = async (e) => {
    e.preventDefault();
    if( !validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("please enter the password");
      return;
    }

    setError("");

    //Login API call 

    try{
        const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN,{
          email,
          password,
        });

        const { token, role } = response.data;
        if (token) {
          localStorage.setItem("token",token);
          updateUser(response.data)

          //Redirect based on role
          if(role === "admin") {
            navigate("/admin/dashboard");
          } else {
            navigate("/user/dashboard")
          }
        }
    } catch(error){
      if(error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("something went wrong. please try again");
      }
    }
  };

  return  <AuthLayout>
    <div>
      <h3 className='text-xl text-blue-700 font-bold text-center py-2'>Welcome Back!</h3>
      <p className='text-md text-center py-2'>Please enter your details to log  in</p>

      <form onSubmit={handleLogin}>
          <Input 
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label = "Email Address"
              placeholder='john@example.com'
              type='text'
          />
          <Input 
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              label = "Password"
              placeholder='min 8 Characters'
              type='password'
          />

          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

          <button type='submit' className='btn-primary'>LOGIN</button>
          <p className='text-[13px] text-slate-800 mt-3'>Don't have an account?{""}
            <Link className='font-medium text-blue-700 underline' to="/signup">SignUp</Link>
          </p>
      </form>
    </div>
    </AuthLayout>

}

export default Login