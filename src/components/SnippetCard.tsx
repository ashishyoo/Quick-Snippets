"use client";

import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Button,
  CardActions,
  useSnippetStore,
  useRouter,
  Snippet,
} from "./index";
import useFetchSnippet from "@/hooks/useFetchSnippet";

const SnippetCard = ({ snippet }: { snippet: Snippet }) => {
  const {
    id,
    data: { name },
  } = snippet;

  const { removeSnippet } = useSnippetStore();
  const router = useRouter();

  const handleRemove = (deleteId: string) => {
    removeSnippet(deleteId);
  };

  const handleCardClick = (cardId: string) => {
    router.push(`/snippets/${cardId}`);
  };

  const handleEdit = (cardId: string) => {
    const readOnly = false;
    const url = `/snippets/${cardId}?readOnly=${readOnly.toString()}`;
    router.push(url);
  };

  useFetchSnippet();

  return (
    <Card className="w-full">
      <CardActionArea onClick={() => handleCardClick(id)}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="error" onClick={() => handleRemove(id)}>
          Remove
        </Button>
        <Button size="small" color="warning" onClick={() => handleEdit(id)}>
          Edit
        </Button>
      </CardActions>
    </Card>
  );
};

export default SnippetCard;
