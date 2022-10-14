import { useEffect, useState } from "react";
import logo from "./assets/logo.png";
import {
  Box,
  Container,
  Stack,
  CircularProgress,
  Divider,
  AlertProps,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Typography,
} from "@mui/material";
import type { IMember, QrMethodType } from "./types";
import { List, Dialog, QrCamera, QrForm, Snackbar } from "./components";
import { functionSearchUser } from "./config";
import { useUserContext } from "providers/auth";

function App() {
  const [member, setMember] = useState<IMember | null>(null);
  const [qrMethod, setQrMethod] = useState<QrMethodType>("scanner");
  const [isLoading, setIsLoading] = useState(false);
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [cameraUnmounting, setCameraUnmount] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("Test");
  const [snackbarSeverity, setSnackbarSeverity] =
    useState<AlertProps["severity"]>("success");

  // const { api, handleSetApi } = useApiContext();
  const { signInWithGoogle, signOut, user } = useUserContext();

  /************* USE EFFECT *************/

  useEffect(() => {
    let timeout: any;
    if (!user) {
      timeout = setTimeout(() => {
        setDialogIsOpen(true);
      }, 1500);
    } else {
      setDialogIsOpen(false);
    }

    return () => clearTimeout(timeout);
  }, [user]);

  useEffect(() => {
    let timeout: any;
    if (member) {
      timeout = setTimeout(() => {
        handleReset();
      }, 60000 * 3);
    }
    return () => clearTimeout(timeout);
  }, [member]);

  /************* SNACK BAR *************/

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

  /************* QR SCAN API *************/

  const handleScanCapture = async (id: string) => {
    try {
      handleReset();
      const resp = await fetchData(id);
      handleSuccess("Success");
      setMember({ ...resp, id });
      setIsLoading(false);

      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    } catch (e) {
      setIsLoading(false);
      if (e instanceof Error) {
        handleError(e.message);
      }
    }
  };

  const fetchData = async (id: string) => {
    setIsLoading(true);
    const { data } = await functionSearchUser(id);
    return data;
  };

  const handleReset = () => {
    setMember(null);
  };

  /************* QR COMPONENT *************/

  const handleSetQrMethod = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as QrMethodType;
    handleReset();
    setCameraUnmount(true);
    setTimeout(() => {
      setQrMethod(value);
    }, 100);
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
    <Container maxWidth={false} sx={{ bgcolor: "#ccc" }}>
      <Dialog dialogIsOpen={dialogIsOpen} />
      <Snackbar
        open={snackbarOpen}
        message={snackbarMessage}
        handleSetOpen={handleSnackbarOpen}
        severity={snackbarSeverity}
      />
      <Container
        maxWidth="lg"
        sx={{ bgcolor: "#fff", minHeight: "100vh", py: 4 }}
      >
        <Stack gap={4}>
          <Box textAlign="right">
            {user ? (
              <Button
                onClick={signOut}
                variant="outlined"
                sx={{ minWidth: 140, fontSize: 12 }}
              >
                Signout google
              </Button>
            ) : (
              <Button
                onClick={signInWithGoogle}
                variant="outlined"
                sx={{ minWidth: 140, fontSize: 12 }}
              >
                Sign in with Google
              </Button>
            )}
          </Box>
          <Box textAlign="center">
            <img
              src={logo}
              alt="logo"
              style={{ maxWidth: 400, height: 180, objectFit: "contain" }}
            />
          </Box>
          {user ? (
            <>
              <Divider />
              <Stack gap={2}>
                <Box>
                  <Typography fontSize={16}>
                    Logged in:{" "}
                    {user ? <>{user?.name}</> : <CircularProgress size={12} />}
                  </Typography>
                  <Typography fontSize={16}>
                    {new Date().toLocaleDateString()}
                  </Typography>
                </Box>
                <Box>
                  <FormControl>
                    <FormLabel id="qrMethod">
                      Select Method of QR Scanning
                    </FormLabel>
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
              </Stack>
              {renderQrMethod(qrMethod)}
              {member && (
                <List
                  member={member}
                  onReset={handleReset}
                  onError={handleError}
                  onSuccess={handleSuccess}
                />
              )}
              {isLoading && (
                <Box sx={{ display: "flex" }}>
                  <CircularProgress />
                </Box>
              )}
            </>
          ) : (
            <Box width="100%">
              <Typography textAlign="center">
                Please sign in to continue.
              </Typography>
            </Box>
          )}
        </Stack>
      </Container>
    </Container>
  );
}

export default App;
