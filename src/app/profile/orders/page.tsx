import OrderPage from "@/pages/OrderPage";
import { USER_PROFILE_ORDERS_PAGE_TITLE } from "@/utils/headerTitle";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: USER_PROFILE_ORDERS_PAGE_TITLE,
};

const page = () => {
  return (
    <div>
      <OrderPage />
    </div>
  );
};

export default page;
