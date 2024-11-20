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
    facas:false,
    garfos:false,
    guardanapos:false,
    copos: false,
    pratos: false,
    faca: false,
    guardanapo: false,
    bolo: false,
    sorvete: false,
    mousses: false,
    fracionados: false,
    tortas: false,
    salgados: false,
    canapes: false,
    hotdog: false,
    pasteis: false,
    brigadeiros: false,
    cupcakes: false,
    quindim: false,
    gelatina: false,
  });


  
  return { checkedItems, setCheckedItems };
};
