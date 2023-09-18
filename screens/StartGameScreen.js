import { TextInput, View, StyleSheet, Alert } from "react-native";
import PrimaryButton from "../components/Ui/PrimaryButton";
import React from "react";
import Colors from "../components/constants/colors";
import Title from "../components/Ui/title";
import Card from "../components/Ui/Card";
import InstructionText from "../components/Ui/InstructionText";

const StartGameScreen = (props) => {
  const [enteredNumber, setEnteredNumber] = React.useState("");

  const inputHandler = (text) => {
    setEnteredNumber(text);
  };
  const resetIinputHandler = () => {
    setEnteredNumber("");
  };

  const confirmInputGandler = () => {
    const chosenNumber = parseInt(enteredNumber);

    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        "Invalid number!",
        "Number has to be a number between 1 and 99",
        [{ text: "Okay", style: "destructive", onPress: resetIinputHandler }]
      );

      return;
    } else {
      props.onConfirmNumber(chosenNumber);
    }
  };

  return (
    <View style={styles.rootContainer}>
      <Title>Guess My Number</Title>
      <Card>
        <InstructionText>Enter a number between 1 and 99</InstructionText>
        <TextInput
          style={styles.numberInput}
          maxLength={2}
          keyboardType="number-pad"
          autoCapitalize="none"
          autoCorrect={false}
          value={enteredNumber}
          onChangeText={inputHandler}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.bottonStyle}>
            <PrimaryButton onPress={resetIinputHandler}>Reset</PrimaryButton>
          </View>
          <View style={styles.bottonStyle}>
            <PrimaryButton onPress={confirmInputGandler}>Confirm</PrimaryButton>
          </View>
        </View>
      </Card>
    </View>
  );
};

export default StartGameScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginTop: 100,
    alignItems: "center",
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
  buttonContainer: {
    flexDirection: "row",
  },
  bottonStyle: {
    flex: 1,
  },
});
