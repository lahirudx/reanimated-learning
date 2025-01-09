import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Page, { PAGE_WIDTH } from "@/components/PanGestureScrollView/Page";
import Animated, {
  cancelAnimation,
  useDerivedValue,
  useSharedValue,
  withDecay,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import BackButton from "@/components/BackButton";

const titles = ["Hello", "Mobile", "Devs", "?"];

const MAX_TRANSLATE_X = -PAGE_WIDTH * (titles.length - 1);

export default function PanGestureScrollView() {
  const translateX = useSharedValue(0);

  const context = useSharedValue({ x: 0 });

  const clampedTranslateX = useDerivedValue(() => {
    return Math.max(Math.min(translateX.value, 0), MAX_TRANSLATE_X);
  });

  const panGesture = Gesture.Pan()
    .onStart(() => {
      context.value = { x: clampedTranslateX.value };
      cancelAnimation(translateX);
    })
    .onUpdate(({ translationX }) => {
      translateX.value = translationX + context.value.x;
    })
    .onEnd(({ velocityX }) => {
      translateX.value = withDecay({ velocity: velocityX });
    });

  return (
    <View style={styles.container}>
      <BackButton />
      <GestureDetector gesture={panGesture}>
        <Animated.View style={{ flex: 1, flexDirection: "row" }}>
          {titles.map((title, index) => (
            <Page
              key={index}
              title={title}
              index={index}
              translateX={clampedTranslateX}
            />
          ))}
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
