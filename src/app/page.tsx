"use client";

import React from "react";
import { darkTheme, CssBaseline, ThemeProvider } from "../utils/index";
import CreateSnippet from "@/components/CreateSnippet";
import { Button } from "@mui/material";

const page = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="min-h-screen w-full flex items-center justify-center relative">
        <Button
          sx={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
          }}
          variant="contained"
          className="absolute top-4 right-4"
        >
          View Snippets
        </Button>
        <CreateSnippet />
      </div>
    </ThemeProvider>
  );
};

export default page;
