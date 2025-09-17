import React from 'react';

const FormGroup = ({ children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
    {children}
  </div>
);

export default FormGroup;
