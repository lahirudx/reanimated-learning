import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { TaskInterface } from "@/app/swipe-to-delete";
import {
  Gesture,
  GestureDetector,
  PanGesture,
  ScrollView,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const LIST_ITEM_HEIGHT = 70;

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const SWIPE_THRESHOLD = -SCREEN_WIDTH * 0.3;

interface ListItemProps {
  task: TaskInterface;
  onDeleted?: (task: TaskInterface) => void;
  scrollViewRef: React.RefObject<ScrollView>;
}

export default function ListItem({
  task,
  onDeleted,
  scrollViewRef,
}: ListItemProps) {
  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(LIST_ITEM_HEIGHT);
  const marginVertical = useSharedValue(10);
  const opacity = useSharedValue(1);

  const panGesture = Gesture.Pan()
    .simultaneousWithExternalGesture(scrollViewRef)

    .onChange((e) => {
      translateX.value = e.translationX;
    })
    .onEnd((e) => {
      if (e.translationX < SWIPE_THRESHOLD) {
        translateX.value = withTiming(-SCREEN_WIDTH);
        itemHeight.value = withTiming(0);
        marginVertical.value = withTiming(0);
        opacity.value = withTiming(0, undefined, (isFinished) => {
          if (isFinished && onDeleted) {
            runOnJS(onDeleted)(task);
          }
        });
      } else {
        translateX.value = withTiming(0);
      }
    });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const rIconContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(translateX.value < SWIPE_THRESHOLD ? 1 : 0),
    };
  });

  const rTaskContainerStyle = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
      marginVertical: marginVertical.value,
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View style={[styles.taskContainer, rTaskContainerStyle]}>
      <Animated.View style={[styles.iconContainer, rIconContainerStyle]}>
        <FontAwesome5
          name="trash-alt"
          size={LIST_ITEM_HEIGHT * 0.4}
          color="red"
        />
      </Animated.View>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.task, rStyle]}>
          <Text style={styles.taskTitle}>{task.title}</Text>
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  task: {
    width: "90%",
    height: LIST_ITEM_HEIGHT,
    backgroundColor: "white",
    borderRadius: 10,
    paddingLeft: 20,
    justifyContent: "center",
    // Shadow for iOS
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 5,
    // Shadow for Android
    elevation: 5,
  },
  taskContainer: {
    alignItems: "center",
    width: "100%",
  },
  taskTitle: {
    fontSize: 16,
  },
  iconContainer: {
    width: LIST_ITEM_HEIGHT,
    height: LIST_ITEM_HEIGHT,
    borderRadius: 10,
    position: "absolute",
    right: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
});
