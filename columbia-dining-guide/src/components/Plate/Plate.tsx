import React, { useState } from 'react';
import "./Plate.css"


export default function Plate() {

  return (
    <div>
      <div id="circle">
        <div id="percent50-segment">
          50%
        </div>

        <div id="percent20-segment">
          20%
        </div>

        <div id="percent30-segment">
          30%
        </div>
      </div>
    </div>
  );
};
