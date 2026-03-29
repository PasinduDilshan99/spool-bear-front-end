import UserProfileContent from "@/components/profile-components/UserProfileContent";
import { USER_PROFILE_PAGE_TITLE } from "@/utils/headerTitle";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: USER_PROFILE_PAGE_TITLE,
};

const page = () => {
  return (
    <div>
      <UserProfileContent />
    </div>
  );
};

export default page;
