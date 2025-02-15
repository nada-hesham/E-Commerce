import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { Helmet } from 'react-helmet'
import { Circles } from 'react-loader-spinner'

export default function Brands() {

async function brandsData(){
 return await axios.get("https://ecommerce.routemisr.com/api/v1/brands")
}

let {data , isLoading , isError} =useQuery({
  queryKey:["Brands"],
  queryFn:brandsData,
  select:(data)=>{
    return data.data.data
  }
})
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
    <title> Brands page</title>
  </Helmet>

   <div className='grid md:grid-cols-4 sm:grid-cols-2 gap-5 py-10 ' >
  {data?.map((brand)=> <div  key={brand._id} className='shadow-md text-center py-4'>
    <img src={brand.image} alt={brand.name} />
      <h3 className='font-bold p-3 text-green-600'>{brand.name}</h3>
  </div>
 )}
  </div>
  
  </>
}
