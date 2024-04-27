"use client";
import React, { useEffect, useState } from "react";
import "./Plate.css";

interface PlateProps {
  slice1Percentage: number;
  slice2Percentage: number;
  slice3Percentage: number;
}

const Plate: React.FC<PlateProps> = ({
  slice1Percentage,
  slice2Percentage,
  slice3Percentage,
}) => {
  const [slice1Angle, setSlice1Angle] = useState(0);
  const [slice2Angle, setSlice2Angle] = useState(0);
  const [slice3Angle, setSlice3Angle] = useState(0);

  useEffect(() => {
    const totalPercentage = slice1Percentage + slice2Percentage + slice3Percentage;
    const slice1Angle = (slice1Percentage / totalPercentage) * 360;
    const slice2Angle = (slice2Percentage / totalPercentage) * 360;
    const slice3Angle = (slice3Percentage / totalPercentage) * 360;

    setSlice1Angle(slice1Angle);
    setSlice2Angle(slice2Angle);
    setSlice3Angle(slice3Angle);
  }, [slice1Percentage, slice2Percentage, slice3Percentage]);

  return (
    <div className="pie-chart">
      <div
        className="slice"
        style={{ transform: `rotate(${slice1Angle}deg)`, backgroundColor: "red" }}
      ></div>
      <div
        className="slice"
        style={{ transform: `rotate(${slice2Angle}deg)`, backgroundColor: "green" }}
      ></div>
      <div
        className="slice"
        style={{ transform: `rotate(${slice3Angle}deg)`, backgroundColor: "blue" }}
      ></div>
    </div>
  );
};

export default Plate;
