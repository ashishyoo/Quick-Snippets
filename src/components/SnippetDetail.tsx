"use client";

import useSnippetStore from "@/state/store";
import { TextField, Stack, Button } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const SnippetDetail = () => {
  const { id } = useParams();
  const router = useRouter();
  const { snippets } = useSnippetStore();
  const snippet = snippets.find((snippet) => snippet.id === id);
  console.log(snippet);

  const handleBackSnippet = () => {
    router.back();
  };

  return (
    <div className="p-4 w-xl">
      <Button
        sx={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
        }}
        variant="contained"
        className="absolute top-4 right-4"
        onClick={handleBackSnippet}
      >
        Back to Snippets
      </Button>
      <Stack className="gap-3 mt-20 p-4">
        <TextField
          autoComplete="off"
          id="outlined-basic name"
          label="Name"
          variant="outlined"
          value={snippet?.data.name}
          aria-readonly
        />
        <TextField
          autoComplete="off"
          id="outlined-basic name"
          label="Snippet"
          variant="outlined"
          multiline
          rows={15}
          value={snippet?.data.snippet}
          aria-readonly
        />
      </Stack>
    </div>
  );
};

export default SnippetDetail;
