import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";

interface IDialog {
  dialogIsOpen: boolean;
  onDialogSubmit: (val: string) => void;
}

export default function FormDialog({ dialogIsOpen, onDialogSubmit }: IDialog) {
  const [basicPass, setBasicPass] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onDialogSubmit(basicPass);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setBasicPass(val);
  };

  return (
    <Dialog open={dialogIsOpen}>
      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Enter Password"
            type="password"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button type="submit" variant="contained" sx={{ ml: 2, height: 40 }}>
            Submit
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
