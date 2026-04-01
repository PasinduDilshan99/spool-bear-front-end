import TermsAndConditionPage from "@/pages/TermsAndConditionPage";
import { TERMS_AND_CONDITIONS_PAGE_TITLE } from "@/utils/headerTitle";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: TERMS_AND_CONDITIONS_PAGE_TITLE,
};

const page = () => {
  return (
    <div>
      <TermsAndConditionPage />
    </div>
  );
};

export default page;
