// app/products/[productId]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Product } from "@/types/product-types";
import { ProductService } from "@/service/productService";
import { ProductInfo } from "@/components/product-details-page-components/ProductInfo";
import { ImageGallery } from "@/components/product-details-page-components/ImageGallery";
import { NotFoundState } from "@/components/product-details-page-components/NotFoundState";
import { ErrorState } from "@/components/product-details-page-components/ErrorState";
import { ProductReviews } from "@/components/product-details-page-components/ProductReviews";
import { useCurrency } from "@/context/CurrencyContext";
import ProductDetailsLoading from "@/components/product-details-page-components/ProductDetailsLoading";
import { BrowserHistoryService } from "@/service/browserHistoryService";

const ProductDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const productId = params?.productId;
  const { formatPrice, currentCurrency } = useCurrency();

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
      } catch (err) {
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

  if (loading) return <ProductDetailsLoading />;
  if (error) return <ErrorState error={error} />;
  if (!product) return <NotFoundState />;

  return (
    <div
      className="bg-[#e4e7ec] relative overflow-x-hidden min-h-screen"
      style={{ fontFamily: "'Faculty Glyphic', sans-serif" }}
    >
      <div
        className="min-h-screen relative overflow-x-hidden"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,80,0,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,80,0,0.045) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      >
        {/* Decorative blobs */}
        <div
          className="fixed top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none opacity-[0.035]"
          style={{
            background: "radial-gradient(circle,#FF5000 0%,transparent 70%)",
            transform: "translate(35%,-35%)",
          }}
        />
        <div
          className="fixed bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none opacity-[0.025]"
          style={{
            background: "radial-gradient(circle,#FF8C42 0%,transparent 70%)",
            transform: "translate(-35%,35%)",
          }}
        />

        {/* Subtle grid texture */}
        <div
          className="fixed inset-0 pointer-events-none z-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,80,0,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,80,0,0.03) 1px,transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        <div
          className="container mx-auto relative z-10"
          style={{
            maxWidth: "1300px",
            padding: "clamp(32px,5vw,72px) clamp(16px,4vw,64px)",
          }}
        >
          {/* Back button */}
          <motion.button
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.38 }}
            onClick={() => router.back()}
            whileHover={{ x: -3 }}
            whileTap={{ scale: 0.96 }}
            className="group flex items-center gap-2.5 mb-10 px-4 py-2.5 rounded-2xl font-bold text-[#6B5F56] hover:text-[#FF5000] transition-colors duration-200"
            style={{
              background: "#F7F5F2",
              border: "1px solid #EAE4DC",
              fontSize: "clamp(11px,1.2vw,13px)",
            }}
          >
            <ArrowLeft
              size={15}
              strokeWidth={2.5}
              className="transition-transform duration-200 group-hover:-translate-x-0.5"
            />
            Back to Products
          </motion.button>

          {/* Main grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-20">
            {/* LEFT: Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : -20 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="lg:sticky lg:top-8 lg:self-start"
            >
              <ImageGallery
                images={product.images}
                productName={product.productName}
              />
            </motion.div>

            {/* RIGHT: Product info */}
            <ProductInfo
              product={product}
              isWished={isWished}
              visible={visible}
              onWishlistToggle={() => setIsWished((w) => !w)}
            />
          </div>

          {/* Reviews */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <ProductReviews productId={Number(productId)} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
