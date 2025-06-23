"use client";

import React from "react";
import SnippetCard from "@/components/SnippetCard";
import { Stack, Typography, Button } from "@mui/material";
import useSnippetStore from "@/state/store";
import { darkTheme, CssBaseline, ThemeProvider } from "../utils/index";
import { useRouter } from "next/navigation";

const Snippets = () => {
  const router = useRouter();
  const { snippets } = useSnippetStore();
  const handleCreateSnippet = () => {
    router.back();
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Stack className="gap-2">
        <Button
          sx={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
          }}
          variant="contained"
          className="absolute top-4 right-4"
          onClick={handleCreateSnippet}
        >
          Create Snippet
        </Button>
        {snippets.length > 0 ? (
          snippets.map((snippet) => (
            <SnippetCard key={snippet.id} snippet={snippet} />
          ))
        ) : (
          <Typography>No snippets available</Typography>
        )}
      </Stack>
    </ThemeProvider>
  );
};

export default Snippets;
