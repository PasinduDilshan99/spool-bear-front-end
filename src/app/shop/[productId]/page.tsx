import ProductDetailsPage from "@/pages/ProductDetailsPage";
import { SHOP_DETAILS_PAGE_TITLE } from "@/utils/headerTitle";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: SHOP_DETAILS_PAGE_TITLE,
};

const page = () => {
  return (
    <div>
      <ProductDetailsPage />
    </div>
  );
};

export default page;
