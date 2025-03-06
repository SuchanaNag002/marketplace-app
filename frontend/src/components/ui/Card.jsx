import { Card as MuiCard, CardContent, Typography } from "@mui/material";

const Card = ({ title, description }) => {
  return (
    <MuiCard className="p-4">
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2">{description}</Typography>
      </CardContent>
    </MuiCard>
  );
};

export default Card;