import LinkButton from "components/LinkButton";
import { Link, Stack } from "expo-router";
import { Button, View } from "react-native";

export default function MainScreen() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "column",
        paddingVertical: 10,
      }}
    >
      <Stack.Screen options={{ title: "Home" }} />
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "flex-start",
          flexDirection: "column",
        }}
      >
        <LinkButton title="1. Animation Basics" href="animation-basics" />
        <LinkButton title="2. Pan Gesture Basics" href="pan-gesture-basics" />
        <LinkButton title="3. Pan Gesture More" href="pan-gesture-more" />
        <LinkButton
          title="4. Interpolate with ScrollView"
          href="interpolate-with-scrollview"
        />
      </View>
    </View>
  );
}
