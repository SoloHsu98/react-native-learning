import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Title from "../components/game/ui/Title";
import Colors from "../constants/colors";
import PrimaryButton from "../components/game/ui/PrimaryButton";

export default function GameOverScreen({ roundNum, userNum, onStartNewGame }) {
  return (
    <View style={styles.rootScreen}>
      <Title>GAME OVER</Title>
      <View style={styles.imageContainer}>
        <Image source={require("../assets/success.png")} style={styles.image} />
      </View>
      <Text style={styles.summaryText}>
        Your phone needed <Text style={styles.highlight}>{roundNum}</Text>{" "}
        rounds to guess the number{" "}
        <Text style={styles.highlight}>{userNum}</Text>.
      </Text>
      <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
    </View>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    borderRadius: 125,
    width: 250,
    height: 250,
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: "hidden",
    margin: 36,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  summaryText: {
    fontFamily: "open-sans",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 15,
  },
  highlight: {
    fontFamily: "open-sans-bold",
    color: Colors.primary500,
  },
});
