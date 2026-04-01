import UserProfileUpdatePage from "@/pages/UserProfileUpdatePage";
import { USER_PROFILE_UPDATE_PAGE_TITLE } from "@/utils/headerTitle";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: USER_PROFILE_UPDATE_PAGE_TITLE,
};

const page = () => {
  return (
    <div>
      <UserProfileUpdatePage />
    </div>
  );
};

export default page;
