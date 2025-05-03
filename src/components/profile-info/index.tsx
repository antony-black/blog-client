import { EUserProfileTitles } from "@/enums";

type TProfileInfo = {
  title: EUserProfileTitles;
  info?: string;
};

const NO_INFO: string = "no info yet";

export const ProfileInfo: React.FC<TProfileInfo>= ({title, info = NO_INFO}) => {
  return <div className="font-semibold text-gray-500">
    <span className="text-gray-200 mr-2">{title}</span>
    {info}
  </div>;
};
