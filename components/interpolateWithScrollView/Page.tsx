import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

type PageProps = {
  title: string;
  index: number;
  translateX: SharedValue<number>;
};

const { height, width } = Dimensions.get("window");

const SIZE = width * 0.7;

export default function Page({ title, index, translateX }: PageProps) {
  const rStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];

    const scale = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolation.CLAMP
    );

    const borderRadius = interpolate(
      translateX.value,
      inputRange,
      [0, SIZE / 2, 0],
      Extrapolation.CLAMP
    );

    const opacity = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ scale }],
      borderRadius,
      opacity,
    };
  });

  const rTextStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];

    const translateY = interpolate(
      translateX.value,
      inputRange,
      [height / 2, 0, -height / 2],
      Extrapolation.CLAMP
    );

    const opacity = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolation.CLAMP
    );

    const scale = interpolate(
      translateX.value,
      inputRange,
      [0.5, 1, 0.5],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ translateY }, { scale }],
      opacity,
    };
  });

  return (
    <View
      style={[
        styles.pageContainer,
        { backgroundColor: `rgba(0, 0, 256, 0.${index + 2})` },
      ]}
    >
      <Animated.View style={[styles.square, rStyle]}></Animated.View>
      <Animated.Text style={[styles.text, rTextStyle]}>{title}</Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    width,
    height,
    justifyContent: "center",
    alignItems: "center",
  },
  square: {
    width: SIZE,
    height: SIZE,
    backgroundColor: "rgba(0, 0, 256, 0.5)",
  },
  text: {
    fontSize: 35,
    fontWeight: "700",
    color: "white",
    textTransform: "uppercase",
    position: "absolute",
    paddingHorizontal: 10,
    textAlign: "center",
    overflow: "visible",
  },
});
