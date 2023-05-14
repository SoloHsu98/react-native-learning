import React, { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import Title from "../components/game/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/game/ui/PrimaryButton";
import Card from "../components/game/ui/Card";
import InstructionText from "../components/game/ui/InstructionText";
import { Ionicons } from "@expo/vector-icons";
import GuessLogItem from "../components/game/GuessLogItem";
function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let minBoundary = 1;
let maxBoundary = 100;
export default function GameScreen({ userNum, onGameOver }) {
  const initialGuess = generateRandomBetween(1, 100, userNum);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);
  useEffect(() => {
    if (currentGuess === userNum) {
      onGameOver(guessRounds.length);
    }
  }, [currentGuess, userNum, onGameOver]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);
  function nextGuessHandler(direction) {
    //direction => 'lower','greater'
    if (
      (direction === "lower" && currentGuess < userNum) ||
      (direction === "greater" && currentGuess > userNum)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }

    const newRndNum = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newRndNum);
    setGuessRounds((prevGuessRounds) => [newRndNum, ...prevGuessRounds]);
  }

  const guessRoundsListLength = guessRounds.length;
  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.text}>Higher or Lower?</InstructionText>
        <View style={styles.btnWrapper}>
          <View style={styles.btnContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
              <Ionicons name="md-remove" size={18} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.btnContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
              <Ionicons name="md-add" size={18} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
      <View style={styles.listContainer}>
        {/* {guessRounds?.map((guessRound) => (
          <Text key={guessRound}>{guessRound}</Text>
        ))} */}
        <FlatList
          data={guessRounds}
          keyExtractor={(item) => {
            return item;
          }} //if your api data not contains key, you can make like this to remove warning
          renderItem={(itemData) => {
            return (
              <GuessLogItem
                roundNum={guessRoundsListLength - itemData.index}
                guess={itemData.item}
              />
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 12,
    marginTop: 32,
  },
  btnWrapper: {
    flexDirection: "row",
  },
  btnContainer: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    marginBottom: 12,
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
});
