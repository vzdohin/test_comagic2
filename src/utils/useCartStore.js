import { useContext } from "react";
import { StoreContext } from "./storeContext";

export const useCartStore = () => {
  const store = useContext(StoreContext);
  return store;
};
