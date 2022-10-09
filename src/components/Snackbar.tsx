import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import { Alert, AlertProps } from "@mui/material";

interface ISnackbar {
  open: boolean;
  message: string;
  severity: AlertProps["severity"];
  handleSetOpen: (bool: boolean) => void;
}
export default function SimpleSnackbar({
  open,
  message,
  handleSetOpen,
  severity,
}: ISnackbar) {
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    // if (reason === "clickaway") {
    //   handleSetOpen(false);
    //   return;
    // }

    handleSetOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ horizontal: "left", vertical: "top" }}
      sx={{ paddingLeft: 2 }}
    >
      <Alert onClose={handleClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
}
