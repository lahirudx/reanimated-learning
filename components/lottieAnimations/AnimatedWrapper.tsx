import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import LottieView, { LottieViewProps } from "lottie-react-native";

interface AnimatedWrapperProps extends LottieViewProps {
  children: React.ReactNode;
  showAnimation?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  title?: string;
}

export default function AnimatedWrapper({
  children,
  showAnimation,
  containerStyle,
  textStyle,
  title,
  ...lottieProps
}: AnimatedWrapperProps) {
  if (!showAnimation) return <>{children}</>;

  return (
    <View
      style={[
        {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        },
        containerStyle,
      ]}
    >
      <LottieView
        style={{ width: "80%", aspectRatio: 1 }}
        autoPlay
        loop
        {...lottieProps}
      />
      {title ? (
        <Text style={[{ fontSize: 25, marginTop: 20 }, textStyle]}>
          {title}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({});
