import React, { useState } from "react";
import { StyleSheet, TextInput, View, Alert, Text } from "react-native";
import PrimaryButton from "../components/game/ui/PrimaryButton";
import Colors from "../constants/colors";
import Title from "../components/game/ui/Title";
import Card from "../components/game/ui/Card";
import InstructionText from "../components/game/ui/InstructionText";

export default function StartGameScreen({ onPickNum }) {
  const [enteredValue, setEnteredValue] = useState("");

  const numberInputHandler = (enteredText) => {
    setEnteredValue(enteredText);
  };

  const resetInputHandler = () => {
    setEnteredValue("");
  };
  const confirmInputHandler = () => {
    console.log("enteredValue", enteredValue);
    const chosenNum = parseInt(enteredValue);
    console.log("chosen Num", chosenNum);
    if (isNaN(chosenNum) || chosenNum <= 0 || chosenNum > 99) {
      Alert.alert(
        "Invalid Number!", // title
        "Number has to be a number between 1 and 99", //body text
        [{ text: "Okay", style: "destructive", onPress: resetInputHandler }] // button style and functions for btn
      );
      return;
    }
    onPickNum(chosenNum);
  };
  return (
    <View style={styles.rootContainer}>
      <Title>Guess My Number</Title>
      <Card>
        <InstructionText>Enter a Number</InstructionText>
        <TextInput
          style={styles.numberInput}
          maxLength={2}
          keyboardType="number-pad"
          autoCapitalize="none"
          autoCorrect={false}
          value={enteredValue}
          onChangeText={numberInputHandler}
        />
        <View style={styles.btnContainers}>
          <View style={styles.btnContainer}>
            <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
          </View>
          <View style={styles.btnContainer}>
            <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
          </View>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginTop: 100,
    alignItems: "center",
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    marginTop: 36,
    marginHorizontal: 24,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    elevation: 4, //android only property boxShadow
    shadowColor: "red", // this four shadow properties applies in ios and for ios
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },

  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: "bold",
    textAlign: "center",
  },
  btnContainers: {
    flexDirection: "row",
  },
  btnContainer: {
    flex: 1,
  },
});
