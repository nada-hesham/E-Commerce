import React, { useContext, useEffect } from 'react'
import { conTextWishlist } from '../../WishListContext/WishListContext';
import { Helmet } from 'react-helmet';
import { Circles } from 'react-loader-spinner';
import { createCart } from '../../ConTextCart/ConTextCartProvider';
import toast from 'react-hot-toast';
export default function WishList() {
  let {getWishList , isLoading , productWishlist , count , removeItem}= useContext(conTextWishlist);
  const {addToCart , setNumOfCartItems} = useContext(createCart)

  async function addProductToCart(id) {
    let result = await addToCart(id)
    console.log(result)
    setNumOfCartItems(result.data.numOfCartItems)
    if(result.data){
      toast.success(result.data.message)
    }else{
      toast.error(result.message)
    }
  }


  async function removeItemFromWishlist(id){
    let result = await removeItem(id);
    console.log(result)
    if (result){
      toast.success("product deleted")
    }else{
      toast.error(" faild product not delete")
    }
  }

  useEffect(()=>{
    getWishList()
  }, [])

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

  return <>
  <Helmet>
    <title> WishList page</title>
  </Helmet>
  <div className="container">
 <div className='mt-14 text-center text-green-500 italic text-2xl '>
 <span > Number of product : {count}</span>
 </div>
  <div className="grid  md:grid-cols-4 sm:grid-cols-2 gap-5 px-3 mt-2 text-center  ">
{productWishlist?.map((product)=><div key={product?._id} className=' shadow-md g-5 py-3'>
<img src={product.imageCover} alt=""  className='w-full'/>
<h2 className='text-2xl font-bold  '> {product.category?.name}</h2>

<div className='flex justify-between px-5 py-3 text-2xl '>
<h3> price : {product.price} EGP</h3>
  <span> {product.ratingsAverage} <i className='fas fa-star text-yellow-300'></i></span>
</div>

<div className='flex justify-between gap-2 py-3 px-4'>
<button onClick={()=>{addProductToCart(product?._id)}} className='py-1 border-[#4fa74f]  border-[1px] rounded-md w-1/2 hover:text-white mt-2  italic  hover:bg-[#4fa74f]'> <i className='fas fa-plus  group-hover:text-white'></i>  Add To Cart </button>
<span onClick={()=>{removeItemFromWishlist(product?._id)}} className="font-medium text-red-600 border-red-600 border rounded-md py-1 group mt-2  w-1/2 hover:bg-red-500 hover:text-white dark:text-red-500 cursor-pointer"> 
          <i className='fas fa-trash text-red-600 pe-2 group-hover:text-white'></i> Remove</span>
</div>
</div>)}
  </div>
  </div>
  </>
}
