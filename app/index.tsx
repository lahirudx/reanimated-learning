import LinkButton from "components/LinkButton";
import { Link } from "expo-router";
import { Button, View } from "react-native";

export default function MainScreen() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "column",
        paddingVertical: 100,
      }}
    >
      <LinkButton title="1. Animation Basics" href="animation-basics" />
      <LinkButton title="2. Pan Gesture Basics" href="pan-gesture-basics" />
    </View>
  );
}
