import { useState } from "react";
import { AlertProps } from "@mui/material";
import { createContext, useContext } from "react";
import { ChildrenProps } from "types";

interface NotificationsProps {
  snackbarOpen: boolean;
  snackbarMessage: string;
  snackbarSeverity: AlertProps["severity"];
  dialogIsOpen: boolean;
  handleSetDialogOpen: (bool: boolean) => void;
  handleSetSnackbarOpen: (bool: boolean) => void;
  handleError: (message: string) => void;
  handleSuccess: (message: string) => void;
}

const NotificationsContext = createContext({} as NotificationsProps);

export const NotificationsProvider = ({ children }: ChildrenProps) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("Test");
  const [snackbarSeverity, setSnackbarSeverity] =
    useState<AlertProps["severity"]>("success");
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const handleError = (message: string) => {
    handleSnackbarOpen(true);
    setSnackbarSeverity("error");
    setSnackbarMessage(message);
  };

  const handleSuccess = (message: string) => {
    handleSnackbarOpen(true);
    setSnackbarSeverity("success");
    setSnackbarMessage(message);
  };

  const handleSnackbarOpen = (bool: boolean) => {
    setSnackbarOpen(bool);
    setTimeout(() => {
      setSnackbarOpen(false);
    }, 30000);
  };

  const handleSetDialogOpen = (bool: boolean) => {
    setDialogIsOpen(bool);
  };

  const handleSetSnackbarOpen = (bool: boolean) => {
    setSnackbarOpen(bool);
  };

  const value = {
    snackbarOpen,
    snackbarMessage,
    snackbarSeverity,
    dialogIsOpen,
    handleError,
    handleSuccess,
    handleSetDialogOpen,
    handleSetSnackbarOpen,
  };

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotificationsContext = () => useContext(NotificationsContext);
