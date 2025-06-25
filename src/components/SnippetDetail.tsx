"use client";

import { useSearchParams } from "next/navigation";
import {
  Stack,
  TextField,
  useSnippetStore,
  useRouter,
  useForm,
  zodResolver,
  SubmitHandler,
  Snippet,
  FormData,
  useParams,
  useState,
  Button,
  formSchema,
} from "./index";
import useFetchSnippet from "@/hooks/useFetchSnippet";

const SnippetDetail = () => {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const readOnlyParam = searchParams.get("readOnly") !== "false";

  const router = useRouter();
  const { snippets, updateSnippet } = useSnippetStore();
  const snippet = snippets.find((snippet) => snippet.id === id);

  const [readOnly, setReadOnly] = useState(readOnlyParam);

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
    resolver: zodResolver(formSchema),
    mode: "onChange",
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

  useFetchSnippet();

  return (
    <div className="w-xl">
      <div className="absolute top-3 right-3 flex gap-2">
        <Button variant="contained" onClick={handleCreateSnippet}>
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
