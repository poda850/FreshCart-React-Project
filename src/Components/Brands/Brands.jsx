import axios from 'axios'
import React from 'react'
import { BallTriangle } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

export default function FeaturedProducts() {

  function getBrands(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
  }
  let { data , isLoading} = useQuery ("getBrands", getBrands )
  let brands = data?.data.data

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Brands</title>
      </Helmet>

      {isLoading ? <div className='position-relative'>
        <div className=' w-100 py-5 postion-absolute bottom-0 start-0 end-0 top-0 z-3 d-flex justify-content-center align-items-center bg-white text-main vh-100'>
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
            wrapperClass={{}}
            wrapperStyle=""
            visible={true}
          />
        </div>
      </div> : <div className=' py-2 text-center'>
        <h2 className='mt-2 fw-bolder text-main'>Brands</h2>
        <div className="row">
          {brands.map((brand) => <div key={brand._id} className='product col-md-2 p-3 '>
            <Link className='cursor-pointer py-3 px-2 ' to={`/brandDetials/${brand._id}`}>
              <img  className='w-100' src={brand.image} alt={brand.name} />
            </Link>
          </div>)}
        </div>
      </div>}
    </>
  )
}

