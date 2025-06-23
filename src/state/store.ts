import { Snippet } from "@/types/snippet";
import { create } from "zustand";

interface SnippetState {
  snippets: Snippet[];
  addSnippet: (snippet: Snippet) => void;
  removeSnippet: (snippetId: string) => void;
}

const localSnippets = localStorage.getItem("snippets");

const useSnippetStore = create<SnippetState>((set) => ({
  snippets: localSnippets ? JSON.parse(localSnippets) : [],
  addSnippet: (snippet) =>
    set((state) => ({ snippets: [...state.snippets, snippet] })),
  removeSnippet: (snippetId) =>
    set((state) => ({
      snippets: state.snippets.filter((snippet) => snippet.id !== snippetId),
    })),
}));

export default useSnippetStore;
