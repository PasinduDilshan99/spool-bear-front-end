"use client";
import React from "react";
import { MaterialCard } from "./MaterialCard";
import { MaterialGridProps } from "@/types/material-types";

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
