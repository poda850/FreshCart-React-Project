import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from '../Context/CartContext'
import { BallTriangle } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useQuery } from 'react-query'
import { Helmet } from 'react-helmet'

// import Style from './Cart.module.css';


export default function Cart() {
  
  let { getLoggedUserCart, deleteCartItem, updateCartProductQuantity, clearUserCart } = useContext(cartContext)
  let {isLoading} = useQuery ("getCart",getCartDetails,{ refetchInterval: 60000 } )

  const [cartDetails, setCartDetails] = useState([])
  const [response, setResponse] = useState()
  const [reqTimeOut, setReqTimeOut] = useState()
  const [erorrMassage, setErorrMassage] = useState('')

  async function getCartDetails() {
    let response = await getLoggedUserCart()
      if (response) {
        setCartDetails(response.data.data.products)
      setResponse(response.data)
      }
  }

  useEffect(() => {
    getCartDetails()
  }, [])


  async function removeItem(productId) {
    let response = await deleteCartItem(productId)
    if (response) {
      // duration: 2000,
      setCartDetails(response.data.data.products)
      setResponse(response.data)
    }
    if (response.data.status === 'success') {
      toast.success("Item successfully removed", {
        position: 'top-center'
      })
    }
    else {
      toast.error("failed updating cart", {
        duration: 4000,
        position: 'top-center'
      })
    }

  }

  function updateConut(productId, count, index) {
    let newCartDetials = [...cartDetails]
    newCartDetials[index].count = count
    setCartDetails(newCartDetials)
    clearTimeout(reqTimeOut)
    setReqTimeOut(
      setTimeout(async () => {
        let response = await updateCartProductQuantity(productId, count)
        if (response) {
          setCartDetails(response.data.data.products)
          setResponse(response.data)
        }
      }, 1000))
  }

  async function clearCart() {
    return await clearUserCart()
    // if (response)
    // setCartDetails([])  
  }

  // let x= useQuery ("getCart",getCartDetails )
  // console.log(x);

  return (
    <>
          <Helmet>
        <meta charSet="utf-8" />
        <title>Cart</title>
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
      </div>  : <div className='my-3 mx-auto p-3 bg-main-light'>
        <div className='d-flex justify-content-between align-items-center'>
          <div>
            <h3> Shopping Cart</h3>
            <h5 className=' text-main fw-bolder ps-2'> Cart Items: {response?.numOfCartItems} </h5>
            <h5 className='  text-main fw-bolder ps-2'> Total Cart Price: {response?.data.totalCartPrice} EGP</h5>
          </div>
          <button onClick={clearCart} className='btn btn-outline-danger mt-3'>Clear All Items</button>
        </div>
        <hr />
        {cartDetails.map((product, index) => <div key={product.product._id} className="row p-3 border-bottom">
          <Link className='col-md-1' to={`/productDetials/${product.product._id}`}>
            <img className='w-100' src={product.product.imageCover} alt={product.product.title} />
          </Link>
          <div className='col-md-11 d-flex justify-content-between align-items-center'>
            <div>
              <Link className='h6 fw-bolder' to={`/productDetials/${product.product._id}`}>
                {product.product.title.split(' ').slice(0, 3).join(' ')}
              </Link>
              <h6 className='text-main mt-2'>{product.price} EGP</h6>
              <h6 className='text-main mt-2 fw-semibold'>Total Price: {product.count * product.price} EGP</h6>
              <button onClick={() => removeItem(product.product.id)} className='border-0 cursor-pointer p-0'>
                <i className="fa-regular fa-trash-can text-danger"></i>
                <span> Remove </span>
              </button>
            </div>
            <div className='font-sm'>
              <span onClick={() => updateConut(product.product.id, product.count + 1, index)} className='btn brdr-main'>+</span>
              <span className='mx-3'>{product.count}</span>
              <button onClick={() => updateConut(product.product.id, product.count - 1, index)} className='btn brdr-main'>-</button>
            </div>
          </div>
        </div>)}
      </div>}
    </>
  )
}
