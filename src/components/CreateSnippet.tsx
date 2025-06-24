import {
  Typography,
  Button,
  Stack,
  TextField,
  useSnippetStore,
  useRouter,
  useLocalStorage,
  useForm,
  zodResolver,
  schema,
  SubmitHandler,
  nanoid,
  FormData,
} from "./index";

const CreateSnippet = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
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

  useLocalStorage();

  return (
    <div className="w-xl">
      <Button
        sx={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
        }}
        variant="contained"
        className="absolute top-4 right-4"
        onClick={handleViewSnippet}
      >
        View Snippets
      </Button>
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
