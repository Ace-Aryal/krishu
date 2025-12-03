import { View, Text, ScrollView, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { AppSwitch } from "@/components/switch";
import ThemeDialog from "@/components/settings/theme-dialog";
import { cn } from "@/lib/utils";
import { useColorScheme } from "nativewind";
export default function Settings() {
  const [notificationsAllowed, setNotificationsAllowed] = React.useState(false);
  const [isDarkModeDialogOpen, setIsDarkModeDialogOpen] = React.useState(false);
  const { colorScheme } = useColorScheme();

  const isDark = colorScheme === "dark";
  return (
    <View className={cn("flex-1 px-4 pt-8", isDark && "dark")}>
      <View className="">
        <Text className="text-foreground  text-5xl font-medium">Settings</Text>
      </View>
      <ScrollView style={{ flex: 1 }} className="pt-10 ">
        <View className="flex-row items-center gap-3 flex-1 mb-4 active:bg-gray-100 dark:active:bg-gray-800 rounded-xl p-3">
          <Ionicons
            name="notifications-outline"
            size={20}
            color={isDark ? "white" : "black"}
          />
          <Text className="text-foreground dark:text-foreground-dark text-2xl font-medium">
            Notifications
          </Text>
          <View className="flex-1 flex-row justify-end">
            <AppSwitch
              value={notificationsAllowed}
              onChange={() => setNotificationsAllowed((prev) => !prev)}
            />
          </View>
        </View>
        <Pressable
          onPress={() => setIsDarkModeDialogOpen(true)}
          className="flex-row items-center gap-3 flex-1 mb-4 active:bg-gray-100 dark:active:bg-gray-800 rounded-xl p-3"
        >
          <Ionicons
            name={isDark ? "sunny-outline" : "moon-outline"}
            size={20}
            color={isDark ? "white" : "black"}
          />
          <Text className="text-foreground dark:text-foreground-dark text-2xl font-medium">
            Dark Mode
          </Text>
        </Pressable>
      </ScrollView>
      <ThemeDialog
        onClose={() => setIsDarkModeDialogOpen(false)}
        open={isDarkModeDialogOpen}
      />
    </View>
  );
}
