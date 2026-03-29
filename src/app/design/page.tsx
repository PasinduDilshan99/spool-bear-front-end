import DesignPage from "@/pages/DesignPage";
import { DESIGN_PAGE_TITLE } from "@/utils/headerTitle";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: DESIGN_PAGE_TITLE,
};

const page = () => {
  return <DesignPage />;
};

export default page;
