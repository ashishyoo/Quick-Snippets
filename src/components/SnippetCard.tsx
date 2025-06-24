import {
  memo,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Button,
  CardActions,
  useSnippetStore,
  useLocalStorage,
  useRouter,
  Snippet,
} from "./index";

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

  useLocalStorage();

  return (
    <Card sx={{ maxWidth: 600 }}>
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
      </CardActions>
    </Card>
  );
};

export default memo(SnippetCard);
