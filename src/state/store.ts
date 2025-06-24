import { Snippet } from "@/types/snippet";
import { create } from "zustand";

const getLocalSnippets = (): Snippet[] => {
  if (typeof window !== "undefined" && window.localStorage) {
    const storedSnippets = localStorage.getItem("snippets");
    return storedSnippets ? JSON.parse(storedSnippets) : [];
  }
  return [];
};

interface SnippetState {
  snippets: Snippet[];
  addSnippet: (snippet: Snippet) => void;
  removeSnippet: (snippetId: string) => void;
  updateSnippet: (updatedSnippet: Snippet) => void;
}

const useSnippetStore = create<SnippetState>((set) => ({
  snippets: getLocalSnippets(),
  addSnippet: (snippet) =>
    set((state) => ({ snippets: [...state.snippets, snippet] })),
  removeSnippet: (snippetId) =>
    set((state) => ({
      snippets: state.snippets.filter((snippet) => snippet.id !== snippetId),
    })),
  updateSnippet: (updatedSnippet) =>
    set((state) => ({
      snippets: state.snippets.map((snippet) =>
        snippet.id === updatedSnippet.id ? updatedSnippet : snippet
      ),
    })),
}));

export default useSnippetStore;
