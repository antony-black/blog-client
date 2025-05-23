import { EButtons } from "@/enums";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const GoBack: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  }

  return (
    <div className="text-default-500 flex items-center gap-2 mb-10 cursor-pointer" onClick={handleGoBack}>
      <FaRegArrowAltCircleLeft/>
      {EButtons.Go_back}
    </div>
  );
};
