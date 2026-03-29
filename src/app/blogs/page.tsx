import { Suspense } from "react";
import { Metadata } from "next";
import BlogPage from "@/pages/BlogPage";
import { BLOGS_PAGE_TITLE } from "@/utils/headerTitle";

export const metadata: Metadata = {
  title: BLOGS_PAGE_TITLE,
};

const Page = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#e4e7ec]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff5000] mx-auto"></div>
            <p className="mt-4 text-[#2b2e33]">Loading blogs...</p>
          </div>
        </div>
      }
    >
      <BlogPage />
    </Suspense>
  );
};

export default Page;
