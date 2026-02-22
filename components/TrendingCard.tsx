import MaskedView from "@react-native-masked-view/masked-view";
import { Link } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import type { TrendingMovie } from "@/types/movie";

import { IMAGES } from "@/constants/images";
import { PATHS } from "@/constants/paths";
import { COLORS } from "@/constants/theme";

type TrendingCardProps = {
  movie: TrendingMovie;
  index: number;
};

export function TrendingCard({ movie, index }: TrendingCardProps) {
  return (
    <Link
      href={PATHS.movieDetails(movie.movie_id)}
      asChild
    >
      <TouchableOpacity style={styles.card}>
        <Image
          source={{ uri: movie.poster_url }}
          style={styles.poster}
          resizeMode="cover"
        />

        <View style={styles.rankBadge}>
          <MaskedView
            maskElement={<Text style={styles.rankText}>{index + 1}</Text>}
          >
            <Image
              source={IMAGES.rankingGradient}
              style={styles.rankImage}
              resizeMode="cover"
            />
          </MaskedView>
        </View>

        <Text
          style={styles.title}
          numberOfLines={1}
        >
          {movie.title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 128,
    position: "relative",
    paddingLeft: 20,
  },
  poster: {
    width: 128,
    height: 192,
    borderRadius: 8,
  },
  rankBadge: {
    position: "absolute",
    bottom: 36,
    left: -14,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 9999,
  },
  rankText: {
    color: COLORS.white,
    fontSize: 60,
    fontWeight: "700",
  },
  rankImage: {
    width: 56,
    height: 56,
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
    marginTop: 8,
    color: COLORS.light[200],
  },
});
