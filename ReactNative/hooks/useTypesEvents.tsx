import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

export const UseTypesEvents = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const typeMap = [
    "Casamento",
    "Aniversário",
    "Viagem",
    "Role / Festas",
    "Outro",
  ];

  const toggleSelect = async (index: number) => {
    setSelectedIndex(index);
  };

  return { selectedIndex, toggleSelect };
};
