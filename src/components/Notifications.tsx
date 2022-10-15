import { Dialog, Snackbar } from "components";
import { useNotificationsContext } from "providers/notifications";

const Notifications = () => {
  const { dialogIsOpen, snackbarOpen, snackbarMessage, snackbarSeverity } =
    useNotificationsContext();
  return (
    <>
      <Dialog dialogIsOpen={dialogIsOpen} />
      <Snackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
    </>
  );
};

export default Notifications;
