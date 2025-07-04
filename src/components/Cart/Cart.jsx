import React, { useContext, useEffect } from 'react'
import { createCart } from '../../ConTextCart/ConTextCartProvider'
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Circles } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';
export default function Cart() {

 let { removeItem ,getCart ,isLoading, updateCart, productCart  ,totalCartPrice ,btnLoading , clearCart}= useContext(createCart);

 useEffect( ()=>{

getCart()


 }, [])

   if (isLoading) {
           return <div    className="flex justify-center items-center h-screen">
           
             <Circles
               height="80"
               width="80"
               color="#4fa94d"
               ariaLabel="circles-loading"
               wrapperStyle={{}}
               wrapperClass=""
               visible={true}
             />
        
           </div>
         }

 async function removeItemFromCart(id){
  let result = await removeItem(id);
  if (result){
    toast.success("product deleted")
  }else{
    toast.error(" faild product not delete")
  }
}

  return <>
   <Helmet>
    <title> Cart page</title>
  </Helmet>
<div  className='container shadow  my-5'>
  

<h2 className='text-center py-4 text-3xl text-[#4fa74f] line relative my-5'>Shop Cart</h2>



<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3">
          Product
        </th>
        <th scope="col" className="px-6 py-3">
          Qty
        </th>
       
      </tr>
    </thead>
    <tbody>
    {productCart.map((product)=>  <tr key={product.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-4">
          <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={product.product.title} />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
        <p className='text-xl'>{product.product.title}</p>
        <span  className="text-lg py-4 font-semibold dark:text-white text-[#4fa74f] "> {product.price}EGP</span>
        <div className='text-lg mt-4'>
        
        <span onClick={()=>{removeItemFromCart(product.product.id)}} className="font-medium text-red-600 border-red-600 border rounded-md p-2 group  hover:bg-red-500 hover:text-white dark:text-red-500 cursor-pointer"> 
          <i className='fas fa-trash text-red-600 pe-2 group-hover:text-white'></i> Remove</span>
        </div>

        </td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <button onClick={()=>{updateCart(product.product.id , product.count - 1)}} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-[#4fa74f] rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
              </svg>
            </button>
            <div>
              <input type="number" id="first_product" className="bg-gray-50 w-14 border border-[#4fa74f] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={product.count} required />
            </div>
            <button onClick={()=>{updateCart(product.product.id , product.count + 1)}}className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-[#4fa74f] rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
              </svg>
            </button>
          </div>
        </td>
       
      </tr> )}
      
    
    </tbody>
    <tfoot >
    <tr className='bg-gray-50'>
    <td colSpan="100%">
    <h3 className='text-2xl  p-5'>Total Cart Price : <span className='text-2xl text-[#4fa74f]'>{totalCartPrice} EGP</span></h3>
    </td>
    </tr>
    </tfoot>
  </table>
</div>


<div className=' flex justify-between px-3'>
<button  onClick={()=>{clearCart()}} className='btn  '> {btnLoading ?  <i className='fas fa-spinner fa-spin'></i> :" Delete All Items"} </button>
<Link  to={"/payment"} className='btn'> Payment</Link>
</div>


  </div>  
  </>
}
