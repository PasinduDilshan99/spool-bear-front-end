import CartPage from "@/pages/CartPage";
import { CART_PAGE_TITLE } from "@/utils/headerTitle";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: CART_PAGE_TITLE,
};

const page = () => {
  return (
    <div>
      <CartPage />
    </div>
  );
};

export default page;
