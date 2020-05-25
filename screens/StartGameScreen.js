import React from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

import Card from "../components/Card";
import Colors from "../constants/colors";
import Input from "../components/Input";

const StartGameScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Start a New Game!</Text>
      <Card style={styles.inputContainer}>
        <Text style={styles.title}>Select a New Games!</Text>
        {/** here is where we implement the custom width to the input */}
        <Input
          style={styles.input}
          blurOnSubmit
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="number-pad"
          maxLength={2}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Reset" color={Colors.accent} onPress={() => {}} />
          </View>
          <View style={styles.button}>
            <Button
              style={styles.button}
              color={Colors.primary}
              title="Confirm"
              onPress={() => {}}
            />
          </View>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  inputContainer: {
    width: 300,
    maxWidth: "80%",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  button: {
    width: "40%",
  },
  input: {
    width: "10%",
    /**
     *  we use this textAlign property to have the user text
     * be shown within the middle
     **/
    textAlign: "center",
  },
});

export default StartGameScreen;
