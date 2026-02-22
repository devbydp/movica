import { useQuery } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { ICONS } from "@/constants/icons";
import { COLORS } from "@/constants/theme";
import { fetchMovieDetails } from "@/services/tmdb";

type MovieInfoProps = {
  label: string;
  value: string | number | null | undefined;
};

function MovieInfo({ label, value }: MovieInfoProps) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value || "N/A"}</Text>
    </View>
  );
}

export default function Movie() {
  const { id } = useLocalSearchParams();

  const { data: movie } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => fetchMovieDetails(id as string),
    enabled: !!id,
  });

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            style={styles.poster}
            resizeMode="stretch"
          />
        </View>

        <View style={styles.details}>
          <Text style={styles.title}>{movie?.title}</Text>

          <View style={styles.metaRow}>
            <Text style={styles.metaText}>
              {movie?.release_date?.split("-")[0]}
            </Text>
            <Text style={styles.metaText}>- {movie?.runtime} MINUTES</Text>
          </View>

          <View style={styles.ratingRow}>
            <Image
              source={ICONS.star}
              style={styles.starIcon}
            />
            <Text style={styles.ratingValue}>
              {Math.round(movie?.vote_average ?? 0)}/10
            </Text>
            <Text style={styles.ratingCount}>({movie?.vote_count} votes)</Text>
          </View>

          <MovieInfo
            label="Overview"
            value={movie?.overview}
          />
          <MovieInfo
            label="Genres"
            value={
              movie?.genres.map((genre) => genre.name).join(" - ") || "N/A"
            }
          />
          <View style={styles.infoGrid}>
            <MovieInfo
              label="Budget"
              value={`$${Math.round(movie?.budget ?? 0) / 1_000_000}M`}
            />
            <MovieInfo
              label="Revenue"
              value={`$${Math.round(movie?.revenue ?? 0) / 1_000_000}M`}
            />
          </View>
          <MovieInfo
            label="Production Companies"
            value={
              movie?.production_companies
                .map((company) => company.name)
                .join(" - ") || "N/A"
            }
          />
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Image
          source={ICONS.arrow}
          style={styles.backIcon}
          tintColor={COLORS.white}
        />
        <Text style={styles.backButtonText}>Go back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  poster: {
    width: "100%",
    height: 550,
  },
  details: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    marginTop: 20,
    paddingHorizontal: 20,
  },
  title: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 20,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 8,
  },
  metaText: {
    color: COLORS.light[200],
    fontSize: 14,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.dark[100],
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
    marginTop: 8,
  },
  starIcon: {
    width: 16,
    height: 16,
  },
  ratingValue: {
    fontWeight: "700",
    color: COLORS.white,
    fontSize: 14,
  },
  ratingCount: {
    color: COLORS.light[200],
    fontSize: 14,
  },
  infoRow: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    marginTop: 20,
  },
  infoLabel: {
    color: COLORS.light[200],
    fontSize: 14,
  },
  infoValue: {
    color: COLORS.light[100],
    fontWeight: "700",
    fontSize: 14,
    marginTop: 8,
  },
  infoGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "50%",
  },
  backButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: COLORS.accent,
    borderRadius: 8,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 50,
  },
  backIcon: {
    width: 20,
    height: 20,
    marginRight: 4,
    marginTop: 2,
    transform: [{ rotate: "180deg" }],
  },
  backButtonText: {
    color: COLORS.white,
    fontWeight: "600",
    fontSize: 16,
  },
});
