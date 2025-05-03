import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "@nextui-org/react";

import { useRegistrationMutation } from "../app/services/users-api";
import { catchError } from "@/utils";

import { ECustomButtonColors, ECustomButtonTypes } from "@/enums";
import { CustomButton, CustomInput, ErrorMessage } from "@/components";

type TRegistration = {
  setSelected: (value: string) => void;
};

type TRegistrationUserData = {
  name: string;
  email: string;
  password: string;
};

const Registration: React.FC<TRegistration> = ({ setSelected }) => {
  const [register, { isLoading }] = useRegistrationMutation();
  const [error, setError] = useState<string>("");

  const { control, handleSubmit } = useForm<TRegistrationUserData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    mode: "onChange",
    reValidateMode: "onBlur",
  });

  const onSubmit = async (userData: TRegistrationUserData) => {
    try {
      await register(userData).unwrap();
      setSelected("login");
    } catch (error) {
      catchError(error, setError);
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <CustomInput
        control={control}
        name="name"
        placeholder="name"
        type="text"
        required="Required field."
      />
      <CustomInput
        control={control}
        name="email"
        placeholder="email"
        type="email"
        required="Required field."
      />
      <CustomInput
        control={control}
        name="password"
        placeholder="password"
        type="password"
        required="Required field."
      />
      <ErrorMessage error={error} />
      <div className="text-center text-small">
        If you have already had an account?{" "}
        <Link
          className="cursor-pointer"
          size="sm"
          onPress={() => setSelected("login")}
        >
          Please, login.
        </Link>
      </div>
      <div className="flex gap-2 justify-end">
        <CustomButton
          type={ECustomButtonTypes.SUBMIT}
          fullWidth
          color={ECustomButtonColors.PRIMARY}
          isLoading={isLoading}
        >
          Register
        </CustomButton>
      </div>
    </form>
  );
};

export default Registration;
