import React, { useContext, useState } from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BallTriangle } from 'react-loader-spinner'
import { TokenContext } from '../Context/TokenContext';
import { Helmet } from 'react-helmet'


export default function VerifyResetCode() {

  let navigate = useNavigate();
  const [error, seterror] = useState(null)
  const [isLoading, setIsLodaing] = useState(false)
  let { setUserToken } = useContext(TokenContext)

  async function verifyCode(values) {
    seterror('')
    setIsLodaing(true)
    let response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', values)
      .catch((err) => {
        seterror(err.response.data.message)
        setIsLodaing(false)
      })
      console.log(response);

    if (response.data.status === "Success") {
      console.log(response);
      setIsLodaing(false)
      navigate('/resetPassword')
    }
  }

  let validationSchema = yup.object({
    resetCode: yup.number().required('Code is required').typeError('Reset Code must be a number'),
  })

  let formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema,
    onSubmit: verifyCode,
  })

  return (
    <>
              <Helmet>
        <meta charSet="utf-8" />
        <title>Verify Reset Code</title>
      </Helmet>
      <form onSubmit={formik.handleSubmit} >
        <div className="container text-center d-flex justify-content-center align-items-center flex-column shadow-lg mt-5 rounded-5">
          <h4 className="fw-bolder text-main my-3">
          Reset code sent to your email... Enter the code to reset
          </h4>
          {error ? <div className='alert alert-danger mt-2 p-2 fw-bold w-100 rounded-2 text-danger w50'>{error}</div> : null}
          <div className="input-group mb-5 w-75">
            <span className="input-group-text"><i className="fa-solid fa-check-double"></i></span>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.resetCode} name="resetCode" type="text" className="form-control" placeholder="Enter the code here" autoComplete="off" />
            {formik.errors.resetCode && formik.touched.resetCode ? <div className='alert alert-danger mt-2 p-2 fw-bold w-100 rounded-2 text-danger'>{formik.errors.resetCode}</div> : null}
          </div>
        </div>
        {isLoading ?
          <button disabled className="btn btn-lg bg-main w-25 rounded-0 rounded-bottom-4 shadow-lg text-light mx-auto d-block d-flex justify-content-center" type='button'>
            <BallTriangle
              height={40}
              width={80}
              radius={5}
              color="#fff"
              ariaLabel="ball-triangle-loading"
              wrapperClass={{}}
              wrapperStyle=""
              visible={true}
            /></button>
          :
          <button disabled={!(formik.isValid && formik.dirty)} className="btn btn-lg bg-main w-25 rounded-0 rounded-bottom-4 shadow-lg text-light mx-auto d-block " type='submit'>Send Code</button>}
      </form>
    </>
    
  )
}
