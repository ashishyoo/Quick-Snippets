"use client";

import { auth } from "@/config/firebase.config";
import useSnippetStore from "@/state/store";
import { useEffect } from "react";

const useFetchSnippet = () => {
  const fetchSnippet = useSnippetStore((state) => state.fetchSnippets);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        fetchSnippet();
      }
    });
  }, [fetchSnippet]);
};

export default useFetchSnippet;
