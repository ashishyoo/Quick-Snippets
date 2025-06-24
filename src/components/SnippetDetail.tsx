"use client";

import {
  Stack,
  TextField,
  useSnippetStore,
  useRouter,
  useLocalStorage,
  useForm,
  zodResolver,
  schema,
  SubmitHandler,
  Snippet,
  FormData,
  useParams,
  useState,
  Button,
} from "./index";

const SnippetDetail = () => {
  const { id } = useParams();
  const router = useRouter();
  const { snippets, updateSnippet } = useSnippetStore();
  const snippet = snippets.find((snippet) => snippet.id === id);

  const [readOnly, setReadOnly] = useState(true);

  const handleCreateSnippet = () => {
    router.push("/");
  };

  const handleBackSnippet = () => {
    router.back();
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    defaultValues: {
      name: snippet?.data.name,
      snippet: snippet?.data.snippet,
    },
    resolver: zodResolver(schema),
  });

  const handleUpdateSnippet: SubmitHandler<FormData> = (data) => {
    const updatedSnippet: Snippet = {
      id: snippet!.id,
      data,
    };
    console.log(updatedSnippet);
    updateSnippet(updatedSnippet);
  };

  const handleEdit = () => {
    setReadOnly(!readOnly);
  };

  const handleSave = () => {
    setReadOnly(!readOnly);
  };

  useLocalStorage();

  return (
    <div className="w-xl">
      <div className="absolute top-4 right-4 flex gap-2">
        <Button
          variant="contained"
          onClick={handleCreateSnippet}
          className="z-10"
        >
          Create Snippet
        </Button>
        <Button variant="contained" onClick={handleBackSnippet}>
          Back to Snippets
        </Button>
      </div>
      <form onSubmit={handleSubmit(handleUpdateSnippet)}>
        <Stack className="gap-3 mt-20 mb-2">
          <TextField
            InputProps={{ readOnly: readOnly }}
            autoComplete="off"
            id="outlined-basic name"
            label="Name"
            variant="outlined"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            InputProps={{ readOnly: readOnly }}
            autoComplete="off"
            id="outlined-basic name"
            label="Snippet"
            variant="outlined"
            multiline
            rows={15}
            {...register("snippet")}
            error={!!errors.snippet}
            helperText={errors.snippet?.message}
          />
        </Stack>
        <Button
          variant="contained"
          onClick={readOnly ? handleEdit : handleSave}
          type="submit"
          disabled={!isValid}
        >
          {readOnly ? "Edit Snippet" : "Save Snippet"}
        </Button>
      </form>
    </div>
  );
};

export default SnippetDetail;
