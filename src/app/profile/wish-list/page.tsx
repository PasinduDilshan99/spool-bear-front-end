import WishListPage from "@/pages/WishListPage";
import { USER_PROFILE_WISH_LIST_PAGE_TITLE } from "@/utils/headerTitle";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: USER_PROFILE_WISH_LIST_PAGE_TITLE,
};

const page = () => {
  return (
    <div>
      <WishListPage />
    </div>
  );
};

export default page;
