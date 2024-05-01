import { CSSProperties } from 'react';
import { bnpLogo } from '../assets';

const footerStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '2rem 5rem',
  backgroundColor: '#e3e9f4',
  width: '100%',
};

const leftBlockStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
};

const Footer = () => {
  return (
    <div style={footerStyle}>
      <div style={leftBlockStyle}>
        <img
          src={bnpLogo}
          alt="Logo"
          style={{ width: '100%', height: '40px' }}
        />
      </div>
      <div>
        <div>Version : 1.0.0 @BNP Paribas - 2024</div>
      </div>
    </div>
  );
};

export default Footer;
