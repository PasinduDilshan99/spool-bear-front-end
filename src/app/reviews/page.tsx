import ReviewPage from "@/pages/ReviewPage";
import { REVIEWS_PAGE_TITLE } from "@/utils/headerTitle";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: REVIEWS_PAGE_TITLE,
};

const page = () => {
  return (
    <div>
      <ReviewPage />
    </div>
  );
};

export default page;
