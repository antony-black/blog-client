import { Button } from "@nextui-org/react";
import { JSX } from "react";
import { CustomButtonColors, CustomButtonTypes, CustomButtonVariants } from "../../enums/CustomButtonPropertiesTypes";

type TCustomButton = {
  children: React.ReactNode;
  icon?: JSX.Element;
  className?: string;
  type?: CustomButtonTypes;
  fullWidth?: boolean;
  isLoading?: boolean;
  color?: CustomButtonColors;
  variant?: CustomButtonVariants;
  endContent?: React.ReactNode;
  onPress?: () => void;
};

const CustomButton: React.FC<TCustomButton> = ({
  children,
  icon,
  className,
  type,
  fullWidth,
  isLoading,
  color,
  onPress,
}) => {
  return (
    <Button
      className={className}
      startContent={icon}
      size="lg"
      variant={CustomButtonVariants.LIGHT}
      color={color}
      type={type}
      fullWidth={fullWidth}
      isLoading={isLoading}
      onPress={onPress}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
