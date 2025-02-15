import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext } from 'react'
import * as Yup from 'yup'
import { createCart } from '../../ConTextCart/ConTextCartProvider'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Helmet } from 'react-helmet'

export default function Payment() {
  
  let {cartId , setNumOfCartItems}=useContext(createCart)
  let navigate = useNavigate()
  const [chash , setCash]=useState(false)
 
async function cashPayment(values){
console.log(values)

axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}` ,values ,
  {headers:{
    token:localStorage.getItem("token")
  }}
 ).then((res)=>{
  console.log(res)
  toast.success("Completed Sussessfull")
  navigate("/allorders")
 }).catch((error)=>{
  console.log(error);
  toast.error("somethink wrong please try again")
 })
}

async function onlinePayment(values){
 axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}` , values ,
  {headers:{
    token:localStorage.getItem("token")
  } , 
  params:{
    url:'http://localhost:5173'
  }
})
.then((res)=>{
  console.log(res);
  console.log(res.data.session.url);
  window.open(res.data.session.url , '_self')

  
}).catch((error)=>{
  console.log(error);
  
})
} 
let validationSchema= Yup.object({
  details:Yup.string().required("")

})

function paymentMathod(values){

  let apiObject ={
    shippingAddress: values,
  }

if(chash){
  cashPayment(apiObject);
  setNumOfCartItems(0)


}else{
  onlinePayment(apiObject)
  setNumOfCartItems(0)

}
}


  let formikPayment =useFormik({
    initialValues:{
      details:"",
      phone:"",
      city:""
    },
    validationSchema,
    onSubmit:paymentMathod,
  })
  
    return <>
     <Helmet>
    <title> Payment page</title>
  </Helmet>
   <form className="max-w-md mx-auto my-10" onSubmit={formikPayment.handleSubmit}>
    <div className="relative z-0 w-full my-5 group">
      <input 
      value={formikPayment.values.details}
      onChange={formikPayment.handleChange}
      onBlur={formikPayment.handleBlur}
      type="text" name="details" id="details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#4fa74f] focus:outline-none focus:ring-0 focus:border-[#4fa74f] peer" placeholder=" "  />
      <label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#4fa74f] peer-focus:dark:text-[#4fa74f] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Details</label>
    </div>
    <div className="relative z-0 w-full my-5 group">
      <input 
       value={formikPayment.values.phone}
       onChange={formikPayment.handleChange}
       onBlur={formikPayment.handleBlur}
      type="tel" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#4fa74f] focus:outline-none focus:ring-0 focus:border-[#4fa74f] peer" placeholder=" "  />
      <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#4fa74f] peer-focus:dark:text-[#4fa74f] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>
    </div>
    <div className="relative z-0 w-full my-5 group ">
      <input 
       value={formikPayment.values.city}
       onChange={formikPayment.handleChange}
       onBlur={formikPayment.handleBlur}
      type="text" name="city" id="city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#4fa74f] focus:outline-none focus:ring-0 focus:border-[#4fa74f] peer" placeholder=" "  />
      <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#4fa74f] peer-focus:dark:text-[#4fa74f] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">City</label>
    </div>
  
    <div>
      <button  onClick={()=> setCash(true)} type='submit' className='btn me-4'>Cash Payment </button>
      <button onClick={()=> setCash(false)} type='submit' className='btn'>visa Payment </button>
    </div>
  </form>
  </>
}
