import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import { Alert, AlertProps } from "@mui/material";
import { useNotificationsContext } from "providers/notifications";

interface ISnackbar {
  open: boolean;
  message: string;
  severity: AlertProps["severity"];
}
export default function SimpleSnackbar({ open, message, severity }: ISnackbar) {
  const { handleSetSnackbarOpen } = useNotificationsContext();
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    handleSetSnackbarOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      anchorOrigin={{ horizontal: "center", vertical: "top" }}
      sx={{ paddingLeft: 2, height: "100%" }}
    >
      <Alert onClose={handleClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
}
