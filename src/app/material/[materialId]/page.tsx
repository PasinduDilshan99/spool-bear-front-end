import MaterialDetailsPage from "@/pages/MaterialDetailsPage";
import { MATERIAL_DETAILS_PAGE_TITLE } from "@/utils/headerTitle";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: MATERIAL_DETAILS_PAGE_TITLE,
};

const page = () => {
  return (
    <div>
      <MaterialDetailsPage />
    </div>
  );
};

export default page;
