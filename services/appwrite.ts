import { Client, Databases, ID, Query} from "appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;
const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!;

const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(PROJECT_ID);

const database = new Databases(client);


export interface Movie {
    id: number;
    title: string;
    poster_path: string;
}

export const updateSearchCount = async (query: string, movie: Movie): Promise<void> => {
    try {
        const result = await database.listDocuments(
            DATABASE_ID,
            COLLECTION_ID,
            [Query.equal("searchTerm", query)]
        );

        if (result.documents.length > 0) {
            const existingMovie = result.documents[0];

            await database.updateDocument(
                DATABASE_ID,
                COLLECTION_ID,
                existingMovie.$id,
                {
                    count: (existingMovie.count || 0) + 1,
                }
            );
        } else {
            await database.createDocument(
                DATABASE_ID,
                COLLECTION_ID,
                ID.unique(),
                {
                    searchTerm: query,
                    movie_id: movie.id,
                    title: movie.title,
                    count: 1,
                    poster_url: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
                }
            );
        }
    } catch (error) {
        console.error("Error in updateSearchCount:", error);
    }
};

export const getTrendingMovies = async  (): Promise<TrendingMovie[]| undefined> =>{

    try {
        const result = await database.listDocuments(
            DATABASE_ID,
            COLLECTION_ID,
            [
                Query.limit(5),
                Query.orderDesc('count'),

       ] );

        return  result.documents as unknown as TrendingMovie[]

    } catch (error){
        console.error("Error in getTrendingMovies:", error);
        return  undefined;
    }


}