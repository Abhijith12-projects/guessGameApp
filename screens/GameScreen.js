import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useEffect } from "react";
import Title from "../components/Ui/title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/Ui/PrimaryButton";
import InstructionText from "../components/Ui/InstructionText";
import Card from "../components/Ui/Card";
import { Ionicons } from "@expo/vector-icons";

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let min = 1,
  max = 100;
const GameScreen = ({ chosenNumber, onGameOver }) => {
  const initialGuess = generateRandomBetween(1, 100, chosenNumber);
  const [currentGuess, setCurrentGuess] = React.useState(initialGuess);

  useEffect(() => {
    if (currentGuess === chosenNumber) {
      onGameOver();
    }
  }, [currentGuess, chosenNumber, onGameOver]);

  useEffect(() => {
    min = 1;
    max = 100;
  }, []);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < chosenNumber) ||
      (direction === "greater" && currentGuess > chosenNumber)
    ) {
      Alert.alert("Don't lie bro", "it's wrong", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    } else if (chosenNumber === currentGuess) {
    }
    if (direction === "lower") {
      max = currentGuess;
    } else {
      min = currentGuess + 1;
    }
    console.log(min, max);
    const newRndNumber = generateRandomBetween(min, max, currentGuess);
    setCurrentGuess(newRndNumber);
  };

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>
          Higher or lower
        </InstructionText>
        <View style={styles.buttonContainer}>
          <View style={styles.bottonStyle}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
              <Ionicons name="md-remove" size={24} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.bottonStyle}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
              <Ionicons name="md-add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
      {/* <View>LOG ROUNDS</View> */}
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  bottonStyle: {
    flex: 1,
  },
  instructionText: {
    marginBottom: 12,
  },
});
