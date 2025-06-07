import React, { useState, useContext } from 'react';
import AuthLayout from '../../components/layouts/AuthLayout';
import { validateEmail } from '../../utils/helper';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import Input from '../../components/Inputs/Input';
import { Link, useNavigate } from 'react-router-dom';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import { UserContext } from '../../context/userContext';
import uploadImage from '../../utils/uploadImage'

const Signup = () => {

  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminInviteToken, setAdminInviteToken] = useState("");


  const [error, setError] = useState(null);

  const {updateUser} = useContext(UserContext);

  const navigate = useNavigate();
  
    //handle Signup form submit
    const handleSignUp = async (e) => {
      e.preventDefault();

      let profileImageUrl = ''

      if( !fullName) {
        setError("Please enter a full name.");
        return;
      }

      if( !validateEmail(email)) {
        setError("Please enter a valid email address.");
        return;
      }
      if (!password) {
        setError("please enter the password");
        return;
      }
  
      setError("");
  
      //Signup API call 
      try{

        //upload image if present
        if (profilePic) 
          {
          const imgUploadRes = await uploadImage(profilePic);
          profileImageUrl = imgUploadRes.imageUrl || "";
          }

        const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
          name: fullName,
          email,
          password,
          profileImageUrl,
          adminInviteToken
        });
        const { token, role } =  response.data;

        if (token) {
          localStorage.setItem("token", token);
          updateUser(response.data)

          //Redirect based on role
          if (role === "admin")
          {
            navigate("/admin/dashbaord");
          } else {
            navigate("/user/dashboard");
          }
      }
         
    }
    catch(error){
      if(error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("something went wrong. please try again");
      }
    }
  };
  return (
    <AuthLayout>
      <div className='pt-3'>
        <h3 className='text-xl justify-center text-center text-blue-700 font-bold'>Create an account</h3>
        <p className='text-sm text-slate-700 mt-[5px] mb-6'>Join us today by entering your details below</p>
        
        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          <div className='grid grid-cols-2 md:grid-cols-2 gap-4'>
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="John"
              type="Text"
            />
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
            <Input 
              value={adminInviteToken}
              onChange={({ target }) => setAdminInviteToken(target.value)}
              label = "Admin Invite Token"
              placeholder='6 Digit code'
              type='text'
            />
          </div>
            {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

            <button type='submit' className='btn-primary'>SIGNUP</button>
            <p className='text-[13px] text-slate-800 mt-3'>Already have an account?{""}
              <Link className='font-medium text-blue-700 underline' to="/">Login</Link>
            </p>
          
        </form>
      </div>
    </AuthLayout>
  )
}

export default Signup