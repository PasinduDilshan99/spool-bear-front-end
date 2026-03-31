// components/material-details/MaterialProperties.tsx
"use client";
import React from "react";
import { MaterialProperty } from "@/types/material-types";

interface MaterialPropertiesProps {
  properties: MaterialProperty[];
}

export const MaterialProperties: React.FC<MaterialPropertiesProps> = ({
  properties,
}) => {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-3">
        Technical Properties
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {properties.map((prop, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-3 border border-gray-200"
          >
            <div className="text-xs text-gray-500 mb-1">
              {prop.propertyName}
            </div>
            <div className="text-sm font-semibold text-gray-900">
              {prop.propertyValue}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
