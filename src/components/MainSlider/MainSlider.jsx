import React from 'react'
import img1 from "../../assets/img1.jpeg"
import img2 from "../../assets/img2.jpeg"
import img3 from "../../assets/img3.jpeg"
import img4 from "../../assets/img4.jpeg"
import img5 from "../../assets/img5.jpeg"
import img1slider from "../../assets/img1 slider.jpeg"
import img2slider from "../../assets/img2 slider.jpeg"
import img3slider from "../../assets/img3 slider.jpeg"
import Slider from 'react-slick'

export default function MainSlider() {

  
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return <>
  <div className='grid grid-cols-[2fr_1fr] '>
    <div className='overflow-hidden'>
    <Slider {...settings} className='my-10'>
      <div>
      <img src={img1} alt=""  className='w-full h-[400px]'/>
      </div>
     <div>
     <img src={img1slider} alt=""  className='w-full h-[400px]'/>
     </div>
     <div>
     <img src={img2slider} alt=""  className='w-full h-[400px]'/>
      </div> 
     <div>
     <img src={img5} alt=""  className='w-full h-[400px]'/>
      </div> 
     
    </Slider>
    </div>
    <div className='my-10 '>
      <img src={img2} alt="" className='h-[200px] w-full'/>
      <img src={img3} alt="" className='h-[200px] w-full' />
    </div>

  </div>
  </>
}
