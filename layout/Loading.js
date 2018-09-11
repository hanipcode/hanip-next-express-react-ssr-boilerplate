import React from 'react';

export default ({ isVisible = false }) => (
  <div
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      background: 'rgba(0, 0, 0, 0.2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000,
      transition: '1s all',
      opacity: isVisible ? 1 : 0,
      pointerEvents: 'none',
    }}
  >
    <div className="preloader-wrapper big active">
      <div className="spinner-layer spinner-yellow-only">
        <div className="circle-clipper left">
          <div className="circle" />
        </div>
        <div className="gap-patch">
          <div className="circle" />
        </div>
        <div className="circle-clipper right">
          <div className="circle" />
        </div>
      </div>
    </div>
  </div>
);
