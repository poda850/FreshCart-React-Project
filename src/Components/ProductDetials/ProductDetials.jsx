import axios from 'axios'
import React, { useContext } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { cartContext } from '../Context/CartContext'
import toast from 'react-hot-toast'
import { Helmet } from "react-helmet";

export default function ProductDetials() {

  let { addToCart } = useContext(cartContext)
  async function addProduct(id) {
    let response = await addToCart(id)
    if (response.data.status === 'success') {
      toast.success("product successfully added", {
        duration: 6000,
        position: 'top-center'
      })
    }
    else {
      toast.error("failed adding product", {
        duration: 4000,
        position: 'top-center'
      })
    }
  }

  let params = useParams()

  function getProuductDetails(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }


  let { data } = useQuery("productDetails", () => getProuductDetails(params.id))
  let productData = data?.data.data
  return (
    <>

      {productData ? <div className="row align-items-center mt-5">
        <Helmet>
          <meta charSet="utf-8" />
          <title>{productData.title.split(' ').slice(0, 3).join(' ')}</title>
        </Helmet>
        <div className="col-md-4">
          <img className='w-100' src={productData.imageCover} alt={productData.title} />
        </div>
        <div className="col-md-8">
          <h2 className='h5 fw-semibold'>{productData.title}</h2>
          <p className='text-muted'>{productData.description}</p>
          <h6 className='text-main'>{productData.category.name}</h6>
          <h6 className='fw-semibold' >{productData.price} EGP</h6>
          <div className='d-flex justify-content-between'>
            <span>Ratings Quantity :{productData.ratingsQuantity}</span>
            <span className='fw-semibold'><i className='fas fa-star rating-color'></i> {productData.ratingsAverage}</span>
          </div>
          <button onClick={() => addProduct(productData.id)} className='btn bg-main text-white w-100 btn-sm mt-2 fw-bold'>Add to cart <i className='fa-solid fa-cart-plus ms-3'></i></button>          </div>
      </div> : ''}

    </>
  )
}
