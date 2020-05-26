import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
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
  const { userChoice } = props;
  // the initial state will be using what is returned from the generateRandomBetween function
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomBetween(1, 100, userChoice)
  );
  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button title="LOWER" onPress={() => {}} />
        <Button title="GREATER" onPress={() => {}} />
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
