import PrivacyPolicyPage from "@/pages/PrivacyPolicyPage";
import { PRIVACY_POLICY_PAGE_TITLE } from "@/utils/headerTitle";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: PRIVACY_POLICY_PAGE_TITLE,
};

const page = () => {
  return (
    <div>
      <PrivacyPolicyPage />
    </div>
  );
};

export default page;
