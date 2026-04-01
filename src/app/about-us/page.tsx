import AboutUsPage from "@/pages/AboutUsPage";
import { ABOUT_US_PAGE_TITLE } from "@/utils/headerTitle";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: ABOUT_US_PAGE_TITLE,
};

const page = () => {
  return <AboutUsPage />;
};

export default page;
