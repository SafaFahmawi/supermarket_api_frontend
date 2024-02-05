import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/authSlice';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import './Login.css';

function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
      dispatch(loginUser({ email, password }));
    };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">

      <div className='circle1'></div>
      <div className='circle2'></div>
      <div className='circle3'></div>

      <div className='circle4'></div>
      <div className='circle5'></div>
      <div className='circle6'></div>

      <div className="loginn">
      <FaUser className='iconuser' style={{fontSize: 40, marginTop:'-10px', color: '#afdebae5', marginLeft: 25}}/>
          <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="icon1">
              <FaEnvelope />
            </label>
            <input className='input'
              type="email"
              id="email"
              value={email}
              placeholder='Enter Email'
              onChange={(e) => setEmail(e.target.value)} 
              required />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="icon1">
              <FaLock />
            </label>
            <input className='input'
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder='Enter Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required />

            <div className="eye-icon1" onClick={handleTogglePassword}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          <div className='but'>
            <button type="submit">Login</button>
            <div className='lab'>
              <label >Don't have an account?</label>
            </div>
            <Link to="/Signup">
              <button>Create account</button>
            </Link>
            <Link className='reset-link' to="/ResetPassword">
                Forgot Password?
              </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LogIn;