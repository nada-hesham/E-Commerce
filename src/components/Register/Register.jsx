import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup"
import { conText } from '../../../conText/ContextProvider';
import { Helmet } from 'react-helmet';
export default function Register() {

const [errorMessage ,setErrorMessage]= useState(null);
const [loadingBtn ,setLoadingBtn]= useState(false);
let navigate= useNavigate()
let {setToken} = useContext(conText)

let validation =Yup.object().shape(
  {
    name:Yup.string().min(3 , "the letter must be at least 3 letters").max(10 , "the letter must be maximam 10 letters").required("name is required"),
    email:Yup.string().email("Email is invalid").required("email is required"),
    password:Yup.string().matches(/^[a-zA-Z]\w{6,8}$/ , "password must be start with letter (either uppercase or lowercase) , and numbers 5 to 7 " ).required("Password is required"),
    rePassword:Yup.string().oneOf([Yup.ref("password")], "the Re-Password is not match").required("Re-Password is required"),
    phone:Yup.string().matches(/^01[01235]\d{8}$/ , "must be an  Egyption number ").required("phone is required"),
  }
)

 function handleRegister(values){ 
  setLoadingBtn(true);
  console.log("values" , values);
 axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup' , values)
  .then((res)=>{
    console.log(res);
  navigate("/");
  localStorage.setItem("token", res.data.token )
  setToken(res.data.token)
  }).catch((error)=>{
  setErrorMessage(error.response.data.message);
  }).finally(()=>{
    setLoadingBtn(false)
  })
 
}

  let formikRegister= useFormik({
    initialValues:{
      name:"",
      email:"",
      password:"",
      rePassword:"",
      phone:"",
    },
    validationSchema:validation,
    onSubmit:handleRegister,
   
  })


  return <>
   <Helmet>
    <title> Signin page</title>
  </Helmet>
  
 <div className="conatiner py-10">
 {errorMessage ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 text-center" role="alert">
  {errorMessage}
</div> :null}

 <form action="" onSubmit={formikRegister.handleSubmit} className='w-1/2 mx-auto'>
 <h1 className='font-bold text-2xl py-2 '> Register Now:</h1>
 
     <div className='py-3'>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name:</label>
            <input
            name="name"
            value={formikRegister.values.name}
            onChange={formikRegister.handleChange}
            onBlur={formikRegister.handleBlur}
            type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John"  />
        </div>
       {formikRegister.errors.name && formikRegister.touched.name ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 text-center" role="alert">
  {formikRegister.errors.name}
</div> :null }

       <div className='py-3'>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email:</label>
            <input 
            name="email"
            value={formikRegister.values.email}
            onChange={formikRegister.handleChange}
            onBlur={formikRegister.handleBlur}
            type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John"  />
        </div>
        {formikRegister.errors.email && formikRegister.touched.email ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 text-center" role="alert">
  {formikRegister.errors.email}
</div> :null }
       <div className='py-3'>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password:</label>
            <input 
            name="password"
            value={formikRegister.values.password}
            onChange={formikRegister.handleChange}
            onBlur={formikRegister.handleBlur}
            type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John"  />
        </div>
        {formikRegister.errors.password && formikRegister.touched.password ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 text-center" role="alert">
          {formikRegister.errors.password}
             </div> :null }
      <div className='py-3'>
            <label htmlFor="repassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Re-Password:</label>
            <input 
            name="rePassword"
            value={formikRegister.values.rePassword}
            onChange={formikRegister.handleChange}
            onBlur={formikRegister.handleBlur}
            type="password" id="repassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John"  />
        </div>
        {formikRegister.errors.rePassword && formikRegister.touched.rePassword ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 text-center" role="alert">
               {formikRegister.errors.rePassword}
              </div> :null }
        <div className='py-3'>
            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">phone:</label>
            <input 
            name='phone'
            value={formikRegister.values.phone}
            onChange={formikRegister.handleChange}
            onBlur={formikRegister.handleBlur}
            type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John"  />
        </div>
        {formikRegister.errors.phone && formikRegister.touched.phone ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 text-center" role="alert">
  {formikRegister.errors.phone}
</div> :null }
          
        <button  disabled={loadingBtn? true : false} type='submit' className='border-2 border-[#4fa74f] p-3 rounded-md hover:bg-[#4fa74f] hover:text-white transition-all duration-200'> { loadingBtn ?  <i className='fas fa-spinner fa-spin'></i> :"Register Now"}</button>
  </form>
 </div>
  </>
}




