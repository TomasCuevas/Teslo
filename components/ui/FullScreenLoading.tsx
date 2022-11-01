import { CircularProgress } from "@mui/material";

export const FullScreenLoading = () => {
  return (
    <div className="absolute top-0 left-0 flex h-screen w-screen items-center justify-center">
      <CircularProgress />
    </div>
  );
};
