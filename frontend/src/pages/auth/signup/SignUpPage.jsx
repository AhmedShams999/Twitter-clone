import React, { useState } from 'react'
import XSvg from '../../../components/svgs/X'

import { MdOutlineMail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";
import {Link} from "react-router-dom"

function SignUpPage() {
  const [formData, setFormData] = useState({
		email: "",
		username: "",
		fullName: "",
		password: "",
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);
	};

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

  const isPending = false;
	const isError = false;

  return (
    <div className='container'>
      <div className='container__illustration'>
        <XSvg className='illustration-icon' />
      </div>
      <div className='container__form-container'>
        <form className='container__form-container__form' onSubmit={handleSubmit}>
          <h1 className='container__form-container__form__firstHeader'>Happening now.</h1>
          <h1 className='container__form-container__form__secoendHeader'>Join today.</h1>
          <div className='container__form-container__form__inputs'>
              <label >
                <MdOutlineMail className='icon' />
                  <input 
                    type="text"   
                    placeholder='Email'
                    name='email'
                    onChange={handleInputChange}
                    value={formData.email}
                    />
              </label>
              <label >
                <FaUser className='icon' />
                  <input 
                    type="text"   
                    placeholder='Username'
                    name='username'
                    onChange={handleInputChange}
                    value={formData.username}
                    />
              </label>
              <label >
                <MdDriveFileRenameOutline className='icon' />
                  <input 
                    type="text"   
                    placeholder='Full Name'
                    name='fullName'
                    onChange={handleInputChange}
                    value={formData.fullName}
                    />
              </label>
              <label >
                <MdPassword className='icon' />
                  <input 
                    type="password"   
                    placeholder='Password'
                    name='password'
                    onChange={handleInputChange}
                    value={formData.password}
                    />
              </label>
              <button>
                {isPending ? "Loading..." : "Sign up"}
              </button>
              {/* {isError && <p className='error'>{error.message}</p>} */}
            </div>
        </form>
        <div className='container__form-container__signin'>
          <p className='container__form-container__signin__signin-text'>Already have an account?</p>
          <Link to='/login'>
            <button>Sign in</button>
          </Link>
        </div>
      </div>
  </div>
  
  )
}

export default SignUpPage
