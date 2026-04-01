import SecretQuestionUpdatePage from "@/pages/SecretQuestionUpdatePage";
import { USER_PROFILE_UPDATE_SECRET_QUESTIONS_PAGE_TITLE } from "@/utils/headerTitle";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: USER_PROFILE_UPDATE_SECRET_QUESTIONS_PAGE_TITLE,
};

const page = () => {
  return (
    <div>
      <SecretQuestionUpdatePage />
    </div>
  );
};

export default page;
