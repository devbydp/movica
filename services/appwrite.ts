import { Client, ID, Query, TablesDB } from "react-native-appwrite";

import { ENV } from "@/constants/env";
import type { Movie, TrendingMovie } from "@/types/movie";

export const client = new Client()
  .setEndpoint(ENV.appwrite.endpoint)
  .setProject(ENV.appwrite.projectId);

const database = new TablesDB(client);
const { databaseId: DATABASE_ID, tableId: TABLE_ID } = ENV.appwrite;

type UpdateSearchCountParams = {
  query: string;
  movie: Movie;
};

export async function updateSearchCount({
  query,
  movie,
}: UpdateSearchCountParams) {
  const result = await database.listRows({
    databaseId: DATABASE_ID,
    tableId: TABLE_ID,
    queries: [Query.equal("searchTerm", query)],
  });

  if (result.rows.length > 0) {
    const exisitingMovie = result.rows[0];
    await database.updateRow({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      rowId: exisitingMovie.$id,
      data: {
        count: exisitingMovie.count + 1,
      },
    });
    return;
  }

  await database.createRow({
    databaseId: DATABASE_ID,
    tableId: TABLE_ID,
    rowId: ID.unique(),
    data: {
      searchTerm: query,
      movie_id: movie.id,
      title: movie.title,
      poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      count: 1,
    },
  });
}

export async function getTrendingMovies(): Promise<TrendingMovie[]> {
  const result = await database.listRows({
    databaseId: DATABASE_ID,
    tableId: TABLE_ID,
    queries: [Query.limit(10), Query.orderDesc("count")],
  });

  const rows = result.rows as unknown as TrendingMovie[];
  const seen = new Set<number>();
  const unique = rows.filter((row) => {
    if (seen.has(row.movie_id)) return false;
    seen.add(row.movie_id);
    return true;
  });
  return unique.slice(0, 5);
}
