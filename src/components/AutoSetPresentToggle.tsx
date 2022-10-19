import { ToggleButton, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";

interface IAutoSetPresentToggleProps {
  onToggle: () => void;
  isToggled: boolean;
}

const AutoSetPresentToggle = ({
  onToggle,
  isToggled,
}: IAutoSetPresentToggleProps) => {
  const handleSetPresentToggle = () => {
    onToggle();
  };

  return (
    <ToggleButton
      value="check"
      selected={isToggled}
      onChange={handleSetPresentToggle}
      sx={{ mb: 2 }}
    >
      {isToggled ? <CheckIcon /> : <CancelIcon />}{" "}
      <Typography ml={2}>Auto Set Present?</Typography>
    </ToggleButton>
  );
};

export default AutoSetPresentToggle;
