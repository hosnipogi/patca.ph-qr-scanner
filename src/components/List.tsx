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
import { IMember } from "../types/";
import { Endpoints, functionUrl } from "../config";

import styled from "@emotion/styled";
import { useApiContext } from "providers/axios";
import axios from "axios";

interface IList {
  member: IMember;
  onReset: () => void;
  onError: (message: string) => void;
  onSuccess: (message: string) => void;
}

const ListComponent = ({ member, onReset, onError, onSuccess }: IList) => {
  const [isPaid, setIsPaid] = useState(
    member.isPaid || member.methodOfPayment !== "Pay Later"
  );

  const [receivedSouvenir, setReceivedSouvenir] = useState(
    member.receivedSouvenir
  );
  const [attendanceDay1, setAttendanceDay1] = useState(member.isPresentDay1);
  const [attendanceDay2, setAttendanceDay2] = useState(member.isPresentDay2);
  const [attendanceDay3, setAttendanceDay3] = useState(member.isPresentDay3);

  const [loadingUpdateAttendance, setLoadingUpdateAttendance] = useState(false);
  const [loadingUpdatePayment, setLoadingUpdatePayment] = useState(false);
  const [loadingUpdateSouvenir, setLoadingUpdateSouvenir] = useState(false);

  const { api } = useApiContext();

  /***************** API ****************/

  const handleUpdateAttendance = async () => {
    try {
      setLoadingUpdateAttendance(true);
      const body = { id: member.id };
      if (!api) throw new Error("axios not instantiated");
      const { data, status } = await api.axios.post<{
        message: string;
        dayNum: number;
      }>(`${functionUrl}/${Endpoints.UPDATE_ATTENDANCE}`, body);

      onSuccess(data.message);
      if (status === 200) {
        console.log({ dayNum: data.dayNum });
        switch (data.dayNum) {
          case 1: {
            setAttendanceDay1(true);
            break;
          }
          case 2: {
            setAttendanceDay2(true);
            break;
          }
          case 3: {
            setAttendanceDay3(true);
            break;
          }
          default: {
            break;
          }
        }
        setLoadingUpdateAttendance(false);
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        onError(e.response?.data);
      }
      setLoadingUpdateAttendance(false);
    }
  };

  const handleUpdatePayment = async () => {
    try {
      setLoadingUpdatePayment(true);
      const body = { id: member.id };
      if (!api) throw new Error("axios not instantiated");

      const { data, status } = await api.axios.post(
        `${functionUrl}/${Endpoints.UPDATE_PAYMENT}`,
        body
      );

      onSuccess(data);
      if (status === 200) {
        setIsPaid(true);
        setLoadingUpdatePayment(false);
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        onError(e.response?.data);
      }
      setLoadingUpdatePayment(false);
    }
  };

  const handleUpdateReceivedSouvenir = async () => {
    try {
      setLoadingUpdateSouvenir(true);
      const body = { id: member.id };
      if (!api) throw new Error("axios not instantiated");
      const { data, status } = await api.axios.post(
        `${functionUrl}/${Endpoints.UPDATE_SOUVENIR}`,
        body
      );

      onSuccess(data);
      if (status === 200) {
        setReceivedSouvenir(true);
        setLoadingUpdateSouvenir(false);
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        onError(e.response?.data);
      }
      setLoadingUpdateSouvenir(false);
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
        <ListItem divider dense>
          <LiText
            primary={`(${member.designation.toUpperCase()}) ${member.fullname}`}
            secondary="Fullname"
          />
          <LiText primary={member.email} secondary="Email" />
          <LiText
            primary={member.methodOfPayment === "Sponsored" ? "✅" : "❌"}
            secondary="Is Sponsored"
          />
        </ListItem>
        <ListItem divider dense>
          <LiText
            primary={member.methodOfPayment}
            secondary="Method of Payment"
          />
          <LiText primary={isPaid ? "✅" : "❌"} secondary="Is Paid" />
          <LiText
            primary={receivedSouvenir ? "✅" : "❌"}
            secondary="Has Received Souvenir"
          />
        </ListItem>
        <ListItem divider dense>
          <LiText
            primary={`${member.city} city, ${member.country}`}
            secondary="City"
          />
          <LiText primary={member.memberAssoc} secondary="Association" />
          <LiText
            primary={`${member.company}, ${member.jobTitle}`}
            secondary="Company & Job Title"
          />
        </ListItem>
        <ListItem divider dense>
          <LiText primary={attendanceDay1 ? "✅" : "❌"} secondary="Day 1" />
          <LiText primary={attendanceDay2 ? "✅" : "❌"} secondary="Day 2" />
          <LiText primary={attendanceDay3 ? "✅" : "❌"} secondary="Day 3" />
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
          <LoadingButton
            variant="outlined"
            onClick={handleUpdatePayment}
            loading={loadingUpdatePayment}
            disabled={isPaid}
          >
            Update Payment
          </LoadingButton>
          <LoadingButton
            variant="outlined"
            onClick={handleUpdateReceivedSouvenir}
            loading={loadingUpdateSouvenir}
            disabled={receivedSouvenir}
          >
            Update Received Souvenir
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
