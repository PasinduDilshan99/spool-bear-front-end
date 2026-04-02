import MyReviewsPage from "@/pages/MyReviewsPage";
import { USER_PROFILE_REVIEWS_PAGE_TITLE } from "@/utils/headerTitle";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: USER_PROFILE_REVIEWS_PAGE_TITLE,
};

const page = () => {
  return (
    <div>
      <MyReviewsPage />
    </div>
  );
};

export default page;
