import { useState } from "react";

export const UseFoods = () => {
  const [checkedItems, setCheckedItems] = useState({
    agua: false,
    cerveja: false,
    refrigerante: false,
    suco: false,
    drinks: false,
    arroz: false,
    carnes: false,
    saladas: false,
    farofa: false,
    peixes: false,
    frango: false,
    crustaceo: false,
    colheres: false,
    copos: false,
    pratos: false,
    faca: false,
    guardanapo: false,
    bolo: false,
    sorvete: false,
    mousses: false,
    fracionados: false,
  });


  
  return { checkedItems, setCheckedItems };
};
