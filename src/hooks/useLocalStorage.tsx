"use client";

import useSnippetStore from "@/state/store";
import { saveToLocal } from "@/utils/localStorage";
import { useEffect } from "react";

const useLocalStorage = () => {
  const { snippets } = useSnippetStore();
  useEffect(() => saveToLocal(snippets), [snippets]);
};

export default useLocalStorage;
