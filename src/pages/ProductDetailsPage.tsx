"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Product } from "@/types/product-types";
import { ProductService } from "@/service/productService";

const ProductDetailsPage = () => {
  const params = useParams();
  const productId = params?.productId;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
      } catch (err: unknown) {
        console.error(err);
        setError("Failed to fetch product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (loading) return <div>Loading product details...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>No product found</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">{product.productName}</h1>
      <p className="mb-2">{product.productDescription}</p>
      <p className="mb-2">
        Price: <strong>${product.price.toFixed(2)}</strong>
      </p>
      <p className="mb-2">
        Stock: {product.stockQuantity} | Customizable:{" "}
        {product.isCustomizable ? "Yes" : "No"}
      </p>
      <p className="mb-2">
        Material: {product.materialName || "N/A"}{" "}
        {product.materialDescription && `(${product.materialDescription})`}
      </p>
      <p className="mb-2">
        Category: {product.categoryName} | Type: {product.typeName}
      </p>
      <p className="mb-2">
        Colors: {product.colors.length ? product.colors.join(", ") : "N/A"}
      </p>

      <div className="mt-4 flex flex-wrap gap-4">
        {product.images.length ? (
          product.images.map((img) => (
            <img
              key={img.imageId}
              src={img.imageUrl}
              alt={product.productName}
              className="w-32 h-32 object-cover border rounded"
            />
          ))
        ) : (
          <p>No images available</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsPage;
