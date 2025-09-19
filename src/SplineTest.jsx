// src/SplineTest.jsx
import React from 'react';
import Spline from '@splinetool/react-spline';

export default function SplineTest() {
  const sceneUrl = "https://prod.spline.design/8vDQg68MMG2BAdkH/scene.splinecode"; // your scene

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ marginBottom: 12 }}>Spline Quick Test</h2>

      <div
        style={{
          width: 800,
          height: 520,
          borderRadius: 12,
          overflow: 'hidden',
          boxShadow: '0 12px 40px rgba(0,0,0,0.18)',
          position: 'relative',
          zIndex: 99999,
          background: '#fff'
        }}
      >
        <Spline scene={sceneUrl} />
      </div>

      <p style={{ marginTop: 12, color: '#666' }}>
        If blank: open DevTools → Console & Network and copy any errors here.
      </p>
    </div>
  );
}
