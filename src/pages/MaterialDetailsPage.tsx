// app/materials/[materialId]/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MaterialService } from "@/service/materialService";
import { Material } from "@/types/material-types";
import { MaterialDetailsError } from "@/components/material-details-page-components/MaterialDetailsError";
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
import MaterialDetailsLoading from "@/components/material-details-page-components/MaterialDetailsLoading";
import { MATERIAL_PAGE_PATH } from "@/utils/urls";

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
    } else {
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
        if (response.data.colors?.length > 0) {
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

  const handleAddToCart = () =>
    console.log("Add to cart:", material?.materialId);
  const handleAddToFavorites = () =>
    console.log("Add to favorites:", material?.materialId);

  if (loading) return <MaterialDetailsLoading />;
  if (error || !material)
    return <MaterialDetailsError error={error || "Material not found"} />;

  return (
    <div
      className="bg-[#e4e7ec] relative overflow-x-hidden min-h-screen"
      style={{ fontFamily: "'Faculty Glyphic', sans-serif" }}
    >
      <div
        className="min-h-screen relative"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,80,0,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,80,0,0.045) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      >
        {/* Subtle decorative blobs */}
        <div
          className="fixed top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.04]"
          style={{
            background: "radial-gradient(circle, #FF5000 0%, transparent 70%)",
            transform: "translate(30%, -30%)",
          }}
        />
        <div
          className="fixed bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none opacity-[0.03]"
          style={{
            background: "radial-gradient(circle, #FF8C42 0%, transparent 70%)",
            transform: "translate(-30%, 30%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <BackButton onClick={() => router.push(MATERIAL_PAGE_PATH)} />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16"
          >
            {/* Left Column — Images */}
            <div className="lg:sticky lg:top-8 lg:self-start">
              <MaterialImageGallery
                images={material.images}
                materialName={material.materialName}
                isPopular={material.isPopular}
                isAvailable={material.isAvailable}
                selectedImage={selectedImage}
                onImageSelect={setSelectedImage}
              />
            </div>

            {/* Right Column — Details */}
            <div className="space-y-7">
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

              <MaterialTags
                strength={material.strength}
                flexibility={material.flexibility}
              />

              {material.properties?.length > 0 && (
                <MaterialProperties properties={material.properties} />
              )}

              {material.colors?.length > 0 && (
                <MaterialColors
                  colors={material.colors}
                  selectedColor={selectedColor}
                  onColorSelect={setSelectedColor}
                />
              )}

              <MaterialProsCons pros={material.pros} cons={material.cons} />

              {/* <MaterialActions
              isAvailable={material.isAvailable}
              onAddToCart={handleAddToCart}
              onAddToFavorites={handleAddToFavorites}
            /> */}

              {/* <ShippingInfo /> */}
            </div>
          </motion.div>
        </div>

        {/* Lightbox */}
        <LightboxModal
          imageUrl={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      </div>
    </div>
  );
};

export default MaterialDetailsPage;
