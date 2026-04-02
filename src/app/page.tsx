import HomePage from "@/pages/HomePage";
import { HOME_PAGE_TITLE } from "@/utils/headerTitle";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: HOME_PAGE_TITLE,
};

const page = () => {
  return (
    <div>
      <HomePage />
    </div>
  );
};

export default page;
