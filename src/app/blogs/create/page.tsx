import CreateBlogPage from "@/pages/CreateBlogPage";
import { BLOG_CREATE_PAGE_TITLE } from "@/utils/headerTitle";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: BLOG_CREATE_PAGE_TITLE,
};

const page = () => {
  return <CreateBlogPage />;
};

export default page;
