import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";

/**
 * here we create a function outside of the functional component since it's not
 * really utilizing the data inside the functional component and isn't going to be
 * always rendering inside the component
 *
 * we also have exclude as a parameter so the generator won't guess the user's
 * input on the fist try
 *  */
const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  const randomNum = Math.floor(Math.random() * (max - min) + min); // with floor, it will not include the max value
  if (randomNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return randomNum;
  }
};

const GameScreen = (props) => {
  const { userChoice, onGameOver } = props;

  // the initial state will be using what is returned from the generateRandomBetween function
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomBetween(1, 100, userChoice)
  );
  const [rounds, setRounds] = useState(0);

  // this useEffect checks if the currentGuess and userChoice match
  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(rounds);
    }
    // we include the userChoice and onGameOver because they are also used as dependencies
  }, [currentGuess, userChoice, onGameOver]);

  /**
   * these will be the initial boundaries and wont be re-initialized when the component re-renders
   * we don't really want to have it as state because we don't necessarily want to re-render
   * the whole component when only the logic of the value is being changed which is why we used
   * a reference instead of a state
   */

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  // the direction will be the greater or lower
  const nextGuessHandler = (direction) => {
    // this acts as a validation if the user presses the wrong button
    if (
      (direction === "lower" && currentGuess < userChoice) ||
      (direction === "greater" && currentGuess > userChoice)
    ) {
      Alert.alert(
        "You either pressed on the wrong button or you're lying...",
        "Please Try again",
        [{ text: "Sorry!", style: "cancel" }]
      );
      return;
    }

    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }

    // we have to make sure to use the .current property
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );

    // this is best practice since you don't want to mutate the current value of the state
    setRounds((currentRounds) => currentRounds + 1);
    setCurrentGuess(nextNumber);
  };

  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button title="LOWER" onPress={() => nextGuessHandler("lower")} />
        <Button title="GREATER" onPress={() => nextGuessHandler("greater")} />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    // this flex basically takes over all the available screen size
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 300,
    maxWidth: "80%",
  },
});

export default GameScreen;
