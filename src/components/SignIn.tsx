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

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase.config";

const SignIn = () => {
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

  const handleSignIn: SubmitHandler<AuthData> = async ({ email, password }) => {
    try {
      console.log(email, password);
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
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

  const handleSignUp = () => {
    router.push("/signup");
  };

  return (
    <form onSubmit={handleSubmit(handleSignIn)} className="p-4 w-2xl">
      <Typography variant="h3" className="pb-6">
        SignIn
      </Typography>
      <Button
        variant="contained"
        onClick={handleSignUp}
        sx={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
        }}
      >
        SignUp
      </Button>
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
        SignIn
      </Button>
    </form>
  );
};

export default SignIn;
