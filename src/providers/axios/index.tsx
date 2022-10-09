import { createContext, useState, useContext } from "react";
import { ChildrenProps } from "types";
import AxiosApi from "../../utils/axios";

interface IAxiosApi {
  handleSetApi: (ax: AxiosApi) => void;
  api: AxiosApi | null;
}

const AxiosContext = createContext<IAxiosApi>({} as IAxiosApi);
const AxiosProvider = ({ children }: ChildrenProps) => {
  const [api, setApi] = useState<IAxiosApi["api"]>(null);

  const handleSetApi = (ax: AxiosApi) => {
    setApi(ax);
  };

  const value = {
    handleSetApi,
    api,
  };

  return (
    <AxiosContext.Provider value={value}>{children}</AxiosContext.Provider>
  );
};

export default AxiosProvider;
export const useApiContext = () => useContext(AxiosContext);
