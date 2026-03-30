// app/products/[productId]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Product } from "@/types/product-types";
import { ProductService } from "@/service/productService";
import { ProductInfo } from "@/components/product-details-page-components/ProductInfo";
import { ImageGallery } from "@/components/product-details-page-components/ImageGallery";
import { NotFoundState } from "@/components/product-details-page-components/NotFoundState";
import { ErrorState } from "@/components/product-details-page-components/ErrorState";
import { ProductDetailsSkeleton } from "@/components/product-details-page-components/ProductDetailsSkeleton";

const ProductDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const productId = params?.productId;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isWished, setIsWished] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!productId) return;

    const fetchProductDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const productService = new ProductService();
        const response = await productService.getProductDetails({
          productId: Number(productId),
        });
        setProduct(response.data);
        setIsWished(response.data.isWish);
      } catch (err: unknown) {
        console.error(err);
        setError("Failed to fetch product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  useEffect(() => {
    if (!loading && product) {
      const t = setTimeout(() => setVisible(true), 60);
      return () => clearTimeout(t);
    }
  }, [loading, product]);

  if (loading) return <ProductDetailsSkeleton />;
  if (error) return <ErrorState error={error} />;
  if (!product) return <NotFoundState />;

  return (
    <div className="min-h-screen bg-[#e4e7ec] relative overflow-x-hidden">
      {/* Grid texture */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,80,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,80,0,0.04) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div
        className="container mx-auto relative z-10"
        style={{
          maxWidth: "1300px",
          padding: "clamp(32px, 5vw, 72px) clamp(16px, 4vw, 64px)",
        }}
      >
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 font-bold text-[#2b2e33] hover:text-[#FF5000] transition-colors duration-200 mb-8 group"
          style={{ fontSize: "clamp(12px, 1.3vw, 14px)" }}
        >
          <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center group-hover:border-orange-200 group-hover:bg-orange-50 transition-colors duration-200">
            <ArrowLeft size={15} />
          </div>
          Back to Products
        </button>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 xl:gap-20">
          {/* ── LEFT: Gallery ── */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateX(-20px)",
              transition: "opacity 0.65s ease-out, transform 0.65s ease-out",
            }}
          >
            <ImageGallery
              images={product.images}
              productName={product.productName}
            />
          </div>

          {/* ── RIGHT: Product info ── */}
          <ProductInfo
            product={product}
            isWished={isWished}
            visible={visible}
            onWishlistToggle={() => setIsWished((w) => !w)}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
