import React from 'react';
import PlainCube from './Cube';

const BuildingBlockCubes: React.FC = () => {
  const colors = ['#EB56C6', '#F46A21', '#FFB000', '#03C159', '#9DCA16', '#29BEFD', '#04CBC0'];

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    width: '450px',
    height: '400px',
    margin: '50px auto',
  };

  const cubeStyle = (x: number, y: number, z: number): React.CSSProperties => ({
    position: 'absolute',
    left: `${x}px`,
    top: `${y}px`,
    zIndex: z,
    transition: 'transform 0.3s ease-in-out',
    cursor: 'pointer',
  });

  const cubePositions = [
    { x: 150, y: 200, z: 1 },
    { x: 50, y: 200, z: 2 },
    { x: 250, y: 200, z: 2 },
    { x: 100, y: 100, z: 3 },
    { x: 200, y: 100, z: 3 },
    { x: 50, y: 0, z: 4 },
    { x: 150, y: 0, z: 4 },
  ];

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'scale(1.1) translateY(-10px)';
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'scale(1) translateY(0)';
  };

  return (
    <div style={containerStyle}>
      {colors.map((color, index) => (
        <div
          key={index}
          style={cubeStyle(cubePositions[index].x, cubePositions[index].y, cubePositions[index].z)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <PlainCube color={color} />
        </div>
      ))}
    </div>
  );
};

export default BuildingBlockCubes;