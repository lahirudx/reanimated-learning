import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

interface Props {
  title: string;
  index: number;
  translateX: SharedValue<number>;
}

export const { width: PAGE_WIDTH } = Dimensions.get("window");

export default function Page({ title, index, translateX }: Props) {
  const pageOffset = PAGE_WIDTH * index;

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value + pageOffset }],
    };
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          ...StyleSheet.absoluteFillObject,
          backgroundColor: `rgba(0,0,256,0.${index + 2})`,
        },
        rStyle,
      ]}
    >
      <Text style={styles.text}>{title}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 50,
    fontWeight: "bold",
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
});
