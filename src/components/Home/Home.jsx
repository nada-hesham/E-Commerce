import React from 'react'
import Display from '../Display/Display.jsx'
import Categories from '../Categories/Categories.jsx'
import MainSlider from '../MainSlider/MainSlider.jsx'
import { Helmet } from 'react-helmet'
export default function Home() {
  return <>
   <Helmet>
    <title> Home page</title>
  </Helmet>
  <MainSlider/>
  <Categories/>
  <Display/>
  </>
}
