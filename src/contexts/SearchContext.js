import { createContext, useContext } from "react";

export const SearchContext = createContext(null);

const useSearchContext = () => {
  return useContext(SearchContext);
};

export default useSearchContext;
