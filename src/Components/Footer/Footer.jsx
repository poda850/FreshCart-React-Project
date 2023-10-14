import React from 'react'

import amazonPay from '../../Assets/images/amazonPay.png'
import masterCard from '../../Assets/images/MasterCard_Logo.svg.png'
import payPal from '../../Assets/images/png-transparent-paypal-logo-text-line-blue.png'
import app from '../../Assets/images/App-store.png'
import android from '../../Assets/images/Google-play.webp'
// import Style from './Footer.module.css';
export default function Footer() {
  return (
    <>
      <div className='bg-body-tertiary mt-5'>
        <div className="container py-4">
          <div>
            <h2>Get the FreshCart app</h2>
            <p className='text-muted font-sm'>we will send you a link, open it in your phone to download the app</p>
          </div>
          <div className='row gx-3'>
            <div className="col-md-10">
              <input type="email" className='form-control' placeholder='Email..' />
            </div>
            <div className='col-md-2'>
              <button className=' btn bg-main text-white px-4'>Share App Link</button>
            </div>
          </div>
          <div className=' d-flex justify-content-between align-items-center flex-wrap my-4 border-top border-bottom py-4 mb-5'>
            <div className=''>
              <span className='h5'>Payment Partners</span>
              <img width={40} className='mx-2' src={amazonPay} alt="amazonPay" />
              <img width={40} className='mx-2' src={masterCard} alt="masterCard" />
              <img width={40} className='mx-2' src={payPal} alt="payPal" />
            </div>
            <div className=''>
              <span className='h5'>Get Deliveries with FreshCart</span>
              <img width={150} className='mx-1' src={app} alt="app" />
              <img width={150} className='mx-1' src={android} alt="android" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
