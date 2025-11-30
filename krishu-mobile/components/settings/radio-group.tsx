import { Pressable, View, Text } from "react-native";

type RadioOption = {
  label: string;
  value: string;
};

type RadioGroupProps = {
  value: string;
  onChange: (value: string) => void;
  options: RadioOption[];
};

export function RadioGroup({ value, onChange, options }: RadioGroupProps) {
  return (
    <View className="gap-3">
      {options.map((item) => {
        const checked = value === item.value;

        return (
          <Pressable
            key={item.value}
            onPress={() => onChange(item.value)}
            className="flex-row items-center gap-4"
          >
            {/* Outer circle */}
            <View
              className={`h-5 w-5 rounded-full border-2 items-center justify-center ${
                checked ? "border-primary" : "border-border"
              }`}
            >
              {/* Inner dot */}
              {checked && (
                <View className="h-2.5 w-2.5 rounded-full bg-primary" />
              )}
            </View>

            <Text className="text-foreground text-lg dark:text-foreground-dark">
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export default RadioGroup;
