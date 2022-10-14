import { ChildrenProps } from "types";
import { UserProvider } from "./auth";

const Providers = ({ children }: ChildrenProps) => {
  return <UserProvider>{children}</UserProvider>;
};

export default Providers;
