import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
  SharedValue,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

interface AnimatedPosition {
  x: SharedValue<number>;
  y: SharedValue<number>;
}

const SIZE = 80;

const useFollowAnimatedPosition = ({ x, y }: AnimatedPosition) => {
  const followX = useDerivedValue(() => {
    return withSpring(x.value);
  });

  const followY = useDerivedValue(() => {
    return withSpring(y.value);
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: followX.value }, { translateY: followY.value }],
    };
  });

  return { followX, followY, rStyle };
};

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function PanGestureBasics() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const context = useSharedValue({ x: 0, y: 0 });

  const gesture = Gesture.Pan()
    .onStart((e) => {
      context.value = { x: translateX.value, y: translateY.value };
    })
    .onUpdate((e) => {
      translateX.value = e.translationX + context.value.x;
      translateY.value = e.translationY + context.value.y;
    })
    .onEnd(() => {
      if (translateX.value > SCREEN_WIDTH / 2) {
        translateX.value = SCREEN_WIDTH - SIZE;
      } else {
        translateX.value = 0;
      }
    });

  const {
    followX: blueFollowX,
    followY: blueFollowY,
    rStyle: rBleCircleStyle,
  } = useFollowAnimatedPosition({
    x: translateX,
    y: translateY,
  });

  const {
    followX: redFollowX,
    followY: redFollowY,
    rStyle: rRedCircleStyle,
  } = useFollowAnimatedPosition({
    x: blueFollowX,
    y: blueFollowY,
  });

  const { rStyle: rGreenCircleStyle } = useFollowAnimatedPosition({
    x: redFollowX,
    y: redFollowY,
  });

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.circle,
            rGreenCircleStyle,
            { backgroundColor: "green" },
          ]}
        />
        <Animated.View
          style={[styles.circle, rRedCircleStyle, { backgroundColor: "red" }]}
        />
        <GestureDetector gesture={gesture}>
          <Animated.View style={[styles.circle, rBleCircleStyle]} />
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "white",
  },
  circle: {
    position: "absolute",
    width: SIZE,
    aspectRatio: 1,
    backgroundColor: "blue",
    borderRadius: SIZE / 2,
  },
});
