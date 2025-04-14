import { Button } from "@mui/material";

const SenrtErrorDash = () => {
  return (
    <Button
      variant="contained"
      color="error"
      onClick={() => {
        throw new Error("This is your first error!");
      }}
    >
      Break the world
    </Button>
  );
};

export default SenrtErrorDash;
