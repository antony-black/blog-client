import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Link } from "@nextui-org/react";

import {
  useLazyCurrentQuery,
  useLoginMutation,
} from "@/app/services/users-api";
import { catchError } from "@/utils";

import { CustomButton, CustomInput, ErrorMessage } from "@/components";

import {
  EButtons,
  ECustomButtonColors,
  ECustomButtonTypes,
  EInputFields,
  EPathPages,
} from "@/enums";

type TLogin = {
  setSelected: (value: string) => void;
};

type TLoginUserData = {
  email: string;
  password: string;
};

const NO_ACCOUNT: string = "If you have no account?";
const GET_REGISTRATION: string = "Get registration.";

const Login: React.FC<TLogin> = ({ setSelected }) => {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const [error, setError] = useState<string>("");
  const [triggerCurrentCuery] = useLazyCurrentQuery();

  const { control, handleSubmit } = useForm<TLoginUserData>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
    reValidateMode: "onBlur",
  });

  const onSubmit = async (userData: TLoginUserData) => {
    try {
      await login(userData).unwrap();
      await triggerCurrentCuery().unwrap();
      navigate(EPathPages.LAYOUT);
    } catch (error) {
      catchError(error, setError);
    }
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
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
        {NO_ACCOUNT}{" "}
        <Link
          className="cursor-pointer"
          size="sm"
          onPress={() => setSelected(EButtons.Sign_up)}
        >
          {GET_REGISTRATION}
        </Link>
      </div>
      <div className="flex gap-2 justify-end">
        <CustomButton
          type={ECustomButtonTypes.SUBMIT}
          fullWidth
          color={ECustomButtonColors.PRIMARY}
          isLoading={isLoading}
        >
          {EButtons.Login}
        </CustomButton>
      </div>
    </form>
  );
};

export default Login;
