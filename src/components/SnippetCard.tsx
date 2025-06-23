import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import { Snippet } from "@/types/snippet";
import useSnippetStore from "@/state/store";

const SnippetCard = ({ snippet }: { snippet: Snippet }) => {
  console.log(snippet);
  const {
    id,
    data: { name },
  } = snippet;
  const { removeSnippet } = useSnippetStore();

  const handleRemove = (deleteId: string) => {
    removeSnippet(deleteId);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
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

export default SnippetCard;
