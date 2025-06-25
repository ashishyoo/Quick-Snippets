"use client";

import useFetchSnippet from "@/hooks/useFetchSnippet";
import { Typography, Button, useSnippetStore, useRouter } from "./index";
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

  useFetchSnippet();

  // if (loading) {
  //   return <Typography>Loading</Typography>;
  // }

  return (
    <div>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        {snippets.length > 0 ? (
          snippets.map((snippet) => (
            <SnippetCard key={snippet.id} snippet={snippet} />
          ))
        ) : (
          <Typography>No snippets available</Typography>
        )}
      </div>
    </div>
  );
};

export default Snippets;
