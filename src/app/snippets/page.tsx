import { Typography } from "@mui/material";
import Snippets from "@/components/Snippets";

const page = () => {
  return (
    <div className="p-6">
      <Typography variant="h3" className="pb-6">
        All Snippets
      </Typography>
      <Snippets />
    </div>
  );
};

export default page;
