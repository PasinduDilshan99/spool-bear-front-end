import MaterialsPage from "@/pages/MaterialsPage";
import { MATERIALS_PAGE_TITLE } from "@/utils/headerTitle";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: MATERIALS_PAGE_TITLE,
};

const page = () => {
  return (
    <div>
      <MaterialsPage />
    </div>
  );
};

export default page;
