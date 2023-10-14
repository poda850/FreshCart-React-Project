import React, { useContext, useState } from 'react'
// import Style from './Login.module.css';
import { useFormik } from 'formik';
import * as yup from 'yup'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BallTriangle } from 'react-loader-spinner'
import { TokenContext } from '../Context/TokenContext';
import { Helmet } from 'react-helmet'


export default function Login() {

  let navigate = useNavigate();
  const [error, seterror] = useState(null)
  const [isLoading, setIsLodaing] = useState(false)
  let { setUserToken } = useContext(TokenContext)

  async function loginSubmit(values) {
    seterror('')
    setIsLodaing(true)
    let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
      .catch((err) => {
        seterror(err.response.data.message)
        setIsLodaing(false)
      })
    if (data.message === "success") {
      localStorage.setItem('userToken', data.token)
      setUserToken(data.token)
      setIsLodaing(false)
      navigate('/')
    }
  }

  let validationSchema = yup.object({
    email: yup.string().email('email is invalid').required('email is required'),
    password: yup.string().required('password is required'),
  })

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: loginSubmit,
  })

  return (
    <>
              <Helmet>
        <meta charSet="utf-8" />
        <title>Login</title>
      </Helmet>
      <form onSubmit={formik.handleSubmit} >
        <div className="container text-center d-flex justify-content-center align-items-center flex-column shadow-lg mt-5 rounded-5">
          <h1 className="fw-bolder text-main my-3">
            <span> Login Now </span>
            <i className="fa-solid fa-award"></i>
          </h1>

          {error ? <div className='alert alert-danger mt-2 p-2 fw-bold w-100 rounded-2 text-danger w50'>{error}</div> : null}

          <div className="input-group mb-4 w-75">
            <span className="input-group-text"><i className="fa-solid fa-at"></i></span>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} name="email" type="email" className="form-control" placeholder="example@example.com" autoComplete="off" />
            {formik.errors.email && formik.touched.email ? <div className='alert alert-danger mt-2 p-2 fw-bold w-100 rounded-2 text-danger'>{formik.errors.email}</div> : null}
          </div>
          <div className="input-group mb-4 w-75">
            <span className="input-group-text"><i className="fa-solid fa-lock"></i></span>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} name="password" type="password" className="form-control" placeholder="Password" autoComplete="off" />
            {formik.errors.password && formik.touched.password ? <div className='alert alert-danger mt-2 p-2 fw-bold w-100 rounded-2 text-danger'>{formik.errors.password}</div> : null}
          </div>
          <div className="my-3">
            <span className='fw-bold'>Don't have an account?</span>
            <Link className="btn bg-main text-light shadow-sm ms-2" to={'/register'}>Register Now</Link>
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
          <button disabled={!(formik.isValid && formik.dirty)} className="btn btn-lg bg-main w-25 rounded-0 rounded-bottom-4 shadow-lg text-light mx-auto d-block " type='submit'>Login</button>}
      </form>
    </>
  )
}
