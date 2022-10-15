import { ChildrenProps } from "types";
import { UserProvider } from "./auth";
import { NotificationsProvider } from "./notifications";

const Providers = ({ children }: ChildrenProps) => {
  return (
    <UserProvider>
      <NotificationsProvider>{children}</NotificationsProvider>
    </UserProvider>
  );
};

export default Providers;
