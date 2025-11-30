import { Pressable, StyleSheet, useColorScheme, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { useTheme } from "./providers/theme-provider";

type AppSwitchProps = {
  value: boolean;
  onChange: (value: boolean) => void;
};

export function AppSwitch({ value, onChange }: AppSwitchProps) {
  const scheme = useTheme().scheme;
  const isDarkMode = scheme === "dark";
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(value ? 22 : 2, {
            damping: 15,
            stiffness: 120,
          }),
        },
      ],
    };
  });

  return (
    <Pressable
      onPress={() => onChange(!value)}
      style={[
        styles.track,
        {
          backgroundColor: value
            ? "#c2410c"
            : isDarkMode
              ? "#262626"
              : "#e5e5e5",
        }, // 🟠 shadcn orange
      ]}
    >
      <Animated.View style={[styles.thumb, animatedStyle]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: {
    width: 44,
    height: 24,
    borderRadius: 999,
    justifyContent: "center",
    padding: 2,
  },
  thumb: {
    width: 18,
    height: 18,
    borderRadius: 999,
    backgroundColor: "#ffffff",
  },
});
