import React from 'react'
// import Style from './MainSlider.module.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Simg1 from '../../Assets/images/slider-image-1.jpeg'
import Simg2 from '../../Assets/images/slider-image-2.jpeg'
import Simg3 from '../../Assets/images/slider-image-3.jpeg'
import blog1 from '../../Assets/images/blog-img-1.jpeg'
import blog2 from '../../Assets/images/blog-img-2.jpeg'


export default function MainSlider() {

  var settings = {
    dots: true,
    dotsClass: "slick-dots",
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <>

      <div className="row gx-0 mt-5 mb-3">
        <div className='col-md-10'>
          <Slider {...settings}>
            <img height={400} className='w-100' src={Simg1} alt="" />
            <img height={400} className='w-100' src={Simg2} alt="" />
            <img height={400} className='w-100' src={Simg3} alt="" />
          </Slider>
        </div>
        <div className="col-md-2">
          <img height={200} className='w-100' src={blog1} alt="" />
          <img height={200} className='w-100' src={blog2} alt="" />
        </div>
      </div >
    </>
  )
}
