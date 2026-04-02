"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ActiveImagesType } from "@/types/gallery-types";
import { PLACE_HOLDER_IMAGE } from "@/utils/constant";
import { GalleryService } from "@/service/galleryService";
import { X, ImageOff, User, Info, Calendar, Layers } from "lucide-react";
import { GalleryHomeSkeletonWithAnimation } from "./loadings/GalleryHomeSkeleton";

const GalleryImage = React.memo(
  ({
    image,
    width,
    height,
    sizes,
    priority,
    rowIndex,
    index,
    onClick,
  }: {
    image: ActiveImagesType;
    width: number;
    height: number;
    sizes: string;
    priority: boolean;
    rowIndex: number;
    index: number;
    onClick: () => void;
  }) => {
    const [hasError, setHasError] = useState(false);
    const imgSrc = hasError ? PLACE_HOLDER_IMAGE : image.imageLink;

    const handleError = () => {
      if (!hasError) {
        setHasError(true);
      }
    };

    return (
      <div
        className="flex-shrink-0 rounded-xl overflow-hidden cursor-pointer relative group"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
        }}
        onClick={onClick}
      >
        <Image
          key={`${image.imageId}-${hasError}-${rowIndex}-${index}`}
          src={imgSrc}
          alt={image.imageName}
          width={width}
          height={height}
          sizes={sizes}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-108"
          style={{ transition: "transform 0.5s ease" }}
          priority={priority}
          onError={handleError}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-end">
          <div className="w-full px-3 py-2.5 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <p className="text-white text-xs font-bold truncate drop-shadow">
              {image.imageName}
            </p>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-0 h-0 group-hover:w-8 group-hover:h-8 transition-all duration-300 overflow-hidden">
          <div className="absolute top-0 left-0 w-8 h-8 bg-[#FF5000] rotate-45 -translate-x-4 -translate-y-4" />
        </div>
      </div>
    );
  },
);
GalleryImage.displayName = "GalleryImage";

const ModalImage = React.memo(
  ({
    image,
    isMobile,
    isTablet,
  }: {
    image: ActiveImagesType;
    isMobile: boolean;
    isTablet: boolean;
  }) => {
    const [hasError, setHasError] = useState(false);
    const imgSrc = hasError ? PLACE_HOLDER_IMAGE : image.imageLink;

    return (
      <Image
        src={imgSrc}
        alt={image.imageName}
        fill
        sizes={isMobile ? "100vw" : isTablet ? "75vw" : "60vw"}
        className="object-contain"
        priority
        onError={() => {
          if (!hasError) {
            setHasError(true);
          }
        }}
      />
    );
  },
);
ModalImage.displayName = "ModalImage";

