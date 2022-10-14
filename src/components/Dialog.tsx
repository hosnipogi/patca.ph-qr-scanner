import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useUserContext } from "providers/auth";

interface IDialog {
  dialogIsOpen: boolean;
}

export default function FormDialog({ dialogIsOpen }: IDialog) {
  const { signInWithGoogle } = useUserContext();

  const handleSignIn = async () => {
    await signInWithGoogle();
  };

  return (
    <Dialog open={dialogIsOpen} sx={{ padding: 4 }}>
      <DialogActions>
        <Button
          variant="contained"
          onClick={handleSignIn}
          fullWidth
          size="large"
        >
          Sign in with Google
        </Button>
      </DialogActions>
    </Dialog>
  );
}
