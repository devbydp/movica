import { Tabs } from "expo-router";
import {
  Image,
  ImageBackground,
  ImageSourcePropType,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import { ICONS } from "@/constants/icons";
import { IMAGES } from "@/constants/images";
import { COLORS, LAYOUT } from "@/constants/theme";

type TabBarIconProps = {
  focused: boolean;
  icon: ImageSourcePropType;
  title: string;
};

function TabBarIcon({ focused, icon, title }: TabBarIconProps) {
  if (focused) {
    return (
      <ImageBackground
        style={styles.tabFocused}
        source={IMAGES.highlight}
      >
        <Image
          source={icon}
          tintColor={COLORS.secondary}
          style={styles.tabIcon}
        />
        <Text style={styles.tabLabelFocused}>{title}</Text>
      </ImageBackground>
    );
  }

  return (
    <View style={styles.tabUnfocused}>
      <Image
        source={icon}
        tintColor={COLORS.light[200]}
        style={styles.tabIcon}
      />
    </View>
  );
}

export default function Layout() {
  const { width, height } = useWindowDimensions();
  return (
    <View style={styles.root}>
      <View style={[styles.bgWrap, { width, height }]}>
        <Image
          source={IMAGES.bg}
          style={styles.bgImage}
          resizeMode="cover"
        />
      </View>
      <View style={styles.logoWrap}>
        <Image
          source={ICONS.logo}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          // Transparent scene so layout background shows
          sceneStyle: { backgroundColor: "transparent" },
          tabBarItemStyle: {
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          },
          tabBarStyle: {
            backgroundColor: COLORS.dark[200],
            borderRadius: 50,
            marginHorizontal: 20,
            marginBottom: 36,
            height: 52,
            position: "absolute",
            overflow: "hidden",
            borderWidth: 1,
            borderColor: COLORS.dark[200],
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                focused={focused}
                icon={ICONS.home}
                title="Home"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: "Search",
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                focused={focused}
                icon={ICONS.search}
                title="Search"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="saved"
          options={{
            title: "Saved",
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                focused={focused}
                icon={ICONS.save}
                title="Saved"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                focused={focused}
                icon={ICONS.person}
                title="Profile"
              />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  bgWrap: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 0,
  },
  bgImage: {
    width: "100%",
    height: "100%",
  },
  logoWrap: {
    position: "absolute",
    top: LAYOUT.logoTop,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 1,
  },
  logo: {
    width: 48,
    height: LAYOUT.logoHeight,
  },
  tabFocused: {
    flexDirection: "row",
    flex: 1,
    minWidth: 112,
    minHeight: 64,
    marginTop: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 9999,
    overflow: "hidden",
  },
  tabUnfocused: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    borderRadius: 9999,
  },
  tabIcon: {
    width: 20,
    height: 20,
  },
  tabLabelFocused: {
    color: COLORS.secondary,
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});
