// components/material-details/MaterialSpecifications.tsx
"use client";
import React from "react";

interface MaterialSpecificationsProps {
  density: number;
  temperatureResistance: string;
  minLayerHeight: number;
  maxLayerHeight: number;
  finish: string;
}

export const MaterialSpecifications: React.FC<MaterialSpecificationsProps> = ({
  density,
  temperatureResistance,
  minLayerHeight,
  maxLayerHeight,
  finish,
}) => {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-3">
        Specifications
      </h2>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-lg p-3 border border-gray-200">
          <div className="text-xs text-gray-500 mb-1">Density</div>
          <div className="text-sm font-semibold text-gray-900">
            {density} g/cm³
          </div>
        </div>
        <div className="bg-white rounded-lg p-3 border border-gray-200">
          <div className="text-xs text-gray-500 mb-1">
            Temperature Resistance
          </div>
          <div className="text-sm font-semibold text-gray-900">
            {temperatureResistance}
          </div>
        </div>
        <div className="bg-white rounded-lg p-3 border border-gray-200">
          <div className="text-xs text-gray-500 mb-1">Layer Height Range</div>
          <div className="text-sm font-semibold text-gray-900">
            {minLayerHeight} - {maxLayerHeight} mm
          </div>
        </div>
        <div className="bg-white rounded-lg p-3 border border-gray-200">
          <div className="text-xs text-gray-500 mb-1">Finish</div>
          <div className="text-sm font-semibold text-gray-900">{finish}</div>
        </div>
      </div>
    </div>
  );
};
