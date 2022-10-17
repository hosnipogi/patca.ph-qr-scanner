import { useEffect } from "react";
import { Container, Stack, Box, Button, Typography } from "@mui/material";
import { useUserContext } from "providers/auth";
import logo from "assets/logo.png";
import Notifications from "components/Notifications";
import { useNotificationsContext } from "providers/notifications";
import Navigation from "components/Navigation";

const Layout = () => {
  const { user, signOut, signInWithGoogle } = useUserContext();
  const { handleSetDialogOpen } = useNotificationsContext();

  useEffect(() => {
    let timeout: any;
    if (!user) {
      timeout = setTimeout(() => {
        handleSetDialogOpen(true);
      }, 1200);
    } else {
      handleSetDialogOpen(false);
    }

    return () => clearTimeout(timeout);
  }, [user]);

  return (
    <Container maxWidth={false} sx={{ bgcolor: "#ccc" }}>
      <Notifications />
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
                Sign out
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
          <Box textAlign="center" width={"100%"} height={180}>
            <img
              src={logo}
              alt="logo"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </Box>

          {user ? (
            <Navigation />
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
};

export default Layout;
