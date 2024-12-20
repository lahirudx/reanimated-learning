import { StyleSheet, Image, View, Dimensions } from "react-native";
import React from "react";
import BackButton from "components/BackButton";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const imageUri =
  "https://images.unsplash.com/photo-1621569642780-4864752e847e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80";

const { width, height } = Dimensions.get("window");

export default function PinchGesture() {
  const scale = useSharedValue(1);
  const focalPointPosition = useSharedValue({ x: 0, y: 0 });

  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = e.scale;

      focalPointPosition.value = {
        x: e.focalX,
        y: e.focalY,
      };
    })
    .onEnd(() => {
      scale.value = withTiming(1);
    });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: focalPointPosition.value.x },
        { translateY: focalPointPosition.value.y },
        { translateX: -width / 2 },
        { translateY: -height / 2 },
        { scale: scale.value },
        { translateX: -focalPointPosition.value.x },
        { translateY: -focalPointPosition.value.y },
        { translateX: width / 2 },
        { translateY: height / 2 },
      ],
    };
  });

  const rFocalPointStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: focalPointPosition.value.x },
        { translateY: focalPointPosition.value.y },
      ],
    };
  });

  return (
    <>
      <BackButton />
      <GestureDetector gesture={pinchGesture}>
        <Animated.Image
          source={{ uri: imageUri }}
          style={[styles.image, rStyle]}
        />
      </GestureDetector>
      <Animated.View style={[styles.focalPoint, rFocalPointStyle]} />
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
  focalPoint: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "blue",
    ...StyleSheet.absoluteFillObject,
  },
});
