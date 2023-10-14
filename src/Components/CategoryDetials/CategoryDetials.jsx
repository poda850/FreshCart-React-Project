import axios from 'axios'
import React, { useContext } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { cartContext } from '../Context/CartContext'
import toast from 'react-hot-toast'
import { Helmet } from "react-helmet";

export default function ProductDetials() {

 

  let params = useParams()
  function getCategoryDetails(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
  }


  let { data } = useQuery("categoryDetails", () => getCategoryDetails(params.id))
  let categoryDetials = data?.data.data
  return (
    <>

      {categoryDetials ? <div className="row align-items-center mt-5">
        <Helmet>
          <meta charSet="utf-8" />
          <title>{categoryDetials.name}</title>
        </Helmet>
        <div className="col-md-4">
          <img className='w-100 rounded-5' src={categoryDetials.image} alt={categoryDetials.name} />
        </div>
        <div className="col-md-8">
          <h2 className='h5 fw-semibold mt-4'>{categoryDetials.name}</h2>
          <h6 className='text-main mt-4'>{categoryDetials.slug}</h6>
          <h6 className='fw-semibold mt-4' >Created At: {categoryDetials.createdAt.split('').slice(0,10)}</h6>
          <h6 className='fw-semibold mt-4' >Updated At: {categoryDetials.updatedAt.split('').slice(0,10)}</h6>
          </div>
      </div> : ''}

    </>
  )
}
