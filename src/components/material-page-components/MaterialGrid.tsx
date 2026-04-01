// components/materials/MaterialGrid.tsx
"use client";
import React from "react";
import { Material } from "@/types/material-types";
import { MaterialCard } from "./MaterialCard";

interface MaterialGridProps {
  materials: Material[];
  onQuickView: (material: Material) => void;
}

export const MaterialGrid: React.FC<MaterialGridProps> = ({
  materials,
  onQuickView,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {materials.map((material) => (
        <MaterialCard
          key={material.materialId}
          material={material}
          onQuickView={onQuickView}
        />
      ))}
    </div>
  );
};
