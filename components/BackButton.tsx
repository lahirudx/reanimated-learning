import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { router } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

export default function BackButton() {
  return (
    <Pressable style={styles.backButton} onPress={() => router.back()}>
      <FontAwesome name="arrow-left" size={24} color="black" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 100,
  },
});
