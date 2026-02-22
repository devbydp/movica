import { Image, Pressable, StyleSheet, TextInput, View } from "react-native";

import { ICONS } from "@/constants/icons";
import { COLORS } from "@/constants/theme";

type SearchBarProps = {
  onPress?: () => void;
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
};

export function SearchBar({
  onPress,
  placeholder,
  value,
  onChangeText,
}: SearchBarProps) {
  const content = (
    <View style={styles.container}>
      <Image
        source={ICONS.search}
        style={styles.icon}
        resizeMode="contain"
        tintColor={COLORS.accent}
      />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.light[200]}
        style={styles.input}
        editable={!!onChangeText}
        pointerEvents={onPress ? "none" : "auto"}
      />
    </View>
  );

  if (onPress) {
    return <Pressable onPress={onPress}>{content}</Pressable>;
  }
  return content;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.dark[200],
    borderRadius: 9999,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  icon: {
    width: 20,
    height: 20,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    color: COLORS.white,
    padding: 0,
  },
});
