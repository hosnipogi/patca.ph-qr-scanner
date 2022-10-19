import { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { QrMethod, List } from "components";
import { IMember } from "types";
import { functionSearchUser } from "config";
import { useNotificationsContext } from "providers/notifications";
import AutoSetPresentToggle from "components/AutoSetPresentToggle";

const Ifatca = () => {
  const { handleSuccess, handleError } = useNotificationsContext();

  const [member, setMember] = useState<IMember | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [autoSetPresent, setAutoSetPresent] = useState(false);

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

  const handleAutoSetPresentToggle = () => {
    setAutoSetPresent(!autoSetPresent);
    console.log(autoSetPresent);
  };

  return (
    <>
      <AutoSetPresentToggle
        onToggle={handleAutoSetPresentToggle}
        isToggled={autoSetPresent}
      />
      <QrMethod onReset={handleReset} onScanCapture={handleScanCapture} />
      {member && (
        <List
          member={member}
          onReset={handleReset}
          autoSetPresent={autoSetPresent}
        />
      )}
      {isLoading && (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      )}
    </>
  );
};

export default Ifatca;
