import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { MovieCard } from "@/components/MovieCard";
import { SearchBar } from "@/components/SearchBar";
import { COLORS, HEADER_HEIGHT } from "@/constants/theme";
import { updateSearchCount } from "@/services/appwrite";
import { fetchMovies } from "@/services/tmdb";

const SEARCH_DEBOUNCE_MS = 500;

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(
      () => setDebouncedQuery(searchQuery.trim()),
      SEARCH_DEBOUNCE_MS
    );
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const {
    data: movies,
    isLoading: areMoviesLoading,
    error: moviesError,
  } = useQuery({
    queryKey: ["movies", "search", debouncedQuery],
    queryFn: () => fetchMovies({ query: debouncedQuery }),
    enabled: debouncedQuery.length > 0,
  });

  useEffect(() => {
    if (!debouncedQuery || !movies?.length || !movies[0]) return;
    updateSearchCount({ query: debouncedQuery, movie: movies[0] }).catch(
      () => {}
    );
  }, [debouncedQuery, movies]);

  const displayMovies = debouncedQuery ? movies : undefined;

  return (
    <View style={styles.container}>
      <FlatList
        data={displayMovies ?? []}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 16,
        }}
        ListHeaderComponent={
          <>
            <View style={styles.searchWrapper}>
              <SearchBar
                placeholder="Search movies..."
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            {areMoviesLoading && (
              <ActivityIndicator
                size="large"
                color="#0000FF"
                style={styles.loader}
              />
            )}

            {moviesError && (
              <Text style={styles.errorText}>Error: {moviesError.message}</Text>
            )}

            {!areMoviesLoading &&
              !moviesError &&
              debouncedQuery &&
              displayMovies &&
              displayMovies.length > 0 && (
                <Text style={styles.resultsTitle}>
                  Search results for{" "}
                  <Text style={styles.resultsQuery}>{debouncedQuery}</Text>
                </Text>
              )}
          </>
        }
        ListEmptyComponent={
          !areMoviesLoading && !moviesError ? (
            <View style={styles.emptyWrapper}>
              <Text style={styles.emptyText}>
                {debouncedQuery ? "No movies found" : "Search for a movie"}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: HEADER_HEIGHT,
  },
  searchWrapper: {
    marginVertical: 20,
  },
  loader: {
    marginTop: 40,
    alignSelf: "center",
  },
  errorText: {
    color: COLORS.red[500],
    paddingHorizontal: 20,
    marginVertical: 12,
  },
  resultsTitle: {
    fontSize: 20,
    color: COLORS.white,
    fontWeight: "700",
  },
  resultsQuery: {
    color: COLORS.accent,
  },
  emptyWrapper: {
    marginTop: 40,
    paddingHorizontal: 20,
  },
  emptyText: {
    textAlign: "center",
    color: COLORS.gray[500],
  },
});
