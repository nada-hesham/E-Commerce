import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import React, { useContext } from 'react'
import { Circles } from 'react-loader-spinner'
import { Navigate} from 'react-router-dom'
import { conText } from '../../../conText/ContextProvider'
import { Helmet } from 'react-helmet'
export default function AllOrders() {
  const {token}=useContext(conText)
  const {id}=jwtDecode(token)
  localStorage.setItem("userId" , id)
 
 
  async function userId(){
    
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}` )
  }

  let {data , isLoading , isError} =useQuery({
    queryKey:["AllOrder" ,id ],
    queryFn:userId,
    select:(data)=>{
      return data.data
    }
  })
  // console.log(data)
  if (isLoading) {
    return <div  className="flex justify-center items-center h-screen">
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

  if(isError){
    return <Navigate to={"/*"}/>
  }
  
 

  return <>
  <Helmet>
    <title> All Orders page</title>
  </Helmet>
 <div className="container py-4 mx-auto">
 {data?.map((product)=> <div key={product._id} >
<div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-8">
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
          Brand 
        </th>
        <th scope="col" className="px-6 py-3">
          Number Of Pieces
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
       
      </tr>
    </thead>
    <tbody>
    {product?.cartItems?.length > 0 ? (
        product?.cartItems.map((item) =>  <tr key={item.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-4">
          <img src={item?.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={item?.product?.category?.name} />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
        <p className='text-xl'>{item?.product?.category?.name}</p>
       
       

        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          <div className="flex items-center">
          <h2 className='text-xl'>{item?.product?.brand?.name}</h2>
          </div>
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          <div className="flex items-center">
          <h2 className='text-xl'>{item?.count}</h2>
          </div>
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          <div className="flex items-center">
          <span  className="text-lg py-4 font-semibold dark:text-white text-[#4fa74f] "> {item?.price}EGP</span>
          </div>
        </td>
       
      </tr> )):(
        <p>No items in cart</p>
      )}
      
    
    </tbody>
    <tfoot >
    <tr className='bg-gray-50'>
    <td colSpan="100%">
    <div className='flex justify-between'>
    <h3 className='text-2xl  p-5'>Total Cart Price : <span className='text-2xl text-[#4fa74f]'>{product?.totalOrderPrice}EGP</span></h3>
    <span className='text-2xl  p-5'> Order Time :<span className='text-2xl text-[#4fa74f]'> {
      (() => {
        const dateString = product?.createdAt; 
        if (dateString) {
          let date = new Date(dateString); 
          const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',  
            day: '2-digit'   
          });
          return formattedDate; 
        }
        return "";  
      })()
    }</span></span>
    
    </div>
    </td>
    </tr>
    </tfoot>
  </table>
</div>

    </div>)}

 </div>
  
  </>
}
