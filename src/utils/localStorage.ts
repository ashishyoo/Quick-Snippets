import { Snippet } from "@/types/snippet";

export const saveToLocal = (snippets: Snippet[]) => {
  localStorage.setItem("snippets", JSON.stringify(snippets));
};
