"use client";

import React from "react";
import {
  Typography,
  Stack,
  TextField,
  Button,
  useForm,
  zodResolver,
  authSchema,
  AuthData,
  SubmitHandler,
  Checkbox,
  FormControlLabel,
  FormGroup,
  useState,
  useRouter,
} from "./index";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase.config";

const SignUp = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AuthData>({
    resolver: zodResolver(authSchema),
  });

  const router = useRouter();

  const handleSignUp: SubmitHandler<AuthData> = async ({ email, password }) => {
    try {
      console.log(email, password);
      await createUserWithEmailAndPassword(auth, email, password);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  const handlePasswordCheckbox = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsPasswordVisible(event.target.checked);
  };

  const handleSignIn = () => {
    router.push("/signin");
  };

  return (
    <form onSubmit={handleSubmit(handleSignUp)} className="p-4 w-2xl">
      <Button
        variant="contained"
        onClick={handleSignIn}
        sx={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
        }}
      >
        SignIn
      </Button>
      <Typography variant="h3" className="pb-6">
        SignUp
      </Typography>
      <Stack className="gap-3 mb-2">
        <TextField
          autoComplete="off"
          id="outlined-basic email"
          label="Email"
          variant="outlined"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          autoComplete="off"
          id="outlined-basic password"
          label="Password"
          variant="outlined"
          type={isPasswordVisible ? "text" : "password"}
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                onChange={handlePasswordCheckbox}
                checked={isPasswordVisible}
              />
            }
            label="Show Password"
          />
        </FormGroup>
      </Stack>
      <Button type="submit" variant="contained">
        SignUp
      </Button>
    </form>
  );
};

export default SignUp;
