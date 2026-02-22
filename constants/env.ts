function requireEnv(value: string | undefined, key: string): string {
  if (value === undefined || value.trim() === "") {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

export const ENV = {
  appwrite: {
    databaseId: requireEnv(
      process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
      "EXPO_PUBLIC_APPWRITE_DATABASE_ID"
    ),
    tableId: requireEnv(
      process.env.EXPO_PUBLIC_APPWRITE_TABLE_ID,
      "EXPO_PUBLIC_APPWRITE_TABLE_ID"
    ),
    endpoint: requireEnv(
      process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
      "EXPO_PUBLIC_APPWRITE_ENDPOINT"
    ),
    projectId: requireEnv(
      process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
      "EXPO_PUBLIC_APPWRITE_PROJECT_ID"
    ),
  },
  tmdb: {
    baseUrl: requireEnv(
      process.env.EXPO_PUBLIC_TMDB_BASE_URL,
      "EXPO_PUBLIC_TMDB_BASE_URL"
    ),
    apiKey: requireEnv(
      process.env.EXPO_PUBLIC_TMDB_API_KEY,
      "EXPO_PUBLIC_TMDB_API_KEY"
    ),
  },
} as const;
