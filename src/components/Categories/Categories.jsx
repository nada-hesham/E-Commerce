import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import Slider from 'react-slick';


export default function Categories() {

    let settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 2,
    };

  async function callApi() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    
  }

  let {data} = useQuery({
    queryKey:["Categories"],
    queryFn:callApi,
    select:(data)=>{
      return data.data
    }
  })
  return <>
   <h2 className='text-gray-500 text-2xl py-3'> Shop Popular Categories</h2>

  <Slider {...settings} className='mb-10'>
   {data?.data.map((category)=> <div key={category._id}>
     <img src={category.image} alt={category.name}  className='w-full h-[200px] object-cover'/>
     </div>
  
   )}

    </Slider>
  

  </>
}
