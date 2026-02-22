import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { MovieCard } from "@/components/MovieCard";
import { SearchBar } from "@/components/SearchBar";
import { TrendingCard } from "@/components/TrendingCard";
import { PATHS } from "@/constants/paths";
import { COLORS, HEADER_HEIGHT } from "@/constants/theme";
import { getTrendingMovies } from "@/services/appwrite";
import { fetchMovies } from "@/services/tmdb";

export default function Index() {
  const router = useRouter();

  const {
    data: trendingMovies,
    isLoading: areTrendingMoviesLoading,
    error: trendingMoviesError,
  } = useQuery({
    queryKey: ["trendingMovies"],
    queryFn: getTrendingMovies,
  });

  const {
    data: movies,
    isLoading: areMoviesLoading,
    error: moviesError,
  } = useQuery({
    queryKey: ["movies", "latest", ""],
    queryFn: () => fetchMovies({ query: "" }),
  });

  const isLoading = areMoviesLoading || areTrendingMoviesLoading;
  const error = moviesError ?? trendingMoviesError;

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          size="large"
          color="#0000FF"
          style={styles.loader}
        />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.content}>
          <SearchBar
            onPress={() => router.push(PATHS.search)}
            placeholder="Search for a movie"
          />

          {trendingMovies && trendingMovies.length > 0 && (
            <View style={styles.trendingSection}>
              <Text style={styles.sectionTitle}>Trending Movies</Text>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                data={trendingMovies}
                renderItem={({ item, index }) => (
                  <TrendingCard
                    movie={item}
                    index={index}
                  />
                )}
                keyExtractor={(item) => item.movie_id.toString()}
                style={styles.trendingList}
              />
            </View>
          )}

          <Text style={[styles.sectionTitle, styles.sectionTitleSecondary]}>
            Latest Movies
          </Text>
          <FlatList
            data={movies}
            renderItem={({ item }) => <MovieCard {...item} />}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
            columnWrapperStyle={{
              gap: 20,
              justifyContent: "flex-start",
              paddingRight: 5,
              marginBottom: 10,
            }}
            style={styles.moviesList}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: HEADER_HEIGHT,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollContent: {
    minHeight: "100%",
    paddingBottom: 40,
  },
  loader: {
    marginTop: 40,
    alignSelf: "center",
  },
  errorText: {
    marginTop: 40,
    paddingHorizontal: 20,
    color: COLORS.white,
  },
  content: {
    flex: 1,
    marginTop: 20,
  },
  trendingSection: {
    marginTop: 40,
  },
  sectionTitle: {
    fontSize: 18,
    color: COLORS.white,
    fontWeight: "700",
    marginBottom: 12,
  },
  sectionTitleSecondary: {
    marginTop: 20,
  },
  separator: {
    width: 16,
  },
  trendingList: {
    marginTop: 12,
    marginBottom: 16,
  },
  moviesList: {
    marginTop: 8,
    paddingBottom: 128,
  },
});
