import React from 'react'
// import Style from './NotFound.module.css';
import errorImage from '../../Assets/images/error.svg'
export default function NotFound() {
  return (
    <>
    <div className='d-flex justify-content-center align-items-center mt-5'>
        <img className='w-50 mt-5' src={errorImage} alt="Error Image" />
    </div>
    </>
  )
}
