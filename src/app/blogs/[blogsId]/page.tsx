import BlogDetailsPage from "@/pages/BlogDetailsPage";
import { BLOG_DETAILS_PAGE_TITLE } from "@/utils/headerTitle";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: BLOG_DETAILS_PAGE_TITLE,
};

const page = () => {
  return (
    <div>
      <BlogDetailsPage />
    </div>
  );
};

export default page;
