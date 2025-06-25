"use client";

import { auth } from "@/config/firebase.config";
import {
  Typography,
  Button,
  Stack,
  TextField,
  useSnippetStore,
  useRouter,
  useForm,
  zodResolver,
  formSchema,
  SubmitHandler,
  nanoid,
  FormData,
} from "./index";

import { signOut } from "firebase/auth";
import useFetchSnippet from "@/hooks/useFetchSnippet";

const CreateSnippet = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const { addSnippet } = useSnippetStore();

  const handleViewSnippet = () => {
    router.push("/snippets");
  };

  const handleCreateSnippet: SubmitHandler<FormData> = (data) => {
    const newSnippet = {
      id: nanoid(),
      data,
    };
    console.log(newSnippet);
    addSnippet(newSnippet);
    reset();
  };

  useFetchSnippet();

  return (
    <div className="w-xl">
      <div className="absolute top-3 right-3 flex gap-2">
        <Button onClick={() => signOut(auth)} variant="contained">
          Log out
        </Button>
        <Button variant="contained" onClick={handleViewSnippet}>
          View Snippets
        </Button>
      </div>
      <form onSubmit={handleSubmit(handleCreateSnippet)} className="p-4 w-full">
        <Typography variant="h3" className="pb-6">
          Quick Snippets
        </Typography>
        <Stack className="gap-3 mb-2">
          <TextField
            autoComplete="off"
            id="outlined-basic name"
            label="Name"
            variant="outlined"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            autoComplete="off"
            id="outlined-basic name"
            label="Snippet"
            variant="outlined"
            {...register("snippet")}
            error={!!errors.snippet}
            helperText={errors.snippet?.message}
            multiline
            rows={10}
          />
        </Stack>
        <Button type="submit" variant="contained" disabled={isSubmitting}>
          Create Snippet
        </Button>
      </form>
    </div>
  );
};

export default CreateSnippet;
