import { Link } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import type { Movie } from "@/types/movie";

import { ICONS } from "@/constants/icons";
import { PATHS } from "@/constants/paths";
import { COLORS } from "@/constants/theme";

export function MovieCard({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: Movie) {
  return (
    <Link
      href={PATHS.movieDetails(id)}
      asChild
    >
      <TouchableOpacity style={styles.card}>
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://placehold.com/600x400/1a1a1a1/ffffff.png",
          }}
          style={styles.poster}
          resizeMode="cover"
        />

        <Text
          style={styles.title}
          numberOfLines={1}
        >
          {title}
        </Text>

        <View style={styles.ratingRow}>
          <Image
            source={ICONS.star}
            style={styles.starIcon}
          />
          <Text style={styles.rating}>{vote_average}</Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.year}>{release_date?.split("-")[0]}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "30%",
  },
  poster: {
    width: "100%",
    height: 208,
    borderRadius: 8,
  },
  title: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "700",
    marginTop: 8,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 8,
  },
  starIcon: {
    width: 16,
    height: 16,
  },
  rating: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  year: {
    fontSize: 12,
    color: COLORS.light[300],
    fontWeight: "500",
    marginTop: 4,
  },
});
