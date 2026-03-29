import NotificationsPage from "@/pages/NotificationsPage";
import { USER_PROFILE_NOTIFICATION_SETTINGS_PAGE_TITLE } from "@/utils/headerTitle";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: USER_PROFILE_NOTIFICATION_SETTINGS_PAGE_TITLE,
};

const page = () => {
  return (
    <div>
      <NotificationsPage />
    </div>
  );
};

export default page;
