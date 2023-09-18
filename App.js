import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import StartGameScreen from "./screens/StartGameScreen";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import GameScreen from "./screens/GameScreen";
import Colors from "./components/constants/colors";
import GameOverScreen from "./screens/GameOverScreen";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

export default function App() {
  const [userNumber, setUserNumber] = React.useState();
  const [gameIsOver, setGameIsOver] = React.useState(true);
  const [guessRounds, setguessRounds] = React.useState(0);

  const [fontsLoader] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!fontsLoader) {
    return <AppLoading />;
  }

  const pickedNumberHandler = (pickedNumber) => {
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  };
  function gameOverHandler() {
    setGameIsOver(true);
  }
  function newGameHandler() {
    setUserNumber(null);
    setguessRounds(0);
  }

  let screen = <StartGameScreen onConfirmNumber={pickedNumberHandler} />;
  if (userNumber) {
    screen = (
      <GameScreen chosenNumber={userNumber} onGameOver={gameOverHandler} />
    );
  }
  if (userNumber && gameIsOver) {
    screen = (
      <GameOverScreen
        userNumber={userNumber}
        rounds={guessRounds}
        onStartNewGame={newGameHandler}
      />
    );
  }

  return (
    <LinearGradient
      colors={[Colors.primary800, Colors.accent500]}
      style={styles.rootScreen}
    >
      <ImageBackground
        resizeMode="cover"
        source={require("./assets/images/background.png")}
        style={styles.rootScreen}
        imageStyle={styles.backgroundImageStyle}
      >
        <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImageStyle: {
    opacity: 0.51,
  },
});
