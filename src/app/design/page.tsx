import DesignPage from "@/pages/DesignPage";
import { DESIGN_PAGE_TITLE } from "@/utils/headerTitle";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: DESIGN_PAGE_TITLE,
};

const page = () => {
  return (
    <div>
      <DesignPage />
    </div>
  );
};

export default page;
