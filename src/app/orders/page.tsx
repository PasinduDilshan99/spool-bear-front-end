import OrderDetailsPage from "@/pages/OrderDetailsPage";
import { ORDER_DETAILS_PAGE_TITLE } from "@/utils/headerTitle";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: ORDER_DETAILS_PAGE_TITLE,
};

const page = () => {
  return (
    <div>
      <OrderDetailsPage />
    </div>
  );
};

export default page;
