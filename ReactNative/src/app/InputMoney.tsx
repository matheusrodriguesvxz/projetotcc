import React, { useEffect, useState } from "react";
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  type TextInputProps,
} from "react-native";

const DECIMAL_SIZE = 2;

interface InputMoneyProps extends TextInputProps {
  placeholder?: string;
  editable?: boolean;
  style?: object;
  value: number;
  onChange: (value: number) => void;
  addonBefore?: string;
}

const InputMoney = ({
  value,
  onChange,
  addonBefore = "R$",
  style,
  ...props
}: InputMoneyProps) => {
  const [currentValue, setCurrentValue] = useState<string>(`${value}`);

  useEffect(() => {
    const valueString = `${value}`;
    if (!/\D/.test(valueString.replace(".", ""))) {
      setCurrentValue(value.toFixed(DECIMAL_SIZE).toString().replace(".", ","));
    }
  }, [value]);

  const handleOnChange = (text: string) => {
    const valueRemoved = text.replace(",", "").replace(/\D/g, "");
    const sizeSlice = valueRemoved.length - DECIMAL_SIZE;

    if (sizeSlice >= 0) {
      const newValue = Number.parseFloat(
        [
          valueRemoved.slice(0, sizeSlice),
          ".",
          valueRemoved.slice(sizeSlice),
        ].join("")
      );
      onChange(newValue);
    }

    const formattedValue = [
      valueRemoved.slice(0, sizeSlice),
      ",",
      valueRemoved.slice(sizeSlice),
    ].join("");
    setCurrentValue(formattedValue);
  };

  return (
    <View style={[styles.container, style]}>
      {addonBefore && <Text style={styles.addonBefore}>{addonBefore}</Text>}
      <TextInput
        style={styles.input}
        value={currentValue}
        onChangeText={handleOnChange}
        {...props}
      />
    </View>
  );
};

export default InputMoney;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 80,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 4,
  },
  addonBefore: {
    marginTop: 25,
    fontSize: 24,
    color: "#000",
    fontFamily: "Poppins",
    fontWeight: "bold",
  },
  input: {
    fontSize: 24,
    fontFamily: "Poppins",
    fontWeight: "bold",
    color: "#760BFF",
    flex: 1,
  },
});
