import { JSX } from "react";
import { Control, useController } from "react-hook-form";
import { Input } from "@nextui-org/react";

type TCustomInput = {
  name: string;
  label: string;
  placeholder: string;
  type: string;
  control: Control<any>;
  required?: string;
  endContent?: JSX.Element;
};
const CustomInput: React.FC<TCustomInput> = ({
  name,
  label,
  placeholder,
  type,
  control,
  required = "",
  endContent,
}) => {
  const {
    field,
    fieldState: { invalid },
    formState: { errors },
  } = useController({
    name,
    control,
    rules: { required},
  });

  return (
    <Input
      id={name}
      value={field.value}
      onChange={field.onChange}
      name={field.name}
      label={label}
      placeholder={placeholder}
      type={type}
      endContent={endContent}
      isInvalid={invalid}
      onBlur={field.onBlur}
      errorMessage={`${errors[field.name]?.message ?? ""}`}
    />
  );
};

export default CustomInput;
