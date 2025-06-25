import { Snippet } from "@/types/snippet";
import { create } from "zustand";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "@/config/firebase.config";

// const getLocalSnippets = (): Snippet[] => {
//   if (typeof window !== "undefined" && window.localStorage) {
//     const storedSnippets = localStorage.getItem("snippets");
//     return storedSnippets ? JSON.parse(storedSnippets) : [];
//   }
//   return [];
// };

interface SnippetState {
  snippets: Snippet[];
  fetchSnippets: () => Promise<void>;
  addSnippet: (snippet: Snippet) => Promise<void>;
  removeSnippet: (snippetId: string) => Promise<void>;
  updateSnippet: (updatedSnippet: Snippet) => Promise<void>;
  resetSnippet: () => void;
}

const useSnippetStore = create<SnippetState>((set) => ({
  snippets: [],
  fetchSnippets: async () => {
    const user = auth.currentUser;
    if (!user) {
      set({ snippets: [] });
      return;
    }

    const snippetsRef = collection(db, "users", user.uid, "snippets");
    const response = await getDocs(snippetsRef);
    const snippets: Snippet[] = response.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Snippet[];

    set({ snippets });
  },

  addSnippet: async (snippet) => {
    const user = auth.currentUser;
    if (!user) return;
    const snippetsRef = collection(db, "users", user.uid, "snippets");
    const { ...docData } = snippet;
    const docRef = await addDoc(snippetsRef, docData);
    set((state) => ({
      snippets: [...state.snippets, { ...docData, id: docRef.id }],
    }));
  },

  removeSnippet: async (snippetId) => {
    const user = auth.currentUser;
    if (!user) return;
    const snippetDocRef = doc(db, "users", user.uid, "snippets", snippetId);
    await deleteDoc(snippetDocRef);
    set((state) => ({
      snippets: state.snippets.filter((snippet) => snippet.id !== snippetId),
    }));
  },

  updateSnippet: async (updatedSnippet) => {
    const user = auth.currentUser;
    if (!user) return;
    const snippetDocRef = doc(
      db,
      "users",
      user.uid,
      "snippets",
      updatedSnippet.id
    );
    const { ...docData } = updatedSnippet;
    await updateDoc(snippetDocRef, docData);

    set((state) => ({
      snippets: state.snippets.map((snippet) =>
        snippet.id === updatedSnippet.id ? updatedSnippet : snippet
      ),
    }));
  },

  resetSnippet: () =>
    set(() => ({
      snippets: [],
    })),
}));

export default useSnippetStore;
