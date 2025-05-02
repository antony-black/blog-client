import { EUserProfileTitles } from "@/enums";

type TProfileInfo = {
  title: EUserProfileTitles;
  info?: string;
};

export const ProfileInfo: React.FC<TProfileInfo>= ({title, info = "no info yet"}) => {
  return <div className="font-semibold text-gray-500">
    <span className="text-gray-200 mr-2">{title}</span>
    {info}
  </div>;
};
