import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { conText } from '../../../conText/ContextProvider'
import { Helmet } from 'react-helmet'
export default function Login() {
const [loadingBtn , setLoadingBtn] = useState(false)
const [errorMessage , setErrorMessage] = useState(null)
let navigate = useNavigate();

let validationSchema =Yup.object().shape({
   email:Yup.string().email("Email is invalid").required("email is required"),
    password:Yup.string().matches(/^[a-zA-Z]\w{6,8}$/ , "password must be start with letter (either uppercase or lowercase) , and numbers 5 to 7 " ).required("Password is required"),
})

let{setToken} =useContext(conText)
function handleLogin(values){
  setLoadingBtn(true)
  axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
  .then((res)=>{
    console.log(res)
    navigate("/")
    localStorage.setItem("token", res.data.token )
    setToken( res.data.token)
  }).catch((error)=>{
    setErrorMessage(error.response.data.message)
  }).finally(()=>{
    setLoadingBtn(false)
  })
}
let formikLogin=useFormik({
  initialValues:{
    email:"",
    password:""
  },
  validationSchema,
  onSubmit:handleLogin,
})




  return <>
   <Helmet>
    <title> Login page</title>
  </Helmet>
<div className="container w-1/2 p-5 ">
{errorMessage ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 text-center" role="alert">
  {errorMessage}
</div> :null}
<form action="" onSubmit={formikLogin.handleSubmit}>
<h1 className='font-bold text-2xl py-2 mb-3'> Login Now:</h1>
<div className='mb-4'>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email:</label>
            <input 
            name='email'
            value={formikLogin.values.email}
            onChange={formikLogin.handleChange}
            onBlur={formikLogin.handleBlur}
            type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
        </div>
        {formikLogin.errors.email && formikLogin.touched.email ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 text-center" role="alert">
  {formikLogin.errors.email}
</div> :null }

  <div className='mb-4'>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password:</label>
            <input 
            name='password'
            value={formikLogin.values.password}
            onChange={formikLogin.handleChange}
            onBlur={formikLogin.handleBlur}
            type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
        </div>
        {formikLogin.errors.password && formikLogin.touched.password ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 text-center" role="alert">
  {formikLogin.errors.password}
</div> :null }
 
        <button disabled={loadingBtn ? true : false} type="submit" className='border-2 border-[#4fa74f] p-3 rounded-md hover:bg-[#4fa74f] hover:text-white transition-all duration-200'>{ loadingBtn ? <i className='fas fa-spinner fa-spin'></i> : "Login"}</button>
 
</form>
<Link to={"/forgetpassword"}> 
<div> <p className='cursor-pointer text-center text-gray-500 hover:text-black'> Forget My Password</p></div>
</Link>

<Link to={"/register"}>
<div> <p className='cursor-pointer text-center text-gray-500 hover:text-black'>  Create A New Account  </p></div>
</Link>
 </div>
  
  </>
} 



