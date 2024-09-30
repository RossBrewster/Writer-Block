import React from 'react';

interface PlainCubeProps {
  color?: string;
}

const PlainCube: React.FC<PlainCubeProps> = ({ color = '#3498db' }) => {
  const cubeStyle = {
    width: '100px',
    height: '100px',
    position: 'relative',
    transformStyle: 'preserve-3d',
    transform: 'rotateX(-20deg) rotateY(45deg)',
  };

  const faceStyle = (translateZ: number) => ({
    position: 'absolute',
    width: '100%',
    height: '100%',
    background: color,
    border: `1px solid black`,
    opacity: 0.7,
    transform: `translateZ(${translateZ}px)`,
  });

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%',
    }}>
      <div style={cubeStyle as React.CSSProperties}>
        <div style={faceStyle(50) as React.CSSProperties}></div>
        <div style={{...faceStyle(-50), transform: 'rotateY(180deg) translateZ(50px)'} as React.CSSProperties}></div>
        <div style={{...faceStyle(50), transform: 'rotateY(90deg) translateZ(50px)'} as React.CSSProperties}></div>
        <div style={{...faceStyle(50), transform: 'rotateY(-90deg) translateZ(50px)'} as React.CSSProperties}></div>
        <div style={{...faceStyle(50), transform: 'rotateX(90deg) translateZ(50px)'} as React.CSSProperties}></div>
        <div style={{...faceStyle(50), transform: 'rotateX(-90deg) translateZ(50px)'} as React.CSSProperties}></div>
      </div>
    </div>
  );
};

export default PlainCube;