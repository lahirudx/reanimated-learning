import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient, LinearGradientProps } from "expo-linear-gradient";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const COLOR_PICKER_SIZE = 45;
const COLOR_PICKER_INDICATOR_SIZE = COLOR_PICKER_SIZE / 2;

interface ColorPickerProps extends LinearGradientProps {
  maxWidth: number;
  onColorChanged: (color: string) => void;
}

export default function ColorPicker({
  maxWidth,
  colors,
  onColorChanged,
  ...rest
}: ColorPickerProps) {
  const translateX = useSharedValue(0);
  const context = useSharedValue({ x: 0 });
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  const adjustedTranslateX = useDerivedValue(() => {
    return Math.min(
      Math.max(translateX.value, 0),
      maxWidth - COLOR_PICKER_SIZE
    );
  });

  const panGesture = Gesture.Pan()
    .onStart(() => {
      context.value = { x: adjustedTranslateX.value };
    })
    .onChange((e) => {
      translateX.value = e.translationX + context.value.x;
    })
    .onEnd(() => {
      scale.value = withSpring(1);
      translateY.value = withSpring(0);
    });

  const tapGesture = Gesture.Tap()
    .onStart((e) => {
      scale.value = withSpring(1.2);
      translateY.value = withSpring(-COLOR_PICKER_SIZE);
      translateX.value = withTiming(e.absoluteX - COLOR_PICKER_SIZE);
    })
    .onEnd(() => {
      scale.value = withSpring(1);
      translateY.value = withSpring(0);
    });

  const gestures = Gesture.Race(panGesture, tapGesture);

  const rStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: adjustedTranslateX.value },
        { scale: scale.value },
        { translateY: translateY.value },
      ],
    };
  });

  const rIndicatorStyle = useAnimatedStyle(() => {
    const inputRange = colors.map(
      (_, index) => (index / colors.length) * maxWidth
    );

    const backgroundColor = interpolateColor(
      translateX.value,
      inputRange,
      colors
    );

    onColorChanged(backgroundColor);

    return {
      backgroundColor,
    };
  });

  return (
    <GestureDetector gesture={gestures}>
      <View style={{ justifyContent: "center" }}>
        <LinearGradient colors={colors} {...rest} />
        <Animated.View style={[styles.picker, rStyles]}>
          <Animated.View style={[styles.indicator, rIndicatorStyle]} />
        </Animated.View>
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  picker: {
    position: "absolute",
    backgroundColor: "white",
    width: COLOR_PICKER_SIZE,
    height: COLOR_PICKER_SIZE,
    borderRadius: COLOR_PICKER_SIZE / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  indicator: {
    width: COLOR_PICKER_INDICATOR_SIZE,
    height: COLOR_PICKER_INDICATOR_SIZE,
    borderRadius: COLOR_PICKER_INDICATOR_SIZE / 2,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.2)",
  },
});
