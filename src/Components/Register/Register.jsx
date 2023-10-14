import React, { useState } from 'react'
// import Style from './Register.module.css';
import { useFormik } from 'formik';
import * as yup from 'yup'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Bars } from 'react-loader-spinner'
import { Helmet } from 'react-helmet';



export default function Register() {

  let navigate = useNavigate();
  const [error, seterror] = useState(null)
  const [isLoading, setIsLodaing] = useState(false)

  async function registerSubmit(values) {
    seterror('')
    setIsLodaing(true)
    let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
      .catch((err) => {
        seterror(err.response.data.message)
        setIsLodaing(false)
      })
    if (data.message === "success") {
      setIsLodaing(false)
      navigate('/login')
    }
  }


  let phoneRegex = /^01[0125][0-9]{8}$/;
  let passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  let validationSchema = yup.object({
    name: yup.string().min(3, 'The name must contain at least 3 characters').max(16, 'The name must not contain more than 16 characters').required('The Name is required'),
    email: yup.string().email('email is invalid').required('email is required'),
    password: yup.string().matches(passRegex).required('password is required'),
    rePassword: yup.string().oneOf([yup.ref('password')], "password and rePassword doesn't match").required('rePassword is required'),
    phone: yup.string().matches(phoneRegex, 'phone is invalid'),
  })

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: registerSubmit,
  })

  return (
    <>
                  <Helmet>
        <meta charSet="utf-8" />
        <title>Register Now !!</title>
      </Helmet>
      <form onSubmit={formik.handleSubmit} >
        <div className="container text-center d-flex justify-content-center align-items-center flex-column shadow-lg mt-5 rounded-5">
          <h1 className="fw-bolder text-main my-3">
            <span> Register Now </span>
            <i className="fa-solid fa-award"></i>
          </h1>

          {error ? <div className='alert alert-danger mt-2 p-2 fw-bold w-100 rounded-2 text-danger w50'>{error}</div> : null}

          <div className="input-group my-3 w-75">
            <span className="input-group-text"><i className="fa-solid fa-user"></i></span>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} name="name" type="text" className="form-control" placeholder="Name" autoComplete="off" />
            {formik.errors.name && formik.touched.name ? <div className='alert alert-danger mt-2 p-2 fw-bold w-100 rounded-2 text-danger'>{formik.errors.name}</div> : null}
          </div>
          <div className="input-group mb-4 w-75">
            <span className="input-group-text"><i className="fa-solid fa-at"></i></span>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} name="email" type="email" className="form-control" placeholder="example@example.com" autoComplete="off" />
            {formik.errors.email && formik.touched.email ? <div className='alert alert-danger mt-2 p-2 fw-bold w-100 rounded-2 text-danger'>{formik.errors.email}</div> : null}
          </div>
          <div className="input-group mb-4 w-75">
            <span className="input-group-text"><i className="fa-solid fa-lock"></i></span>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} name="password" type="password" className="form-control" placeholder="Password" autoComplete="off" />
            {formik.errors.password && formik.touched.password ? <div className='alert alert-danger mt-2 p-2 fw-bold w-100 rounded-2 text-danger'>
              <ul className="fw-bolder text-danger my-3 text-start">
                <li>Password must not contain Whitespaces.</li>
                <li>Password must have at least one Uppercase Character.</li>
                <li>Password must have at least one Lowercase Character.</li>
                <li>Password must contain at least one Digit.</li>
                <li>Password must contain at least one Special Symbol.</li>
                <li>Password must be 6-32 Characters Long.</li>
              </ul></div> : null}
          </div>
          <div className="input-group mb-4 w-75">
            <span className="input-group-text"><i className="fa-solid fa-clipboard-check"></i></span>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} name="rePassword" type="password" className="form-control" placeholder="Confirm Password" autoComplete="off" />
            {formik.errors.rePassword && formik.touched.rePassword ? <div className='alert alert-danger mt-2 p-2 fw-bold w-100 rounded-2 text-danger'>{formik.errors.rePassword}</div> : null}
          </div>
          <div className="input-group mb-4 w-75">
            <span className="input-group-text"><i className="fa-solid fa-phone"></i></span>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} name="phone" type="tel" className="form-control" placeholder="Phone Number" autoComplete="off" />
            {formik.errors.phone && formik.touched.phone ? <div className='alert alert-danger mt-2 p-2 fw-bold w-100 rounded-2 text-danger'>{formik.errors.phone}</div> : null}
          </div>
          <div className="my-3">
            <span className='fw-bold'>You have an account?</span>
            <Link className="btn bg-main text-light shadow-sm ms-2" to={'/login'}>Login in</Link>
          </div>
        </div>
        {isLoading ?
          <button disabled className="btn btn-lg bg-main w-25 rounded-0 rounded-bottom-4 shadow-lg text-light mx-auto d-block d-flex justify-content-center" type='button'>
            <Bars
              height="40"
              width="80"
              color="#FFF"
              ariaLabel="bars-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            /></button>
          :
          <button disabled={!(formik.isValid && formik.dirty)} className="btn btn-lg bg-main w-25 rounded-0 rounded-bottom-4 shadow-lg text-light mx-auto d-block " type='submit'>Register</button>}
      </form>
    </>
  )
}
