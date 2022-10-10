import AxiosProvider from "./axios";
import { ChildrenProps } from "types";

const Providers = ({ children }: ChildrenProps) => {
  return <AxiosProvider>{children}</AxiosProvider>;
};

export default Providers;
