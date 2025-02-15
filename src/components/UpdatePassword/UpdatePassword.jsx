import React, { useContext, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom';
import { conText } from '../../../conText/ContextProvider';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup'
export default function UpdatePassword() {

  const [loadingBtn , setLoadingBtn] = useState(false)
const [errorMessage , setErrorMessage] = useState(null)
let navigate = useNavigate();

let validationSchema =Yup.object().shape({
   email:Yup.string().email("Email is invalid").required("email is required"),
   newPassword:Yup.string().matches(/^[a-zA-Z]\w{6,8}$/ , "password must be start with letter (either uppercase or lowercase) , and numbers 5 to 7 " ).required("Password is required"),
})

function handleUpdatePassword(values){
  setLoadingBtn(true)
  axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", values)
  .then((res)=>{
    console.log(res)
    if(res.data.token){
      navigate("/login")
    }
    
  }).catch((error)=>{
    setErrorMessage(error.response.data.message)
  }).finally(()=>{
    setLoadingBtn(false)
  })
}
let formikUpdate=useFormik({
  initialValues:{
    email:"",
    newPassword:""
  },
  validationSchema,
  onSubmit:handleUpdatePassword,
})




  return <>
  <Helmet>
    <title> Update Password</title>
  </Helmet>


<div className="container w-1/2 p-5 ">
{errorMessage ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 text-center" role="alert">
  {errorMessage}
</div> :null}
<form action="" onSubmit={formikUpdate.handleSubmit}>
<h1 className='font-bold text-2xl py-2 mb-3'> Set Your New Password:</h1>
<div className='mb-4'>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email:</label>
            <input 
            name='email'
            value={formikUpdate.values.email}
            onChange={formikUpdate.handleChange}
            onBlur={formikUpdate.handleBlur}
            type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
        </div>
        {formikUpdate.errors.email && formikUpdate.touched.email ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 text-center" role="alert">
  {formikUpdate.errors.email}
</div> :null }

  <div className='mb-4'>
            <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password:</label>
            <input 
            name='newPassword'
            value={formikUpdate.values.newPassword}
            onChange={formikUpdate.handleChange}
            onBlur={formikUpdate.handleBlur}
            type="newPassword" id="newPassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
        </div>
        {formikUpdate.errors.newPassword && formikUpdate.touched.newPassword ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 text-center" role="alert">
  {formikUpdate.errors.password}
</div> :null }
 
        <button disabled={loadingBtn ? true : false} type="submit" className='border-2 border-[#4fa74f] p-3 rounded-md hover:bg-[#4fa74f] hover:text-white transition-all duration-200'>{ loadingBtn ? <i className='fas fa-spinner fa-spin'></i> : "Change Password"}</button>
 
</form>
 </div>
  </>
}

