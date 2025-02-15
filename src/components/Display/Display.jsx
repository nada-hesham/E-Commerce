import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Circles } from 'react-loader-spinner'
import { Link, Navigate } from 'react-router-dom'
import { createCart } from '../../ConTextCart/ConTextCartProvider'
import toast from 'react-hot-toast'
import { conTextWishlist } from '../../WishListContext/WishListContext'
export default function Display() {
  let {addToCart ,setNumOfCartItems }= useContext(createCart);
    let {addToWishList}=useContext(conTextWishlist);
    const [numsPage , setNumsPage]= useState([])
    const [color , setColor]= useState(" text-red-500")
 const{removeItem}= useContext(conTextWishlist);
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
  async function addProductToWishList(id) {
    let result = await addToWishList(id)
    console.log(result)
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

  const [page, setPage] = useState(1);
  async function getProduct(page){
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/products?limit=20&page=${page}`)

  }
  let {data , isLoading , isError , error}= useQuery({
    queryKey:["product" , page],
    queryFn:()=>getProduct(page),
    select: (data)=> {
      return data.data
    }
  })
  // console.log(data)
  useEffect(() => {
    if (data && data.metadata) {
      const length = data.metadata.numberOfPages;
      let nums = [];
      for (let i = 1; i <= length; i++) {
        nums.push(i);
      }
      setNumsPage(nums);
    }


  }, [data]);

  function pageNumber(e){
    
    let page= e.target.getAttribute("page");
    console.log(e.target.getAttribute("page"))
    getProduct(page)
    setPage(page)
  }
  
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

    if(isError){
      return <Navigate to={"/*"}/>
    }

    
function changeColor(e){
  e.target.classList.toggle("text-red-500")
 
}







  return <>
  <div className="container">
    <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 gap-5 px-3 mt-2 " >
     {data?.data.map((product)=> <div key={product._id} className=' overflow-hidden  relative shadow p-2 cursor-pointer'>
      
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
     <button onClick={()=>{addProductToCart(product._id)}} className='py-1 border-[#4fa74f]  border-[1px] rounded-md w-3/4 hover:text-white mt-2  italic  hover:bg-[#4fa74f] group'><i className='fas fa-plus  group-hover:text-white'></i> Add To Cart </button>
        <i  onClick={(e)=>{
          addProductToWishList(product._id)
          changeColor(e)
          }} className='fas fa-heart text-2xl p-3 text-black cursor-pointer'></i>
     </div>
       </div>)}
    </div>

  </div>

  <nav aria-label="Page navigation example" className='mt-6 text-center cursor-pointer'>
  <ul className="inline-flex -space-x-px  text-sm">
    <li>
      <a className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
    </li>

    {numsPage.map((el) => <li onClick={pageNumber} key={el}>
      <a  page={el} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{el}</a>
    </li>)}
   
   
    <li>
      <a  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
    </li>
  </ul>
</nav>
  
  </>
}
