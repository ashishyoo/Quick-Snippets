import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormData } from "@/types/form";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "@/types/form.schema";
import { useRouter } from "next/navigation";

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

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    reset();
  };

  const handleViewSnippet = () => {
    router.push("/snippets");
  };

  return (
    <div>
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
      <form onSubmit={handleSubmit(onSubmit)} className="p-4 w-xl relative">
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