const GalleryHome = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openImages, setOpenImages] = useState<ActiveImagesType[]>([]);
  const [selectedImage, setSelectedImage] = useState<ActiveImagesType | null>(
    null,
  );
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isLaptop, setIsLaptop] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      setIsLaptop(width >= 1024 && width < 1536);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const fetchOpenImages = async () => {
      try {
        setLoading(true);
        const { data: images, error } = await GalleryService.fetchOpenImages();
        if (error) setError(error);
        else {
          setOpenImages(images);
          setError(null);
        }
      } catch (err) {
        console.error("Error fetching open images:", err);
        setError("Something went wrong while fetching open images");
      } finally {
        setLoading(false);
      }
    };
    fetchOpenImages();
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleEscape);
    if (selectedImage) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("modal-open");
    } else {
      document.body.style.overflow = "unset";
      document.body.classList.remove("modal-open");
    }
    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
      document.body.classList.remove("modal-open");
    };
  }, [selectedImage]);

  const getImageDimensions = () => {
    if (isMobile) return { width: 160, height: 160 };
    if (isTablet) return { width: 200, height: 200 };
    if (isLaptop) return { width: 240, height: 240 };
    return { width: 280, height: 280 };
  };

  const getImageSize = () => {
    if (isMobile) return "(max-width: 767px) 160px";
    if (isTablet) return "(max-width: 1023px) 200px";
    if (isLaptop) return "(max-width: 1535px) 240px";
    return "280px";
  };

  const getVisibleRows = () => {
    if (openImages.length === 0) return [[], [], []];
    const imagesPerRow = Math.ceil(openImages.length / 3);
    return [0, 1, 2].map((i) =>
      openImages.slice(i * imagesPerRow, (i + 1) * imagesPerRow),
    );
  };

  const getModalImageHeight = () => {
    if (isMobile) return "h-64 sm:h-72";
    if (isTablet) return "h-80";
    return "h-96";
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const visibleRows = getVisibleRows();

  if (loading) {
    return (
      <GalleryHomeSkeletonWithAnimation
      // isMobile={isMobile}
      // isTablet={isTablet}
      // isLaptop={isLaptop}
      />
    );
  }

  if (error) return null;

  const CarouselRow = ({
    images,
    direction,
    rowIndex,
  }: {
    images: ActiveImagesType[];
    direction: "left" | "right";
    rowIndex: number;
  }) => {
    const { width, height } = getImageDimensions();
    const sizes = getImageSize();
    const duplicatedImages = [...images, ...images];
    return (
      <div className="relative overflow-hidden py-2">
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-linear-to-r from-[#F7F7F7] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-linear-to-l from-[#F7F7F7] to-transparent z-10 pointer-events-none" />
        <div
          className={`flex gap-3 sm:gap-4 ${direction === "left" ? "animate-scroll-left" : "animate-scroll-right"}`}
          style={{ width: "fit-content" }}
        >
          {duplicatedImages.map((image, index) => (
            <GalleryImage
              key={`${image.imageId}-${rowIndex}-${index}`}
              image={image}
              width={width}
              height={height}
              sizes={sizes}
              priority={rowIndex === 0 && index < 3}
              rowIndex={rowIndex}
              index={index}
              onClick={() => setSelectedImage(image)}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="relative overflow-hidden bg-[#F7F7F7] py-6 lg:py-8 xl:py-10">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,80,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,80,0,0.04) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div
        className="absolute top-0 right-0 w-[40vw] h-[40vw] max-w-[520px] max-h-[520px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at top right, rgba(255,80,0,0.04) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[35vw] h-[35vw] max-w-[440px] max-h-[440px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at bottom left, rgba(255,80,0,0.03) 0%, transparent 65%)",
        }}
      />

      <style jsx global>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes scroll-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
        .animate-scroll-left {
          animation: scroll-left 60s linear infinite;
        }
        .animate-scroll-right {
          animation: scroll-right 60s linear infinite;
        }
        .animate-scroll-left:hover,
        .animate-scroll-right:hover {
          animation-play-state: paused;
        }
        @media (max-width: 767px) {
          .animate-scroll-left {
            animation: scroll-left 40s linear infinite;
          }
          .animate-scroll-right {
            animation: scroll-right 40s linear infinite;
          }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .animate-scroll-left {
            animation: scroll-left 50s linear infinite;
          }
          .animate-scroll-right {
            animation: scroll-right 50s linear infinite;
          }
        }
        body.modal-open {
          overflow: hidden;
        }
      `}</style>

      <div className="max-w-full mx-auto space-y-2 sm:space-y-3 relative z-10">
        {visibleRows.map(
          (rowImages, index) =>
            rowImages.length > 0 && (
              <CarouselRow
                key={`row-${index}`}
                images={rowImages}
                direction={index % 2 === 0 ? "left" : "right"}
                rowIndex={index}
              />
            ),
        )}

        {openImages.length === 0 && (
          <div className="flex justify-center py-16 px-4">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 max-w-sm text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#FF5000]" />
              <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-orange-100">
                <ImageOff size={28} className="text-[#FF5000]" />
              </div>
              <h3 className="text-lg font-black text-gray-900 mb-2">
                Gallery is Empty
              </h3>
              <p className="text-sm text-gray-500">
                No images available at the moment. Check back soon!
              </p>
            </div>
          </div>
        )}
      </div>

      {selectedImage && (
        <>
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9998]"
            style={{ animation: "fadeIn 0.2s ease-out" }}
            onClick={() => setSelectedImage(null)}
          />

          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5">
            <div
              className={`bg-white rounded-2xl shadow-2xl w-full overflow-hidden flex flex-col ${
                isMobile
                  ? "max-w-full mx-2"
                  : isTablet
                    ? "max-w-3xl"
                    : "max-w-4xl"
              } max-h-[92vh]`}
              style={{
                animation: "scaleIn 0.25s cubic-bezier(0.34,1.56,0.64,1)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-[#1A1A1A] relative flex-shrink-0 overflow-hidden">
                <div
                  className="absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage:
                      "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />
                <div className="h-1 bg-[#FF5000]" />
                <div className="relative flex items-center justify-between px-5 py-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-[#FF5000]/20 flex items-center justify-center flex-shrink-0">
                      <Layers size={15} className="text-[#FF5000]" />
                    </div>
                    <h2 className="text-sm font-black text-white truncate">
                      {selectedImage.imageName}
                    </h2>
                  </div>
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="cursor-pointer w-8 h-8 flex items-center justify-center rounded-lg text-white/40 hover:text-red-500 hover:bg-white/10 transition-all duration-150 flex-shrink-0 ml-3"
                    aria-label="Close"
                  >
                    <X size={17} />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                <div
                  className={`${getModalImageHeight()} relative w-full bg-gray-100`}
                >
                  <ModalImage
                    image={selectedImage}
                    isMobile={isMobile}
                    isTablet={isTablet}
                  />
                </div>

                <div className="p-5 sm:p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <DetailTile
                      icon={<User size={14} className="text-[#FF5000]" />}
                      label="Image Name"
                      value={selectedImage.imageName || "Unknown"}
                    />

                    <DetailTile
                      icon={<Calendar size={14} className="text-[#FF5000]" />}
                      label="Uploaded"
                      value={formatDate(selectedImage.createdAt)}
                    />

                    {selectedImage.material && (
                      <DetailTile
                        icon={<Layers size={14} className="text-[#FF5000]" />}
                        label="Material"
                        value={selectedImage.material}
                      />
                    )}

                    {selectedImage.color && (
                      <DetailTile
                        icon={
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: selectedImage.color }}
                          />
                        }
                        label="Color"
                        value={selectedImage.color}
                      />
                    )}

                    {selectedImage.imageDescription && (
                      <div className="sm:col-span-2 bg-gray-50 border border-gray-100 rounded-xl p-4 hover:border-orange-200 transition-colors duration-200">
                        <div className="flex items-center gap-2 mb-1.5">
                          <Info size={14} className="text-[#FF5000]" />
                          <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                            Description
                          </p>
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {selectedImage.imageDescription}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-center gap-1.5 mt-5 pt-4 border-t border-gray-100">
                    {[0, 0.15, 0.3, 0.45, 0.6].map((delay, i) => (
                      <div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-[#FF5000] animate-pulse"
                        style={{
                          animationDelay: `${delay}s`,
                          opacity: 1 - i * 0.15,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scaleIn {
          from {
            transform: scale(0.93) translateY(12px);
            opacity: 0;
          }
          to {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

function DetailTile({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 hover:border-orange-200 transition-colors duration-200">
      <div className="flex items-center gap-2 mb-1.5">
        {icon}
        <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
          {label}
        </p>
      </div>
      <p className="text-sm font-semibold text-gray-900">{value}</p>
    </div>
  );
}

export default GalleryHome;
