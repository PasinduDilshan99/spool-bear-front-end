// app/materials/[materialId]/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { MaterialService } from "@/service/materialService";
import { Material } from "@/types/material-types";
import { MaterialDetailsError } from "@/components/material-details-page-components/MaterialDetailsError";
import { MaterialDetailsSkeleton } from "@/components/material-details-page-components/MaterialDetailsSkeleton";
import { MaterialImageGallery } from "@/components/material-details-page-components/MaterialImageGallery";
import { MaterialInfo } from "@/components/material-details-page-components/MaterialInfo";
import { MaterialSpecifications } from "@/components/material-details-page-components/MaterialSpecifications";
import { MaterialProperties } from "@/components/material-details-page-components/MaterialProperties";
import { MaterialTags } from "@/components/material-details-page-components/MaterialTags";
import { MaterialColors } from "@/components/material-details-page-components/MaterialColors";
import { MaterialProsCons } from "@/components/material-details-page-components/MaterialProsCons";
import { MaterialActions } from "@/components/material-details-page-components/MaterialActions";
import { ShippingInfo } from "@/components/material-details-page-components/ShippingInfo";
import { BackButton } from "@/components/material-details-page-components/BackButton";
import { LightboxModal } from "@/components/material-details-page-components/LightboxModal";

const MaterialDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const materialId = params?.materialId ? Number(params.materialId) : null;

  const [material, setMaterial] = useState<Material | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const materialService = new MaterialService();

  useEffect(() => {
    if (materialId && !isNaN(materialId)) {
      loadMaterialDetails();
    } else if (materialId === null || isNaN(materialId)) {
      setError("Invalid material ID");
      setLoading(false);
    }
  }, [materialId]);

  const loadMaterialDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await materialService.getMaterialById({
        materialId: materialId!,
      });
      if (response.code === 200 && response.data) {
        setMaterial(response.data);
        if (response.data.colors && response.data.colors.length > 0) {
          setSelectedColor(response.data.colors[0].colorName);
        }
      } else {
        setError(response.message || "Failed to load material details");
      }
    } catch (err) {
      console.error("Failed to load material:", err);
      setError("Failed to load material details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    console.log("Add to cart:", material?.materialId);
  };

  const handleAddToFavorites = () => {
    console.log("Add to favorites:", material?.materialId);
  };

  if (loading) {
    return <MaterialDetailsSkeleton />;
  }

  if (error || !material) {
    return <MaterialDetailsError error={error || "Material not found"} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <BackButton onClick={() => router.back()} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Images */}
          <MaterialImageGallery
            images={material.images}
            materialName={material.materialName}
            isPopular={material.isPopular}
            isAvailable={material.isAvailable}
            selectedImage={selectedImage}
            onImageSelect={setSelectedImage}
          />

          {/* Right Column - Details */}
          <div className="space-y-6">
            <MaterialInfo
              name={material.materialName}
              type={material.materialType?.name}
              price={material.pricePerGram}
              description={material.materialDescription}
            />

            <MaterialSpecifications
              density={material.density}
              temperatureResistance={material.temperatureResistance}
              minLayerHeight={material.minLayerHeight}
              maxLayerHeight={material.maxLayerHeight}
              finish={material.finish}
            />

            {material.properties && material.properties.length > 0 && (
              <MaterialProperties properties={material.properties} />
            )}

            <MaterialTags
              strength={material.strength}
              flexibility={material.flexibility}
            />

            {material.colors && material.colors.length > 0 && (
              <MaterialColors
                colors={material.colors}
                selectedColor={selectedColor}
                onColorSelect={setSelectedColor}
              />
            )}

            <MaterialProsCons pros={material.pros} cons={material.cons} />

            <MaterialActions
              isAvailable={material.isAvailable}
              onAddToCart={handleAddToCart}
              onAddToFavorites={handleAddToFavorites}
            />

            <ShippingInfo />
          </div>
        </div>

        {/* Lightbox Modal */}
        <LightboxModal
          imageUrl={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      </div>
    </div>
  );
};

export default MaterialDetailsPage;
