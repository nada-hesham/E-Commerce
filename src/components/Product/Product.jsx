import React from 'react'
import Display from '../Display/Display'
import { Helmet } from 'react-helmet'

export default function Product() {
  return <>
   <Helmet>
    <title> Product page</title>
  </Helmet>
 <div className='py-10'>
 <Display/>
 </div>
  </>
}
