
import React, { useContext, useState } from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BallTriangle } from 'react-loader-spinner'
import { TokenContext } from '../Context/TokenContext';
import { Helmet } from 'react-helmet'


export default function UpdateLoggedUserPassword() {

  let headers = {
    token: localStorage.getItem('userToken')
  }
  let navigate = useNavigate();
  const [error, seterror] = useState(null)
  const [isLoading, setIsLodaing] = useState(false)
  // let { headers } = useContext(TokenContext)

  async function updateUserPassword(values) {
    seterror('')
    setIsLodaing(true)
    let response = await axios.put('https://ecommerce.routemisr.com/api/v1/users/changeMyPassword', values, { headers })
      .catch((err) => {
        console.log(err);
        seterror(err.response.data.message)
        setIsLodaing(false)
      })
    console.log(response);
    if (response.data.message === "success") {
      console.log(response);
      setIsLodaing(false)
      navigate('/login')
    }
  }

  let passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  let validationSchema = yup.object({
    currentPassword: yup.string().required('password is required'),
    password:  yup.string().matches(passRegex).required('password is required'),
    rePassword: yup.string().oneOf([yup.ref('password')], "password and rePassword doesn't match").required('rePassword is required'),
  })

  let formik = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      rePassword: ""
    },
    validationSchema,
    onSubmit: updateUserPassword,
  })

  return (
    <> {error ? <div>true</div> : ''}
      <Helmet>
        <meta charSet="utf-8" />
        <title>Update User Password</title>
      </Helmet>
      <form onSubmit={formik.handleSubmit} >
        <div className="container text-center d-flex justify-content-center align-items-center flex-column shadow-lg mt-5 rounded-5">
          <h4 className="fw-bolder text-main my-3">
            <span>Update User Password</span>
          </h4>

          {error ? <div className='alert alert-danger mt-2 p-2 fw-bold w-100 rounded-2 text-danger w50'>{error}</div> : null}
          <div className="input-group mb-4 w-75">
            <span className="input-group-text"><i className="fa-solid fa-lock"></i></span>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.currentPassword} name="currentPassword" type="password" className="form-control" placeholder="Current Password" autoComplete="off" />
            {formik.errors.currentPassword && formik.touched.currentPassword ? <div className='alert alert-danger mt-2 p-2 fw-bold w-100 rounded-2 text-danger'>{formik.errors.currentPassword}</div> : null}
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
