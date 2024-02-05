
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Logout({ setUsername }) {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUsername(''); // Reset the username state to an empty string
    navigate('/Login', { replace: true });
  }

  return (
    <button onClick={handleLogout}
      style={{
        background: 'rgb(107, 156, 55)',
        width: '15%',
        marginTop: '0px',
        marginRight: '30px',
        marginLeft: '15px',
        height: '35px',
        color: 'white',
        borderRadius: '5px',
        fontSize: '13.5px',
      }}
      onMouseOver={(e) => (e.target.style.backgroundColor = 'rgb(61, 163, 126)')}
      onMouseOut={(e) => (e.target.style.backgroundColor = 'rgb(107, 156, 55)')}
    >
      Logout
    </button>
  );
}

export default Logout;

