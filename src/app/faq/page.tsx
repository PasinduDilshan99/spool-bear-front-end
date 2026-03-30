import FaqPage from "@/pages/FaqPage";
import { FAQ_PAGE_TITLE } from "@/utils/headerTitle";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: FAQ_PAGE_TITLE,
};

const page = () => {
  return (
    <div>
      <FaqPage />
    </div>
  );
};

export default page;
