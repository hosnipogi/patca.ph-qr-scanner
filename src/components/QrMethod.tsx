import { useState } from "react";
import {
  Stack,
  Box,
  Typography,
  CircularProgress,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useUserContext } from "providers/auth";
import { QrMethodType } from "../types";
import QrForm from "./QrForm";
import QrCamera from "./QrCamera";
import { useNotificationsContext } from "providers/notifications";

interface IQrMethodProps {
  onReset: () => void;
  onScanCapture: (id: string) => void;
}

const QrMethod = ({ onReset, onScanCapture }: IQrMethodProps) => {
  const { user } = useUserContext();
  const { dialogIsOpen } = useNotificationsContext();
  const [cameraUnmounting, setCameraUnmount] = useState(false);
  const [qrMethod, setQrMethod] = useState<QrMethodType>("scanner");

  const handleSetQrMethod = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as QrMethodType;
    onReset();
    setCameraUnmount(true);
    setTimeout(() => {
      setQrMethod(value);
    }, 100);
  };

  const handleScanCapture = (id: string) => {
    onScanCapture(id);
  };

  const renderQrMethod = (value: QrMethodType) => {
    switch (value) {
      case "scanner": {
        return (
          <QrForm
            onSubmit={handleScanCapture}
            clickAnywhereListenerEnable={!dialogIsOpen}
          />
        );
      }
      case "webcam": {
        return (
          <QrCamera
            onScan={handleScanCapture}
            isUnmounting={cameraUnmounting}
          />
        );
      }

      default:
        return null;
    }
  };

  return (
    <Stack gap={2} mb={4}>
      <Box>
        <Typography fontSize={16}>
          Logged in: {user ? <>{user?.name}</> : <CircularProgress size={12} />}
        </Typography>
        <Typography fontSize={16}>{new Date().toLocaleDateString()}</Typography>
      </Box>
      <Box>
        <FormControl>
          <FormLabel id="qrMethod">Select Method of QR Scanning</FormLabel>
          <RadioGroup
            aria-labelledby="qrMethod"
            name="qrMethod-group"
            value={qrMethod}
            onChange={handleSetQrMethod}
          >
            <FormControlLabel
              value="scanner"
              control={<Radio />}
              label="Scanner"
            />
            <FormControlLabel
              value="webcam"
              control={<Radio />}
              label="Webcam"
            />
          </RadioGroup>
        </FormControl>
      </Box>
      {renderQrMethod(qrMethod)}
    </Stack>
  );
};

export default QrMethod;
