import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import BackButton from "@/components/BackButton";
import { SafeAreaView } from "react-native-safe-area-context";
import ListItem from "@/components/swipeToDelete/ListItem";
import { ScrollView } from "react-native-gesture-handler";

const TITLES = [
  "Record the dismissible tutorial 🎥",
  "Leave 👍🏼 to the video",
  "Check YouTube comments",
  "Subscribe to the channel 🚀",
  "Leave a ⭐️ on the GitHub Repo",
];

export interface TaskInterface {
  title: string;
  index: number;
}

const BACKGROUND_COLOR = "#FAFBFF";

const TASKS: TaskInterface[] = TITLES.map((title, index) => ({ title, index }));

export default function SwipeToDelete() {
  const scrollRef = React.useRef<ScrollView>(null);
  const [tasks, setTasks] = useState<TaskInterface[]>(TASKS);

  const onTaskDeleted = (task: TaskInterface) => {
    setTasks((prevTasks) => prevTasks.filter((t) => t.index !== task.index));
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackButton />
      <StatusBar style="auto" />
      <Text style={styles.title}>Tasks</Text>
      <ScrollView ref={scrollRef} style={{ flex: 1 }}>
        {tasks.map((task) => (
          <ListItem
            key={task.index}
            task={task}
            onDeleted={onTaskDeleted}
            scrollViewRef={scrollRef}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  title: {
    fontSize: 60,
    marginVertical: 40,
    paddingLeft: "5%",
  },
});
