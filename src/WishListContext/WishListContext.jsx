import axios from 'axios';
import React, { useState } from 'react'
import { createContext } from 'react';

export let conTextWishlist= createContext()
export default function WishListContext({children}) {
    let token = localStorage.getItem("token");
    const [isLoading , setIsLoading]= useState(false)
     const [productWishlist , setProductWishlist] =useState([]);
     const [count , setCount] =useState(0);

   async  function addToWishList(productId){
       return  axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist` , {productId} , {
            headers:{
                token
            }
        }).then((res)=>{
            console.log(res);
            return res
            
        }).catch((error)=>{
            console.log(error);
            return error
        })
    }

async function getWishList(){
    setIsLoading(true)
    axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist` , {
        headers:{
            token
        }
    }).then((res)=>{
        console.log(res);
        setProductWishlist(res.data.data)
        setCount(res.data.count)
        
    }).catch((error)=>{
        console.log(error);
        
    }).finally(()=>{
        setIsLoading(false)
    })
}

async function removeItem(id){
  return  axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}` , {
        headers:{
            token,
        }
    }).then((res)=>{
        console.log(res)
        // setProductWishlist(res?.data?.data)
        getWishList()
        setCount(res?.data?.count)
        return true
    }).catch((error)=>{
        console.log(error)
        return false
    })
}



  return<conTextWishlist.Provider value={{addToWishList , getWishList , isLoading , productWishlist , count , removeItem}}>
  {children}
  </conTextWishlist.Provider>
}
