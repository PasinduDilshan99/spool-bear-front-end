import BrowserHistoryPage from "@/pages/BrowserHistoryPage";
import { USER_PROFILE_BROWSER_HISTORY_PAGE_TITLE } from "@/utils/headerTitle";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: USER_PROFILE_BROWSER_HISTORY_PAGE_TITLE,
};

const page = () => {
  return (
    <div>
      <BrowserHistoryPage />
    </div>
  );
};

export default page;
