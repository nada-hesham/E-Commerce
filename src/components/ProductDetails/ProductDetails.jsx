import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Circles } from 'react-loader-spinner'
import { Link, Navigate, useParams } from 'react-router-dom'
import { createCart } from '../../ConTextCart/ConTextCartProvider'
import toast from 'react-hot-toast'
import { conTextWishlist } from '../../WishListContext/WishListContext'
import { Helmet } from 'react-helmet'

export default function ProductDetails() {

  let {addToCart , setNumOfCartItems} = useContext(createCart);
  let {addToWishList}=useContext(conTextWishlist);
 let {id , category }= useParams();

 const [relatedProducts, setRelatedProducts] = useState([]);


 async function addProductToCart(id) {
  let result = await addToCart(id)
  setNumOfCartItems(result.data.numOfCartItems)
  console.log(result)
  if(result.data){
    toast.success(result.data.message)
  }else{
    toast.error(result.message)
  }
}

async function addProductToWishList(id) {
  let result = await addToWishList(id)
  console.log(result)
  if(result.data){
    toast.success(result.data.message)
  }else{
    toast.error(result.message)
  }
}

  async function getSpecificProduct(id ){
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }
  async function getRelatedProduct(){
    let res= await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    let products= res.data.data.filter((product)=>product.category.name == category);
    console.log('product' , products)
    setRelatedProducts(products);
  }
  let {data , isLoading , isError }=useQuery({
    queryKey:["productDetails" , id ],
    queryFn: ()=> getSpecificProduct(id),
    select: (data)=>{
      return data.data
    },
  })

  useEffect(()=>{
    getRelatedProduct()
  } , [id])

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
    <title> Product Details page</title>
  </Helmet>
  <div>
    
    <div className='grid grid-cols-[1fr_2fr] gap-5 items-center container mt-3'>
       
       <div key={data?.data._id}>
       <img src={data?.data.imageCover} alt={data?.data.title} />
       </div>
    <div >
      <h2 className='text-xl mb-2'>{data?.data.title}</h2>
      <p className='text-gray-600 py-2'>{data?.data.description}</p>
      <h3 className='text-green-500 '>{data?.data.category.name}</h3>
      <div className='flex justify-between'>
      {data?.data.priceAfterDiscount ?<div className='text-sm'>
        <span className='text-red-700 line-through'>{data?.data.price} </span>
        <span>{data?.data.priceAfterDiscount} EGP</span>
        </div> : <span>{data?.data.price}EGP </span> }
        <span><i className='fas fa-star text-yellow-400'></i> {data?.data.ratingsAverage}</span>
        </div>
        <i  onClick={()=>{addProductToWishList(data?.data._id)}} className='fa-regular fa-heart text-red-600 text-2xl p-3 cursor-pointer'></i>

        <button   onClick={()=>{addProductToCart(data?.data._id)}} className='p-1 border-[#4fa74f]  border-[1px] rounded-md w-full hover:text-white mt-2  italic  hover:bg-[#4fa74f]'> Add To Cart </button>
    </div>
    </div>
   
  </div>

  <div className="container">
    {relatedProducts.length >0 ? <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 gap-5 px-3 mt-2 ">
     {relatedProducts.map((product)=> <div key={product._id} className=' overflow-hidden  relative shadow p-2 cursor-pointer'>
      
     <Link to={`/productDetails/${product._id}/${product.category.name}`}>
     <img src={product.imageCover} alt={product.title} className='w-full' />
      <h3 className='text-green-500 text-sm'>{product.category.name}</h3>
      <h2 className='text-xl mb-2'>{product.title.split(" ", 2).join(" ")}</h2>
      <div className='flex justify-between'>
        {product.priceAfterDiscount ?<div className='text-sm'>
        <span className='text-red-700 line-through'>{product.price} </span>
        <span>{product.priceAfterDiscount} EGP</span>
        </div> : <span>{product.price}EGP </span> }
       
        <span><i className='fas fa-star text-yellow-400'></i> {product.ratingsAverage}</span>
        </div>
        
         {product.priceAfterDiscount ? <span className='bg-red-500 text-white rounded-b-md absolute p-2 top-0 right-0'>
          Sale
        </span> : null}
        
     </Link>
     <div className='flex  justify-between'>
        <button  onClick={()=>{addProductToCart(product._id)}} className='p-1 border-[#4fa74f]  border-[1px] rounded-md w-full hover:text-white mt-2  italic  hover:bg-[#4fa74f]'> Add To Cart </button>
        <i  onClick={()=>{addProductToWishList(product._id)}} className='fa-regular fa-heart text-red-600 text-2xl p-3 cursor-pointer'></i>
        </div>
       </div>)}
    </div>: null}
   
  </div>

  </>
}
