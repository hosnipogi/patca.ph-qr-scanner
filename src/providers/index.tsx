import AxiosProvider from "./axios";
import { ChildrenProps } from "types";
import { ThemeProvider } from "@mui/material";

const Providers = ({ children }: ChildrenProps) => {
  return <AxiosProvider>{children}</AxiosProvider>;
};

export default Providers;
