import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { Stack } from "expo-router";
import Page from "components/interpolateWithScrollView/Page";
import BackButton from "components/BackButton";

const WORDS = ["Hello", "React Native", "Developers"];

export default function InterpolateWithScrollView() {
  const translateX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((e) => {
    translateX.value = e.contentOffset.x;
  });

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <BackButton />
      <Animated.ScrollView
        horizontal
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        style={styles.container}
        pagingEnabled
      >
        {WORDS.map((word, index) => (
          <Page
            key={index}
            title={word}
            index={index}
            translateX={translateX}
          />
        ))}
      </Animated.ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
