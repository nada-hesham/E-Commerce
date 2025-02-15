import React from 'react'
import paypal from '../../assets/paypal.png'
import play from '../../assets/googlePlay.png'
export default function Footer() {

  return <>
  <div className='bg-gray-100 p-4 '>
 <div className="container">
  <h1 className='text-2xl text-gray-600'>Get the Fresh Cart App</h1>
  <p className='text-gray-500'>we will send you a link , open it in your phone to download the app </p>
  <div className='mt-3 ms-2'>
    <input type="text" placeholder='Email...' className='w-[75%] p-1 rounded '/>
    <button className='bg-[#4fa74f] text-white p-1 rounded ms-2 w-40'> Share App Link</button>
    <hr className='my-3'/>
  </div>
  <div className='flex justify-between'>
  <div className='flex items-center '>
    <span className='text-gray-500 '> Payment partners</span>
    <img src={paypal} alt="paypal" className='w-[7%] ms-3' />
    <i className='fa-brands fa-cc-visa  ms-3'></i> 
    <i className='fa-brands fa-cc-amazon-pay  ms-3'></i> 

  </div>
  <div className='flex'>
    <p className='pe-2 ' >Get deliveries with FreshCart </p>

  <div className='bg-black border border-white rounded-md p-1 flex'>
    <i className='fa-brands fa-apple text-white text-3xl text-center pe-2'></i>
    <div className='flex flex-col'>
      <span className='text-[10px] text-white'>Avilable on the </span>
      <span className=' text-white font-bold'>APP Store</span>
    </div>
 
  </div>
  <div className='bg-black border border-white rounded-md p-1 flex'>
    <img src={play} alt="" className='w-[30px]' />
    <div className='flex flex-col'>
      <span className='text-[10px] text-white'>Get It On </span>
      <span className=' text-white font-bold'>Google Play</span>
    </div>
 
  </div>
  </div>
  </div>
 </div>
  </div>
  </>
}
