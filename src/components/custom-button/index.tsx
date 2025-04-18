import { Button } from "@nextui-org/react";
import { JSX } from "react";

type TCustomButton = {
  children: React.ReactNode;
  icon: JSX.Element;
  className?: string;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  isLoading?: boolean;
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
};

const CustomButton: React.FC<TCustomButton> = ({
  children,
  icon,
  className,
  type,
  fullWidth,
  isLoading,
  color,
}) => {
  return (
    <Button
      className={className}
      startContent={icon}
      size="lg"
      variant="light"
      color={color}
      type={type}
      fullWidth={fullWidth}
      isLoading={isLoading}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
