import { useState } from "react";

export const useGuests = () => {
  const [adults, setAdults] = useState(0);
  const [childs, setChilds] = useState(0);

  return {
    adults,
    setAdults,
    childs,
    setChilds,
  };
};
