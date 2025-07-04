import {
    ActivityIndicator,
    FlatList,
    Image,
    Text,
    View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { images } from "@/constants/images";
import MovieCard from "@/components/MovieCard";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import { updateSearchCount } from "@/services/appwrite";
import type { Movie } from "@/services/appwrite";

const Search = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const {
        data: movies,
        loading,
        error,
        refetch,
        reset,
    } = useFetch(() => fetchMovies({ query: searchQuery }), false);

    // Debounce search input
    useEffect(() => {
        const timeout = setTimeout(() => {
            const handleSearch = async () => {
                if (searchQuery.trim().length > 0) {
                    await refetch();
                } else {
                    reset();
                }
            };
            handleSearch();
        }, 600);

        return () => clearTimeout(timeout);
    }, [searchQuery]);

    useEffect(() => {
        const handleTrackSearch = async () => {
            if (searchQuery.trim().length > 0 && movies?.length > 0) {
                await updateSearchCount(searchQuery, movies[0]);
            }
        };
        handleTrackSearch();
    }, [movies]);

    return (
        <View className="flex-1 bg-primary">
            <Image
                source={images.bg}
                className="flex-1 absolute w-full z-0"
                resizeMode="cover"
            />
            <FlatList
                data={movies}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <MovieCard {...item} />}
                className="px-5"
                numColumns={3}
                columnWrapperStyle={{
                    justifyContent: "center",
                    gap: 16,
                    marginVertical: 16,
                }}
                contentContainerStyle={{ paddingBottom: 100 }}
                ListHeaderComponent={
                    <>
                        <View className="w-full flex-row justify-center mt-20 items-center">
                            <Image source={icons.logo} className="w-12 h-10" />
                        </View>
                        <View className="my-5 mt-10">
                            <SearchBar
                                placeholder="Search ..."
                                value={searchQuery}
                                onChangeText={(text: string) => setSearchQuery(text)}
                            />
                        </View>
                        {loading && (
                            <ActivityIndicator
                                size="large"
                                color="#0000ff"
                                className="my-3"
                            />
                        )}
                        {error && (
                            <Text className="text-red-500 px-5 my-3">
                                Error: {error.message}
                            </Text>
                        )}
                        {!loading &&
                            !error &&
                            searchQuery.trim() !== "" &&
                            movies?.length > 0 && (
                                <Text className="text-xl text-white font-bold px-5 mb-3">
                                    Search Results for{" "}
                                    <Text className="text-purple-700">{searchQuery}</Text>
                                </Text>
                            )}
                        {!loading &&
                            !error &&
                            searchQuery.trim() !== "" &&
                            movies?.length === 0 && (
                                <Text className="text-white px-5 mb-3">
                                    No results found.
                                </Text>
                            )}
                    </>
                }
            />
        </View>
    );
};

export default Search;
