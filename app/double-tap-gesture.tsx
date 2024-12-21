import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  View,
  Text,
} from "react-native";
import React, { useCallback } from "react";
import BackButton from "components/BackButton";
import {
  Gesture,
  GestureDetector,
  GestureStateChangeEvent,
  TapGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";

export default function DoubleTapGesture() {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(1);

  const onSingleTap = useCallback(
    (
      _event: GestureStateChangeEvent<TapGestureHandlerEventPayload>,
      success: boolean
    ) => {
      "worklet";

      if (success) {
        opacity.value = withTiming(0, undefined, (isCompleted) => {
          if (isCompleted) {
            opacity.value = withDelay(500, withTiming(1));
          }
        });
      }
    },
    []
  );

  const onDoubleTap = useCallback(
    (
      _event: GestureStateChangeEvent<TapGestureHandlerEventPayload>,
      success: boolean
    ) => {
      "worklet";

      if (success) {
        scale.value = withSpring(1, undefined, (isCompleted) => {
          if (isCompleted) {
            scale.value = withDelay(500, withSpring(0));
          }
        });
      }
    },
    []
  );

  const singleTap = Gesture.Tap().onEnd(onSingleTap);

  const doubleTap = Gesture.Tap().numberOfTaps(2).onEnd(onDoubleTap);

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: Math.max(scale.value, 0) }],
    };
  });

  const rOpacity = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const taps = Gesture.Exclusive(doubleTap, singleTap);

  return (
    <View style={styles.container}>
      <BackButton />
      <GestureDetector gesture={taps}>
        <View collapsable={false}>
          <ImageBackground
            style={styles.image}
            source={require("@/assets/image.jpg")}
          >
            <Animated.Image
              style={[
                styles.image,
                {
                  shadowOpacity: 0.3,
                  shadowOffset: { width: 0, height: 20 },
                  shadowRadius: 10,
                },
                rStyle,
              ]}
              source={require("@/assets/heart.png")}
              resizeMode="center"
            />
          </ImageBackground>
          <Animated.Text style={[styles.text, rOpacity]}>
            🚀🔥💸🍟
          </Animated.Text>
        </View>
      </GestureDetector>
    </View>
  );
}

const { width: SIZE } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: SIZE,
    height: SIZE,
  },
  text: {
    fontSize: 40,
    textAlign: "center",
    marginTop: 30,
  },
});
