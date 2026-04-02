import ReviewDetailPage from "@/pages/ReviewDetailsPage";
import { REVIEW_DETAILS_PAGE_TITLE } from "@/utils/headerTitle";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: REVIEW_DETAILS_PAGE_TITLE,
};

const page = () => {
  return (
    <div>
      <ReviewDetailPage />
    </div>
  );
};

export default page;
