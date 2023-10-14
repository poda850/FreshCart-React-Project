import React, { useState } from 'react'
// import Style from './Login.module.css';
import { useFormik } from 'formik';
import * as yup from 'yup'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BallTriangle } from 'react-loader-spinner'
import { Helmet } from 'react-helmet'


export default function ResetPassword() {

  let navigate = useNavigate();
  const [error, seterror] = useState(null)
  const [isLoading, setIsLodaing] = useState(false)

  async function restPassword(values) {
    seterror('')
    setIsLodaing(true)
    let response = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', values)
      .catch((err) => {
        seterror(err.response.data.message)
        setIsLodaing(false)
      })
    if (response.data.statusMsg !== "fail") {
      setIsLodaing(false)
      localStorage.removeItem('userToken')
      navigate('/login')
    }
  }

  let passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  let validationSchema = yup.object({
    email: yup.string().email('email is invalid').required('email is required'),
    newPassword: yup.string().matches(passRegex).required('password is required'),
  })

  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: restPassword,
  })

  return (
    <> {error ? <div>true</div> : ''}
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login</title>
      </Helmet>
      <form onSubmit={formik.handleSubmit} >
        <div className="container text-center d-flex justify-content-center align-items-center flex-column shadow-lg mt-5 rounded-5">
          <h1 className="fw-bolder text-main my-3">
            <span> Reset Password </span>
          </h1>

          {error ? <div className='alert alert-danger mt-2 p-2 fw-bold w-100 rounded-2 text-danger w50'>{error}</div> : null}

          <div className="input-group mb-4 w-75">
            <span className="input-group-text"><i className="fa-solid fa-at"></i></span>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} name="email" type="email" className="form-control" placeholder="Enter your email" autoComplete="off" />
            {formik.errors.email && formik.touched.email ? <div className='alert alert-danger mt-2 p-2 fw-bold w-100 rounded-2 text-danger'>{formik.errors.email}</div> : null}
          </div>
          <div className="input-group mb-5 w-75">
            <span className="input-group-text"><i className="fa-solid fa-lock"></i></span>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.newPassword} name="newPassword" type="password" className="form-control" placeholder="Enter a new Password" autoComplete="off" />
            {formik.errors.newPassword && formik.touched.newPassword ? <div className='alert alert-danger mt-2 p-2 fw-bold w-100 rounded-2 text-danger'>
              <ul className="fw-bolder text-danger my-3 text-start">
                <li>Password must not contain Whitespaces.</li>
                <li>Password must have at least one Uppercase Character.</li>
                <li>Password must have at least one Lowercase Character.</li>
                <li>Password must contain at least one Digit.</li>
                <li>Password must contain at least one Special Symbol.</li>
                <li>Password must be 6-32 Characters Long.</li>
              </ul></div> : null}
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
          <button disabled={!(formik.isValid && formik.dirty)} className="btn btn-lg bg-main w-25 rounded-0 rounded-bottom-4 shadow-lg text-light mx-auto d-block " type='submit'>Reset</button>}
      </form>
    </>
  )
}

