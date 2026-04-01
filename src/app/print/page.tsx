import PrintPage from "@/pages/PrintPage";
import { PRINT_PAGE_TITLE } from "@/utils/headerTitle";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: PRINT_PAGE_TITLE,
};

const page = () => {
  return <PrintPage />;
};

export default page;
