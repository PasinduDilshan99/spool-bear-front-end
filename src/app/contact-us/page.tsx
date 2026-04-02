import ContactUsPage from "@/pages/ContactUsPage";
import { CONTACT_US_PAGE_TITLE } from "@/utils/headerTitle";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: CONTACT_US_PAGE_TITLE,
};

const page = () => {
  return (
    <div>
      <ContactUsPage />
    </div>
  );
};

export default page;
