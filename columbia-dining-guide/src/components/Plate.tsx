import React, { useState } from 'react';

const CircleBorder: React.FC = () => {
  // State to manage the position of the smaller circle
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 200, y: 50 });

  // Calculate the position of the smaller circle along the border
  const calculatePositionOnBorder = (angle: number): { x: number; y: number } => {
    const radius = 150; // Radius of the larger circle
    const centerX = 200; // X coordinate of the center of the larger circle
    const centerY = 200; // Y coordinate of the center of the larger circle

    // Calculate the position of the smaller circle based on the angle
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    return { x, y };
  };

  // Mouse event handler for dragging the smaller circle along the border
  const handleMouseMove = (e: React.MouseEvent<SVGCircleElement>) => {
    // Calculate the angle of the mouse position relative to the center of the larger circle
    const centerX = 200; // X coordinate of the center of the larger circle
    const centerY = 200; // Y coordinate of the center of the larger circle
    const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);

    // Calculate the position of the smaller circle along the border based on the angle
    let newPosition = calculatePositionOnBorder(angle);

    // Adjust the angle to cover the full circle
    const pi2 = 2 * Math.PI;
    let adjustedAngle = angle < 0 ? pi2 + angle : angle; // Adjust negative angles

    // Update the position if the angle exceeds the range [0, 2π]
    if (adjustedAngle >= pi2) {
      adjustedAngle = 0;
    }

    newPosition = calculatePositionOnBorder(adjustedAngle);

    setPosition(newPosition);
  };

  return (
    <svg width="400" height="400">
      {/* Larger circle acting as the border */}
      <circle cx="200" cy="200" r="150" fill="none" stroke="black" strokeWidth="2" />

      {/* Smaller circle draggable along the border */}
      <circle
        cx={position.x}
        cy={position.y}
        r="10"
        fill="blue"
        onMouseMove={handleMouseMove}
        style={{ cursor: 'pointer' }}
      />
    </svg>
  );
};

export default CircleBorder;