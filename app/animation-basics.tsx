import BackButton from "components/BackButton";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withRepeat,
  SharedValue,
} from "react-native-reanimated";

const SIZE = 100;

const handleRotation = (progress: SharedValue<number>) => {
  "worklet";

  return `${progress.value * Math.PI}rad`;
};

export default function BasicsScreen() {
  const progress = useSharedValue(1);
  const scale = useSharedValue(2);

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      borderRadius: (progress.value * SIZE) / 2,
      transform: [
        {
          scale: scale.value,
        },
        {
          rotate: handleRotation(progress),
        },
      ],
    };
  });

  useEffect(() => {
    progress.value = withRepeat(withSpring(0.5, { duration: 5000 }), 1, true);
    scale.value = withRepeat(withSpring(1, { duration: 5000 }), 1, true);
  }, []);

  return (
    <View style={styles.container}>
      <BackButton />

      <Animated.View
        style={[
          { height: SIZE, width: SIZE, backgroundColor: "blue" },
          reanimatedStyle,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
