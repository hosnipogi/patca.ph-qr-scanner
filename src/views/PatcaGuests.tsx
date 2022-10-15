import { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { QrMethod, ListPatcaGuests as List } from "components";
import { IPatcaGuest } from "types";
import { functionPatcaSearchUser } from "config";
import { useNotificationsContext } from "providers/notifications";

const Ifatca = () => {
  const { handleSuccess, handleError } = useNotificationsContext();

  const [member, setMember] = useState<IPatcaGuest | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let timeout: any;
    if (member) {
      timeout = setTimeout(() => {
        handleReset();
      }, 60000 * 3);
    }
    return () => clearTimeout(timeout);
  }, [member]);

  const handleScanCapture = async (id: string) => {
    try {
      handleReset();
      const resp = await fetchData(id);
      console.log({ resp });
      handleSuccess("Success");
      setMember({ ...resp });
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
    const { data } = await functionPatcaSearchUser(id);
    return data;
  };

  const handleReset = () => {
    setMember(null);
  };

  return (
    <>
      <QrMethod onReset={handleReset} onScanCapture={handleScanCapture} />
      {member && <List member={member} onReset={handleReset} />}
      {isLoading && (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      )}
    </>
  );
};

export default Ifatca;
