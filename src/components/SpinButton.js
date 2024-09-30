import React from 'react';
import '../css/SpinButton.css'

function SpinButton({ spinReels, disabled }) {
  return (
    <button onClick={spinReels} disabled={disabled}>
      {disabled ? 'Spinning...' : 'Spin'}
    </button>
  );
}

export default SpinButton;
