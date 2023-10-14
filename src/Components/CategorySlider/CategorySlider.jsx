import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function CategorySlider() {
  var settings = {
    dots: true,
    dotsClass: "slick-dots",
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2
  };

  function getCategories(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }
  let { data} = useQuery ("categorySlider", getCategories )
  let categories = data?.data.data
  return (
    <>
    {categories? <div className='py-4'> <Slider {...settings}> 
    
    {categories.map((category) => <img height={"200px"} key={category._id} className='w-100' src={category.image} alt='category'/> )}
    </Slider></div> : ''}
    </>
  )
}
