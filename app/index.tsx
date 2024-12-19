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
      <Link href="basics" asChild>
        <Button title="1. Basics" />
      </Link>
    </View>
  );
}
