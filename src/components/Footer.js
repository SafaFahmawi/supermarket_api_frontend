import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer style={{ padding: '10px', textAlign: 'center', margin: '0', width: '100%' ,marginTop: '20px'}}>
      <div>{`Copyright © ${year} Supermarket Site`}</div>
    </footer>
  );
};

export default Footer;