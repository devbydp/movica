# Movica

A React Native (Expo) movie app with trending search, discovery, and movie details. Uses TMDB for movie data and Appwrite for storing trending search counts.

## Tech stack

- **Expo** (SDK 54) + **expo-router** (file-based routing)
- **React Query** (TanStack Query) for data fetching and caching
- **Appwrite** for backend (trending movies from search stats)
- **TMDB API** for movie search, discovery, and details
- **TypeScript**, **ESLint**, **Prettier**

## Prerequisites

- Node.js 18+
- pnpm (or npm / yarn)
- [Expo Go](https://expo.dev/go) on your device, or iOS Simulator

## Setup

1. **Clone and install**

   ```bash
   pnpm install
   ```

2. **Environment variables**

   Copy the example env file and fill in your keys:

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and set:
   - **Appwrite**: Create a project at [cloud.appwrite.io](https://cloud.appwrite.io), then create a database and a table with columns: `searchTerm` (string), `movie_id` (integer), `title` (string), `poster_url` (string), `count` (integer). Use the project ID, database ID, and table ID in `.env`.
   - **TMDB**: Get an API key from [The Movie Database](https://www.themoviedb.org/settings/api) and set `EXPO_PUBLIC_TMDB_API_KEY`.

   All variables are required; the app will throw a clear error on startup if any are missing.

3. **Start the app**

   ```bash
   pnpm start
   ```

   Then press `i` for iOS simulator, or scan the QR code with Expo Go.

## Scripts

| Command             | Description               |
| ------------------- | ------------------------- |
| `pnpm start`        | Start Expo dev server     |
| `pnpm ios`          | Run on iOS simulator      |
| `pnpm lint`         | Run ESLint                |
| `pnpm format`       | Format code with Prettier |
| `pnpm format:check` | Check formatting          |
| `pnpm lint:all`     | Lint and check formatting |

## Project structure

```
app/
  (tabs)/          # Tab screens: Home, Search, Saved, Profile
  movies/[id].tsx  # Movie detail screen
components/        # Reusable UI (MovieCard, TrendingCard, SearchBar)
constants/         # PATHS, COLORS, ENV, ICONS, IMAGES, THEME
services/          # TMDB client, Appwrite client
types/             # Shared TypeScript types (Movie, TrendingMovie, etc.)
```

## Features

- **Home**: Latest movies (TMDB discover) + trending movies (from Appwrite search counts)
- **Search**: Debounced search with TMDB; top result is recorded in Appwrite for trending
- **Movie detail**: Overview, genres, rating, budget/revenue, production companies
- **Saved / Profile**: Placeholder tabs for future features

## Learn more

- [Expo docs](https://docs.expo.dev/)
- [expo-router](https://docs.expo.dev/router/introduction/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Appwrite](https://appwrite.io/docs)
- [TMDB API](https://developers.themoviedb.org/3)
