import { Box, CircularProgress } from "@mui/material";

export const FullScreenLoading = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <CircularProgress />
    </div>
  );
};
