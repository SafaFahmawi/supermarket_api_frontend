import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaLockOpen } from 'react-icons/fa';
import './ResetPassword.css';

function ResetPassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className='reset-container'>
      <div className='s1'></div>
      <div className='s2'></div>
      <div className='s3'></div>
      <div className='s4'></div>
      <div className='s5'></div>
      <div className='s6'></div>
      <div className='s7'></div>

      <div className='s8'></div>
      <div className='s9'></div>
      <div className='s10'></div>
      <div className='s11'></div>
      <div className='s12'></div>
      <div className='s13'></div>
      <div className='s14'></div>

      <div className='background-color'></div>

      <div className='circle-lock'>
        <FaLockOpen className='lock' />
      </div>

      <div className='resetpass-form'>
        <h3 className='h3'>Forgot Password</h3>
        <p style={{ fontSize: '12px', marginRight: '15px', marginLeft: '20px' , color: '#074533'}}>Please enter your email for the password reset process. We will send a reset link to your email.</p>
        <form onSubmit={handleSubmit}>
          <div className='formGroup'>
            <label className='lab-email'>Email:</label>
            <input className='input-email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button className='resetPassword' type='submit'>Reset Password</button>
        </form>
        <p className='back-par'>
          <Link className='back-link' to='/Login'>Back to Sign In</Link>
        </p>
      </div>
    </div>

  );
}

export default ResetPassword;