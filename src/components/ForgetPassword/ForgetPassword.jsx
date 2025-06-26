import axios from 'axios'
import { useFormik } from 'formik'
import  react ,{ useState } from 'react'
import { Helmet } from 'react-helmet'
import {  useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

export default function ForgetPassword() {
const [loadingBtn , setLoadingBtn] = useState(false)

const [formDisplay , setFormDisplay]= useState(true)
const [errorMessage , setErrorMessage] = useState(null)
let navigate = useNavigate();

  let validationSchema =Yup.object().shape({
     email:Yup.string().email("Email is invalid").required("email is required"),
  })

  let formForgetPassword=useFormik({
    initialValues:{
      email:"",
     
    },
    validationSchema,
    onSubmit:forgetPasswordApi,
  })
   function forgetPasswordApi(value){
    setLoadingBtn(true)
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords` , value)
    .then((res)=>{
      console.log(res)
      setErrorMessage(res.data.statusMsg)
      if(res.data.statusMsg){
        setFormDisplay(false)
      }
    }).catch((error)=>{
      console.log(error)
      setErrorMessage(error.data.statusMsg)
    }).finally(()=>{
      setLoadingBtn(false)
    })
  }
  ////////////////////////////////////////////////////////////////////////
  let validation =Yup.object().shape({
    resetCode:Yup.string().required("resetCode is required"),
  })

  let resetCode=useFormik({
    initialValues:{
      resetCode:"",
     
    },
    validationSchema:validation,
    onSubmit:resetCodedApi,
  })
  async function resetCodedApi(value){
    setLoadingBtn(true)
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode` , value)
    .then((res)=>{
      console.log(res)
      setErrorMessage(res.data.statusMsg)
      if(res.data.status){
        navigate("/updatepassword")
      }
    
    
    }).catch((error)=>{
      console.log(error)
      setErrorMessage(error.data.statusMsg)
    }).finally(()=>{
      setLoadingBtn(false)
    })
  }

  
  return <>
  
  <Helmet>
    <title> Forget Password</title>
  </Helmet>

{
  formDisplay ?   <div className="container w-1/2 p-5 ">
  {errorMessage ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 text-center" role="alert">
    {errorMessage}
  </div> :null}
  
  <form action="" onSubmit={formForgetPassword.handleSubmit}>
  <h1 className='font-bold text-2xl py-2 mb-3'> Set Your Email:</h1>
  <div className='mb-4'>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email:</label>
              <input 
              name='email'
              value={formForgetPassword.values.email}
              onChange={formForgetPassword.handleChange}
              onBlur={formForgetPassword.handleBlur}
              type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
          </div>
          {formForgetPassword.errors.email && formForgetPassword.touched.email ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 text-center" role="alert">
    {formForgetPassword.errors.email}
  </div> :null }
  <button disabled={loadingBtn ? true : false} type="submit" className='border-2 border-[#4fa74f] p-3 rounded-md hover:bg-[#4fa74f] hover:text-white transition-all duration-200'>{ loadingBtn ? <i className='fas fa-spinner fa-spin'></i> : "Send"}</button>
  
  </form>
  </div> :<> <Helmet>
    <title> ResetCode Page</title>
    </Helmet><div className="container w-1/2 p-5 ">
 <form action="" onSubmit={resetCode.handleSubmit}>
 <h1 className='font-bold text-2xl py-2 mb-3'> Reset Your Code:</h1>
 <div className='mb-4'>
             <label htmlFor="resetCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Reset Code:</label>
             <input 
             name='resetCode'
             value={resetCode.values.resetCode}
             onChange={resetCode.handleChange}
             onBlur={resetCode.handleBlur}
             type="string" id="resetCode" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
         </div>
         {resetCode.errors.resetCode && resetCode.touched.resetCode ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 text-center" role="alert">
   {resetCode.errors.resetCode}
 </div> :null }
 <button disabled={loadingBtn ? true : false} type="submit" className='border-2 border-[#4fa74f] p-3 rounded-md hover:bg-[#4fa74f] hover:text-white transition-all duration-200'>{ loadingBtn ? <i className='fas fa-spinner fa-spin'></i> : "Verify Code"}</button>
 
 </form>
 </div>
 </>
}



 
  </>
}
