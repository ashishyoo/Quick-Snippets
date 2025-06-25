"use client";

import {
  Typography,
  Button,
  useSnippetStore,
  useRouter,
  useLocalStorage,
} from "./index";
import SnippetCard from "./SnippetCard";

const Snippets = () => {
  const router = useRouter();
  const { snippets, resetSnippet } = useSnippetStore();

  const handleCreateSnippet = () => {
    router.push("/");
  };

  const handleReset = () => {
    resetSnippet();
  };

  useLocalStorage();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
      <Typography variant="h3" className="pb-4">
        All Snippets
      </Typography>
      <div className="flex gap-2 pb-4">
        <Button
          variant="contained"
          onClick={handleCreateSnippet}
          className="z-10"
        >
          Create Snippet
        </Button>
        <Button variant="contained" onClick={handleReset}>
          Reset
        </Button>
      </div>

      {snippets.length > 0 ? (
        snippets.map((snippet) => (
          <SnippetCard key={snippet.id} snippet={snippet} />
        ))
      ) : (
        <Typography>No snippets available</Typography>
      )}
    </div>
  );
};

export default Snippets;
