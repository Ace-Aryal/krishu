import { View, Text, Modal, Pressable } from "react-native";
import React from "react";
import { ThemePreference, useTheme } from "../providers/theme-provider";
import RadioGroup from "./radio-group";

interface ThemeDialogProps {
  open: boolean;
  onClose: () => void;
}
export default function ThemeDialog({ open, onClose }: ThemeDialogProps) {
  const { preference, setPreference } = useTheme();
  return (
    <Modal transparent animationType="fade" visible={open}>
      <Pressable
        onPress={onClose}
        className="flex-1 bg-black/50 items-center justify-center"
      >
        <View className="max-w-md bg-background dark:bg-primary/10 rounded-lg p-4">
          <View className="mb-4">
            <Text className="text-2xl font-medium text-foreground dark:text-foreground-dark ">
              Choose a theme
            </Text>
          </View>
          <View>
            <RadioGroup
              onChange={(value) => {
                setPreference(value as ThemePreference);
                onClose();
              }}
              value={preference}
              options={[
                { label: "System", value: "system" },
                { label: "Light", value: "light" },
                { label: "Dark", value: "dark" },
              ]}
            />
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}
