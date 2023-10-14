import axios from 'axios'
import React, { useContext } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { cartContext } from '../Context/CartContext'
import toast from 'react-hot-toast'
import { Helmet } from "react-helmet";

export default function ProductDetials() {

 

  let params = useParams()
  function getBrandDetails(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
  }


  let { data } = useQuery("brandDetails", () => getBrandDetails(params.id))
  let brandDetails = data?.data.data
  return (
    <>

      {brandDetails ? <div className="row align-items-center mt-5">
        <Helmet>
          <meta charSet="utf-8" />
          <title>{brandDetails.name}</title>
        </Helmet>
        <div className="col-md-4">
          <img className='w-100 rounded-5' src={brandDetails.image} alt={brandDetails.name} />
        </div>
        <div className="col-md-8">
          <h2 className='h5 fw-semibold mt-4'>{brandDetails.name}</h2>
          <h6 className='text-main mt-4'>{brandDetails.slug}</h6>
          <h6 className='fw-semibold mt-4' >Created At: {brandDetails.createdAt.split('').slice(0,10)}</h6>
          <h6 className='fw-semibold mt-4' >Updated At: {brandDetails.updatedAt.split('').slice(0,10)}</h6>
          </div>
      </div> : ''}

    </>
  )
}
