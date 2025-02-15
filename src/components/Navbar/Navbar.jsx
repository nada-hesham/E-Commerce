import React, { useContext, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { conText } from '../../../conText/ContextProvider'
import logo from "../../assets/logo.jpeg"
import { createCart } from '../../ConTextCart/ConTextCartProvider';
export default function Navbar() {
let {token , setToken} = useContext(conText);
let {numOfCartItems} = useContext(createCart);
let navigate= useNavigate()
function logOut(){
  navigate("/login")
  localStorage.removeItem("token")
  setToken(null)
}


  return <>
 

<nav className="bg-gray-100 border-gray-200 shadow fixed top-0 end-0 start-0  z-[999]">
        <div className="max-w-screen-xl flex flex-wrap justify-between  items-center  mx-auto p-4">
          <Link to="" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logo} className="h-8" alt="Logo" />
          </Link>
          <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
          <div className="hidden items-center md:gap-60 justify-between w-full md:flex md:w-auto" id="navbar-default">
         {token ? <div>
          <ul className=" font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-100 md:flex-row  rtl:space-x-reverse md:mt-0 md:border-0">
              <li>
                <NavLink to="" className="block py-2 px-3" aria-current="page">Home</NavLink>
              </li>
             
              <li>
                <NavLink to="/product" className="block py-2 px-3" aria-current="page">Products</NavLink>
              </li>
             
              <li>
                <NavLink to="/cart" className="block py-2 px-3" aria-current="page">Cart</NavLink>
              </li>
             
              <li>
                <NavLink to="/brands" className="block py-2 px-3" >Brands</NavLink>
              </li>
              {/* <li>
                <NavLink to="/cart" className="block py-2 px-3" >Cart</NavLink>
              </li> */}
              <li>
                <NavLink to="/wishlist" className="block py-2 px-3" >Wish List</NavLink>
              </li>
            </ul>
         </div>: null}
            <ul className="font-medium flex  p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-100 md:flex-row  rtl:space-x-reverse md:mt-0 md:border-0">
              <li>
                <a href="#" className="block py-2 px-3" aria-current="page"><i className="fa-brands fa-instagram"></i></a>
              </li>
             
              <li>
                <a href="#" className="block py-2 px-3" aria-current="page"><i className="fa-brands fa-facebook"></i></a>
              </li>
             
              <li>
                <a href="#" className="block py-2 px-3" aria-current="page"><i className="fa-brands fa-tiktok"></i></a>
              </li>
             
              <li>
                <a href="#" className="block py-2 px-3" ><i className="fa-brands fa-twitter"></i></a>
              </li>
              <li>
                <a href="#" className="block py-2 px-3" ><i className="fa-brands fa-linkedin"></i></a>
              </li>
              <li>
                <a href="#" className="block py-2 px-3" ><i className="fa-brands fa-youtube"></i></a>
              </li>
           
            
              {token ? <>
                <li className='relative'> <Link to={"/cart"}><i className='fas fa-cart-shopping block py-2 px-3 cursor-pointer text-green-500' aria-current="page"> </i></Link>
                <span className='absolute top-0 end-0 text-green-500 -translate-y-1'> {numOfCartItems}</span>
                 </li>
                <li><span onClick={logOut} className='cursor-pointer block py-2 px-3'>Logout</span></li>
              
              </> : <>
          <li><NavLink to="/login" className="block py-2 px-3" aria-current="page">Login</NavLink></li>
          <li><NavLink to="/register" className="block py-2 px-3" aria-current="page">Signin</NavLink></li>
             </> }
            </ul>

            
          </div>
        </div>
      </nav>


  </>
}


