import { useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { IPatcaGuest } from "../types/";

import styled from "@emotion/styled";

import { functionPatcaUpdateAttendance } from "../config";
import { useNotificationsContext } from "providers/notifications";

interface IList {
  member: IPatcaGuest;
  onReset: () => void;
}

const ListComponent = ({ member, onReset }: IList) => {
  const { handleError, handleSuccess } = useNotificationsContext();

  const [loadingUpdateAttendance, setLoadingUpdateAttendance] = useState(false);

  /***************** API ****************/

  const handleUpdateAttendance = async () => {
    try {
      setLoadingUpdateAttendance(true);

      const { data } = await functionPatcaUpdateAttendance(member.id);

      console.log(data.message);
      if (data.message === 200) {
        handleSuccess("SUCCESS");
      } else {
        throw new Error("ERROR GS");
      }

      setLoadingUpdateAttendance(false);
    } catch (e) {
      if (e instanceof Error) {
        handleError(e.message);
      }
      setLoadingUpdateAttendance(false);
    }
  };

  const handleReset = () => {
    onReset();
  };

  return (
    <Box>
      <Typography>
        Scanned Results for{" "}
        <span
          style={{ fontFamily: "monospace", fontSize: 14, fontWeight: 600 }}
        >
          {member.id}
        </span>
      </Typography>
      <List sx={{ gap: 0 }}>
        <ListItem divider sx={{ py: 2 }}>
          <LiText primary={member.name} secondary="Fullname" />
          <LiText primary={member.wiresign} secondary="Wiresign" />
        </ListItem>
        <ListItem divider sx={{ py: 2 }}>
          <LiText primary={member.d0} secondary="Day 0" />
          <LiText primary={member.d1} secondary="Day 1" />
          <LiText primary={member.d2} secondary="Day 2" />
          <LiText primary={member.d3} secondary="Day 3" />
        </ListItem>
      </List>

      {/* BUTTON GROUPPP */}

      <Stack justifyContent="center" alignItems="center" marginY={4}>
        <ButtonGroup size="large">
          <LoadingButton
            variant="outlined"
            onClick={handleUpdateAttendance}
            loading={loadingUpdateAttendance}
          >
            Set Present
          </LoadingButton>

          <Button onClick={handleReset}>Reset</Button>
        </ButtonGroup>
      </Stack>
    </Box>
  );
};

export default ListComponent;

const LiText = styled(ListItemText)`
  width: 50px;
`;
