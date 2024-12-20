import { Dimensions, StyleSheet, Switch, Text, View } from "react-native";
import React, { useState } from "react";
import BackButton from "components/BackButton";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";

const Colors = {
  dark: {
    background: "#1E1E1E",
    circle: "#252525",
    text: "#F8F8F8",
  },
  light: {
    background: "#F8F8F8",
    circle: "#FFF",
    text: "#1E1E1E",
  },
};

const SWITCH_TRACK_COLOR = {
  true: "rgba(256, 0, 256, 0.2)",
  false: "rgba(0,0,0,0.1)",
};

export default function InterpolateColors() {
  const [isDark, setIsDark] = useState<boolean>(false);

  const handleToggleSwitch = (val: boolean) => {
    setIsDark(val);
  };

  const progress = useDerivedValue(() => {
    return isDark ? withTiming(1) : withTiming(0);
  }, [isDark]);

  const rStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.background, Colors.dark.background]
    );

    return {
      backgroundColor,
    };
  });

  const rCircleStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.circle, Colors.dark.circle]
    );

    return {
      backgroundColor,
    };
  });

  const rTextStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.text, Colors.dark.text]
    );

    return {
      color,
    };
  });

  return (
    <Animated.View style={[styles.container, rStyle]}>
      <BackButton />
      <StatusBar style={isDark ? "light" : "dark"} />
      <Animated.Text style={[styles.text, rTextStyle]}>Theme</Animated.Text>
      <Animated.View style={[styles.circle, rCircleStyle]}>
        <Switch
          value={isDark}
          onValueChange={handleToggleSwitch}
          trackColor={SWITCH_TRACK_COLOR}
          thumbColor={"violet"}
        />
      </Animated.View>
    </Animated.View>
  );
}

const { width } = Dimensions.get("window");

const circleSize = width * 0.7;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize / 2,
    justifyContent: "center",
    alignItems: "center",
    shadowOpacity: 0.05,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowColor: "#000",
    backgroundColor: "white",
    elevation: 8,
  },
  text: {
    fontSize: 70,
    marginBottom: 35,
    letterSpacing: 14,
    fontWeight: "700",
    textTransform: "uppercase",
  },
});
