import LinkButton from "components/LinkButton";
import { Link, Stack } from "expo-router";
import { Button, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function MainScreen() {
  const { top } = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "column",
        paddingVertical: top + 10,
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
        <LinkButton title="5. Interpolate Colors" href="interpolate-colors" />
        <LinkButton title="6. Pinch Gesture" href="pinch-gesture" />
        <LinkButton title="7. Double Tap Gesture" href="double-tap-gesture" />
        <LinkButton
          title="8. Pan Gesture ScrollView"
          href="pan-gesture-scrollview"
        />
      </View>
    </View>
  );
}
