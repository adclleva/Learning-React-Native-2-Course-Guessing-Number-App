import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "../components/Header";

const StartGameScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>Start a New Game!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
});

export default StartGameScreen;
