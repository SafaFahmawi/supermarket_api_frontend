import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { SignUpUser } from '../../redux/authSlice';
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import './SignUp.css'; // Your CSS file

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alertType, setAlertType] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();

  const validateForm = () => {
    if (password.length < 8 || !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&*])/.test(password)) {
      showAlert('error', 'Password must be strong (8 characters: contain digit, lowercase and uppercase letter, and special character.');
      return false;
    }

    if (password !== confirmPassword) {
      showAlert('error', "Passwords don't match");
      return false;
    }

    return true;
  };

  const showAlert = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);

    setTimeout(() => {
      setAlertType(null);
      setAlertMessage('');
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        dispatch(SignUpUser({ username, email, password, confirmPassword }));
        showAlert('success', 'Sign-up successful!');
      } catch (error) {
        showAlert('error', `Sign-up failed: ${error.message}`);
      }
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="signup-container">
      {alertType && (
        <div className={`alert ${alertType}`}>
          {alertMessage}
        </div>
      )}

      <div className='circle1'></div>
      <div className='circle2'></div>
      <div className='circle3'></div>

      <div className='circle4'></div>
      <div className='circle5'></div>
      <div className='circle6'></div>

      <div className="signupp">
        <FaUser className='iconuser' style={{ fontSize: 40, paddingTop: 0, color: '#afdebae5' }} />
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <FaUser className="icon" />
            <input className='input'
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <FaEnvelope className="icon" />
            <input className='input'
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <FaLock className="icon" />
            <input className='input'
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="eye-icon" onClick={handleTogglePassword}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          <div className="input-group">
            <FaLock className="icon" />
            <input className='input'
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <div className="eye-icon2" onClick={handleToggleConfirmPassword}>
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          
            <button className="signup-butt" type="submit">Sign Up</button>
          
        </form>
      </div>
    </div>
  );
};

export default SignUp;