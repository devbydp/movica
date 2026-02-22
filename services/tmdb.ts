import type { MovieDetails } from "@/types/movie";

import { ENV } from "@/constants/env";

const { baseUrl, apiKey } = ENV.tmdb;

export const TMDB_CONFIG = {
  BASE_URL: baseUrl,
  API_KEY: apiKey,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${apiKey}`,
  },
};

type FetchMoviesArgs = {
  query?: string;
};

export async function fetchMovies({ query = "" }: FetchMoviesArgs) {
  const endpoint = query
    ? `/search/movie?query=${encodeURIComponent(query)}`
    : "/discover/movie?sort_by=popularity.desc";

  const response = await fetch(`${TMDB_CONFIG.BASE_URL}${endpoint}`, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  console.log(response);

  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.statusText}`);
  }

  const data = await response.json();

  return data.results;
}

export async function fetchMovieDetails(
  movieId: string
): Promise<MovieDetails> {
  const response = await fetch(
    `${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`,
    {
      method: "GET",
      headers: TMDB_CONFIG.headers,
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch movie details: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}
