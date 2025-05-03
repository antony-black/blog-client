import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "@nextui-org/react";

import { useRegistrationMutation } from "@/app/services";

import { catchError } from "@/utils";
import {
  EButtons,
  ECustomButtonColors,
  ECustomButtonTypes,
  EInputFields,
} from "@/enums";
import { CustomButton, CustomInput, ErrorMessage } from "@/components";

type TRegistration = {
  setSelected: (value: string) => void;
};

type TRegistrationUserData = {
  name: string;
  email: string;
  password: string;
};

const HAVE_ACCOUNT: string = "If you have already had an account?";
const PLEASE_LOGIN: string = "Please, login.";

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
      setSelected(EButtons.Login);
    } catch (error) {
      catchError(error, setError);
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <CustomInput
        control={control}
        name={EInputFields.name}
        placeholder={EInputFields.name}
        type={EInputFields.text}
        required={EInputFields.required}
      />
      <CustomInput
        control={control}
        name={EInputFields.email}
        placeholder={EInputFields.email}
        type={EInputFields.email}
        required={EInputFields.required}
      />
      <CustomInput
        control={control}
        name={EInputFields.password}
        placeholder={EInputFields.password}
        type={EInputFields.password}
        required={EInputFields.required}
      />
      <ErrorMessage error={error} />
      <div className="text-center text-small">
        {HAVE_ACCOUNT}{" "}
        <Link
          className="cursor-pointer"
          size="sm"
          onPress={() => setSelected(EButtons.Login)}
        >
          {PLEASE_LOGIN}
        </Link>
      </div>
      <div className="flex gap-2 justify-end">
        <CustomButton
          type={ECustomButtonTypes.SUBMIT}
          fullWidth
          color={ECustomButtonColors.PRIMARY}
          isLoading={isLoading}
        >
          {EButtons.Register}
        </CustomButton>
      </div>
    </form>
  );
};

export default Registration;
