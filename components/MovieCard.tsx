import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";
import {icons} from "@/constants/icons";

// type Movie = {
//     id: string | number;
//     poster_path: string | null;
//     title: string;
// };

const MovieCard = ({ id, poster_path, title, vote_average, release_date }: Movie) => {
    const imageUrl = poster_path
        ? `https://image.tmdb.org/t/p/w500${poster_path}` // ✅ Note: no slash after `/w500`
        : "https://via.placeholder.com/600x400/1a1a1a/ffffff?text=No+Image";



    return (
        <Link href={`/movies/${id}`} asChild>
            <TouchableOpacity className="w-[30%] my-2">
                <Image
                    source={{ uri: imageUrl }}
                    className="w-full h-52 rounded-lg"
                    resizeMode="cover"
                />
                <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>{title}</Text>
                <View className='flex-row items-center justify-between w-full'>

                    {/* Left: Star and Vote */}
                    <View className='flex-row items-center gap-x-1'>
                        <Image source={icons.star} className='size-4' />
                        <Text className='text-xs text-white font-bold uppercase'>
                            {Math.round(vote_average / 2)}
                        </Text>
                    </View>

                    {/* Right: Release Date and Type */}
                    <View className='items-end'>
                        <Text className='text-xs text-light-300 font-medium'>
                            {release_date?.split('-')[0]}
                        </Text>
                        {/*<Text className='text-xs font-medium text-light-300 uppercase'>*/}
                        {/*    Movies*/}
                        {/*</Text>*/}
                    </View>

                </View>

            </TouchableOpacity>
        </Link>
    );
};

export default MovieCard;
