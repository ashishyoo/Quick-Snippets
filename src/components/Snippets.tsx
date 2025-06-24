"use client";

import React from "react";
import SnippetCard from "@/components/SnippetCard";
import { Typography, Button } from "@mui/material";
import useSnippetStore from "@/state/store";
import { darkTheme, CssBaseline, ThemeProvider } from "../utils/index";
import { useRouter } from "next/navigation";

const Snippets = () => {
  const router = useRouter();
  const { snippets } = useSnippetStore();
  const handleCreateSnippet = () => {
    router.push("/");
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        <Button
          sx={{
            position: "fixed",
            top: {
              xs: "auto",
              sm: "1rem",
              md: "1rem",
            },
            right: "1rem",
            bottom: {
              xs: "1rem",
              sm: "auto",
              md: "auto",
            },
          }}
          variant="contained"
          onClick={handleCreateSnippet}
          className="z-10"
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
      </div>
    </ThemeProvider>
  );
};

export default Snippets;
