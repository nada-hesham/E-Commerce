import axios from 'axios'
import React, { createContext, useEffect } from 'react'
import { useState } from 'react';


export let createCart =createContext();
 
export default function ConTextCartProvider({children}) {

  let token = localStorage.getItem("token");
  const [totalCartPrice , setTotalCartPrice] =useState(0);
 const [numOfCartItems , setNumOfCartItems] =useState(0);
 const [cartId , setCartId] =useState(null);
 const [productCart , setProductCart] =useState([]);
 const [isLoading , setisLoading] =useState(false);
 const [btnLoading , setBtnLoading] =useState(false);

   async function addToCart(productId){
        return axios.post("https://ecommerce.routemisr.com/api/v1/cart" , 
          {productId},
          {
            headers:
            {token}
          },
        )
        .then((res)=> {
          // console.log(res.data)
          return res
        })
        .catch((error)=>{
          return error
        })
    }
    useEffect(()=>{
     
        if(token){
          getCart().then((res)=>{
            console.log(res)
            console.log(res?.data?.numOfCartItems)
            setNumOfCartItems(res?.data?.numOfCartItems)
          }).catch((err)=>{
            console.log(err);
            
          })
        }
  
     
    },[token])
  

   async function getCart(){
    setisLoading(true)
    axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
      headers:{
        token,
      }
    }).then((res)=>{
      // console.log(res);
      setTotalCartPrice(res.data.data.totalCartPrice);
      setNumOfCartItems(res.data.numOfCartItems);
      setProductCart(res.data.data.products);
      setCartId(res.data.cartId);
      
    }).catch((error)=>{
      console.log(error);
      
    }).finally(()=>{
      setisLoading(false)
    })
    }

    async function removeItem(id){
      return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}` , {
        headers:{
          token
        }
       }).then((res)=>{
        console.log(res);
        setTotalCartPrice(res.data.data.totalCartPrice);
      setNumOfCartItems(res.data.numOfCartItems);
      setProductCart(res.data.data.products);
        return true
       }).catch((error)=>{
        console.log(error)
        return false
       })
    }

    async function updateCart(id , count){
       axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}` , {count} , {
        headers:{
          token
        }
       }).then((res)=>{
        setTotalCartPrice(res.data.data.totalCartPrice);
      setProductCart(res.data.data.products)
       }).catch((error)=>{
        console.log(error);
        
       })
    }
    async function clearCart() {
      setBtnLoading(true)
      axios.delete(`https://ecommerce.routemisr.com/api/v1/cart` , {
        headers:{
          token
        }
      }).then((res)=>{
        setTotalCartPrice(0);
      setNumOfCartItems(0);
      setProductCart([])
      }).catch((error)=>{
        console.log(error);
        
      }).finally(()=>{
        setBtnLoading(false)
      })
      
    }
    
     
  return <createCart.Provider value={{addToCart ,clearCart, getCart ,removeItem, productCart ,cartId, isLoading,numOfCartItems ,setNumOfCartItems ,totalCartPrice ,btnLoading, updateCart}}>
    {children}
  </createCart.Provider>
}
