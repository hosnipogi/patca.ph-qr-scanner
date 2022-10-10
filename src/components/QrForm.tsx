import { Box, Button, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

interface IQrForm {
  clickAnywhereListenerEnable: boolean;
  onSubmit: (e: string) => void;
}
const QrForm = ({ onSubmit, clickAnywhereListenerEnable }: IQrForm) => {
  const [id, setId] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const inp = inputRef.current;
    const focusInput = () => {
      inp?.focus();
    };

    if (clickAnywhereListenerEnable) {
      window.addEventListener("click", focusInput);
      return () => window.removeEventListener("click", focusInput);
    }
  }, [clickAnywhereListenerEnable]);

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {};
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setId(value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(id);
    setId("");
    setTimeout(() => {
      setDisabled(false);
    }, 3000);
    setDisabled(true);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        label="QR Code"
        type="text"
        inputRef={inputRef}
        autoFocus
        onChange={handleInputChange}
        onKeyDown={handleEnter}
        size="small"
        sx={{ height: 40 }}
        value={id}
      />

      <Button
        type="submit"
        disabled={!id || disabled}
        variant="contained"
        sx={{ ml: 2, height: 40 }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default QrForm;
