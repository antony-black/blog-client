import { useForm } from "react-hook-form";
import CustomInput from "../components/custom-input";
import ErrorMessage from "../components/error-message";
import { useState } from "react";
import {
  useLazyCurrentQuery,
  useLoginMutation,
} from "../app/services/users-api";
import { catchError } from "../utils/error-util";
import { Link } from "@nextui-org/react";
import CustomButton from "../components/custom-button";
import { useNavigate } from "react-router-dom";
import { CustomButtonColors, CustomButtonTypes } from "../enums/CustomButtonPropertiesTypes";

type TLogin = {
  setSelected: (value: string) => void;
};

type TLoginUserData = {
  email: string;
  password: string;
};

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
      navigate("/");
    } catch (error) {
      catchError(error, setError);
    }
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
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
        If you have no account?{" "}
        <Link
          className="cursor-pointer"
          size="sm"
          onPress={() => setSelected("sign-up")}
        >
          Get registration.
        </Link>
      </div>
      <div className="flex gap-2 justify-end">
        <CustomButton
          type={CustomButtonTypes.SUBMIT}
          fullWidth
          color={CustomButtonColors.PRIMARY}
          isLoading={isLoading}
        >
          Login
        </CustomButton>
      </div>
    </form>
  );
};

export default Login;
