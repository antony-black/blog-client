import { JSX } from "react";
import { Button } from "@nextui-org/react";

import {
  ECustomButtonColors,
  ECustomButtonTypes,
  ECustomButtonVariants,
} from "@/enums";

type TCustomButton = {
  children: React.ReactNode;
  icon?: JSX.Element;
  className?: string;
  type?: ECustomButtonTypes;
  fullWidth?: boolean;
  isLoading?: boolean;
  color?: ECustomButtonColors;
  variant?: ECustomButtonVariants;
  endContent?: React.ReactNode;
  onPress?: () => void;
};

export const CustomButton: React.FC<TCustomButton> = ({
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
      variant={ECustomButtonVariants.LIGHT}
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
