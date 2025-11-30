import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Platform, StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/providers/theme-provider";
import { Colors, DarkColors } from "@/constants/colors";

export default function Layout() {
  const { scheme } = useTheme();
  const isDarkMode = scheme === "dark";

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={isDarkMode ? DarkColors.BACKGROUND : Colors.BACKGROUND}
      />

      {/* Wrapper ensures all NativeWind dark classes inside update */}
      <View
        key={isDarkMode ? "dark" : "light"}
        className={cn("flex-1", isDarkMode && "dark")}
      >
        <Tabs
          screenOptions={{
            sceneStyle: {
              backgroundColor: isDarkMode
                ? DarkColors.BACKGROUND
                : Colors.BACKGROUND,
            },
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: isDarkMode
              ? DarkColors.PRIMARY
              : Colors.PRIMARY,
            tabBarInactiveTintColor: isDarkMode
              ? DarkColors.MUTED
              : Colors.MUTED,
            tabBarStyle: {
              backgroundColor: isDarkMode ? DarkColors.CARD : Colors.CARD,
              height: Platform.OS === "ios" ? 90 : 60,
              borderTopColor: isDarkMode ? DarkColors.BORDER : Colors.BORDER,
              borderTopWidth: 0.5,
              elevation: 1,
              shadowColor: "black",
              shadowOpacity: 0.1,
              shadowRadius: 5,
              shadowOffset: { width: 0, height: -2 },
              paddingTop: Platform.OS === "ios" ? 0 : 8,
              paddingBottom: Platform.OS === "ios" ? 20 : 0,
            },
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Home",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home-outline" color={color} size={size} />
              ),
            }}
          />
          <Tabs.Screen
            name="discover"
            options={{
              title: "Discover",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="search-outline" color={color} size={size} />
              ),
            }}
          />
          <Tabs.Screen
            name="offline"
            options={{
              title: "Offline",
              tabBarIcon: ({ color, size }) => (
                <Ionicons
                  name="cloud-offline-outline"
                  color={color}
                  size={size}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="playlists"
            options={{
              title: "Playlists",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="list-outline" color={color} size={size} />
              ),
            }}
          />
          <Tabs.Screen
            name="settings"
            options={{
              title: "Settings",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="settings-outline" color={color} size={size} />
              ),
            }}
          />
        </Tabs>
      </View>
    </SafeAreaView>
  );
}
