import { CSSProperties } from 'react';

const footerStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 20px',
  backgroundColor: '#e3e9f4',
  width: '100%',
};

const Footer = () => {
  return (
    <div style={footerStyle}>
      <div>
        <p>Element 1</p>
        <p>Element 2</p>
      </div>
      <div>
        <p>Element 3 (right)</p>
      </div>
    </div>
  );
};

export default Footer;
