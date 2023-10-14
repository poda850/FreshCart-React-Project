import axios from 'axios'
import React, { useContext } from 'react'
import { BallTriangle } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { cartContext } from '../Context/CartContext'
import toast from 'react-hot-toast'
import { Helmet } from 'react-helmet'

// import Style from './FeaturedProducts.module.css';


export default function FeaturedProducts() {

  let { addToCart } = useContext(cartContext)

  async function addProduct(productId) {
    let response = await addToCart(productId);
    if (response.data.status === 'success') {
      toast.success("product successfully added", {
        duration: 2000,
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

  function getFeaturedProducts() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products')
  }

  let { data, isLoading } = useQuery("featuredProducts", getFeaturedProducts, { refetchInterval: 30000 })

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>All products</title>
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
        <h2 className='mt-2 fw-bolder text-main'>Featured Products</h2>
        <div className="row">
          {data?.data.data.map((product) => <div key={product.id} className='product col-md-2 p-3 '>
            <Link className='cursor-pointer py-3 px-2' to={`/productDetials/${product.id}`}>
              <img className='w-100' src={product.imageCover} alt={product.title} />
              <span className='text-main font-sm fw-bold'>{product.category.name}</span>
              <h3 className='h6 mt-3 fw-bold'>{product.title.split(' ').slice(0, 2).join(' ')}</h3>
              <div className='d-flex justify-content-between mt-3 fw-semibold'>
                <span className='fw-semibold'>{product.price} EGP</span>
                <span> <i className='fas fa-star rating-color'></i> {product.ratingsAverage}</span>
              </div>
            </Link>
            <button onClick={() => addProduct(product.id)} className='btn bg-main text-white w-100 btn-sm mt-2 fw-bold'>Add to cart  <i className='fa-solid fa-cart-plus ms-3'></i></button>
          </div>
          )
          }
        </div>
      </div>}



    </>
  )
}
