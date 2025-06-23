"use client";

import React from "react";
import { darkTheme, CssBaseline, ThemeProvider } from "../utils/index";
import CreateSnippet from "@/components/CreateSnippet";

const page = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="min-h-screen w-full flex items-center justify-center relative">
        <CreateSnippet />
      </div>
    </ThemeProvider>
  );
};

export default page;
