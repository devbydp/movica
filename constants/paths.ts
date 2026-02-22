/**
 * Centralized route paths for the app.
 * Use these instead of hardcoded href/push strings.
 */
export const PATHS = {
  /** Tab: Search screen */
  search: "/search",
  /** Movie details screen. Usage: PATHS.movieDetails(id) */
  movieDetails: (id: string | number) => `/movies/${id}` as const,
} as const;
