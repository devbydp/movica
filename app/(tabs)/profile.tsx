import { Image, StyleSheet, Text, View } from "react-native";

import { ICONS } from "@/constants/icons";
import { COLORS, HEADER_HEIGHT } from "@/constants/theme";

export default function Profile() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={ICONS.person}
          style={styles.icon}
          tintColor={COLORS.white}
        />

        <Text style={styles.title}>Profile</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: HEADER_HEIGHT,
    paddingHorizontal: 40,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  icon: {
    width: 40,
    height: 40,
  },
  title: {
    color: COLORS.gray[500],
    fontSize: 16,
  },
});
