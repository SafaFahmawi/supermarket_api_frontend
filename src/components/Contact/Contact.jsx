import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarker, FaClock } from 'react-icons/fa';import './Contact.css';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  
  return (
    <div className='contact-container'>
      <div className='square1'></div>
      <div className='square2'></div>
      <div className='square3'></div>
      <div className='square4'></div>
      <div className='square5'></div>
      <div className='square6'></div> 
      <div className='square7'></div>

      <div className='contact-form'>
        <h2 className='head'>Contact Form</h2>
        <p className='par'>If you have any questions or inquiries, you can contact us by sending a message here</p>
        <form className='form' onSubmit={handleSubmit}>
          <label>
            <input
              type="text"
              value={name}
              placeholder='Enter your name'
              onChange={(e) => setName(e.target.value)}
              required />
          </label>
          <label>
            <input
              type="email"
              value={email}
              placeholder='Enter your email '
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            <textarea
              value={message}
              placeholder='message'
              onChange={(e) => setMessage(e.target.value)}
              rows="4"
              required
            ></textarea>
          </label>
          <button className='send-butt' type="submit">Send</button>
        </form>
      </div>

      <div className='rectangle-color'> </div>
      <div className='square'></div>

      <div className='contactUs-form'>
        <h2 className='h'>Contact Us</h2>
        <div className="company-details">
          <div className="info">
            <FaEnvelope />
            <p>Supermarket2024@gmail.com</p>
          </div>
          <div className="info">
            <FaPhone />
            <p>+970 587-362-114</p>
          </div>
          <div className="info">
            <FaMapMarker />
            <p>Palestine-Tulkerm</p>
          </div>
          <div className="info">
            <FaClock />
            <p>Working hours: 9 AM - 5 PM</p>
          </div>
        </div>
      </div>
    </div>

  );
}

export default ContactForm;