import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions} from 'react-native'
import React from 'react'
import {router, useLocalSearchParams} from "expo-router";
import useFetch from "@/services/useFetch";
import {fetchMovieDetails} from "@/services/api";
import {icons} from "@/constants/icons";

const {width} = Dimensions.get('window');

interface MovieInfoProps {
    label: string;
    value?: string | number | null;
    icon?: any;
}

const MovieInfo = ({label, value, icon}: MovieInfoProps) => (
    <View className='flex-col items-start justify-center mt-4 bg-dark-300/30 p-4 rounded-xl border border-dark-200/50'>
        <View className='flex-row items-center mb-2'>
            {icon && <Image source={icon} className='size-4 mr-2' tintColor="#9CA3AF" />}
            <Text className='text-light-200 font-medium text-sm tracking-wide'>{label}</Text>
        </View>
        <Text className='text-light-100 font-semibold text-base leading-6'>{value || "N/A"}</Text>
    </View>
)

const StatCard = ({label, value, icon}: {label: string, value: string, icon?: any}) => (
    <View className='flex-1 bg-dark-300/40 p-4 rounded-2xl border border-dark-200/30 mx-1'>
        <View className='flex-row items-center justify-center mb-2'>
            {icon && <Image source={icon} className='size-5 mr-2' tintColor="#F59E0B" />}
            <Text className='text-light-200 font-medium text-xs tracking-wide uppercase'>{label}</Text>
        </View>
        <Text className='text-white font-bold text-lg text-center'>{value}</Text>
    </View>
)

const MovieDetails = () => {
    const {id} = useLocalSearchParams();
    const {data: movie, loading } = useFetch(() => fetchMovieDetails(id as string))

    if (loading) {
        return (
            <View className='bg-primary flex-1 items-center justify-center'>
                <Text className='text-white'>Loading...</Text>
            </View>
        )
    }

    return (
        <View className='bg-primary flex-1'>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 100
                }}
            >
                {/* Hero Section with Poster */}
                <View className='relative'>
                    <Image
                        source={{uri:`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}}
                        className='w-full h-[600px]'
                        resizeMode='cover'
                    />

                    {/* Gradient Overlay */}
                    <View className='absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent' />

                    {/* Movie Title Overlay */}
                    <View className='absolute bottom-0 left-0 right-0 p-6'>
                        <Text className='text-white font-bold text-3xl mb-2 text-center leading-tight'>
                            {movie?.title}
                        </Text>
                        <Text className='text-light-200 text-lg text-center font-medium'>
                            {movie?.tagline}
                        </Text>
                    </View>
                </View>

                {/* Content Section */}
                <View className='px-6 -mt-8 relative z-10'>

                    {/* Quick Info Cards */}
                    <View className='bg-dark-300/50 p-6 rounded-3xl border border-dark-200/30 mb-6 backdrop-blur-sm'>
                        <View className='flex-row items-center justify-between mb-4'>
                            <View className='flex-row items-center'>
                                <Text className='text-light-200 text-base font-medium'>
                                    {movie?.release_date?.split('-')[0]}
                                </Text>
                                <Text className='text-light-200 text-base mx-2'>•</Text>
                                <Text className='text-light-200 text-base font-medium'>
                                    {movie?.runtime}m
                                </Text>
                            </View>

                            <View className='flex-row items-center bg-accent/20 px-4 py-2 rounded-full border border-accent/30'>
                                <Image source={icons.star} className='size-5 mr-2' tintColor="#F59E0B" />
                                <Text className='text-accent font-bold text-lg'>
                                    {Math.round((movie?.vote_average ?? 0) * 10) / 10}
                                </Text>
                                <Text className='text-light-200 text-sm ml-1'>/10</Text>
                            </View>
                        </View>

                        <Text className='text-light-200 text-sm text-center'>
                            {movie?.vote_count?.toLocaleString()} votes
                        </Text>
                    </View>

                    {/* Overview Section */}
                    <MovieInfo
                        label="Overview"
                        value={movie?.overview}
                    />

                    {/* Genres */}
                    <View className='mt-4'>
                        <Text className='text-light-200 font-medium text-sm tracking-wide mb-3'>Genres</Text>
                        <View className='flex-row flex-wrap gap-2'>
                            {movie?.genres?.map((genre, index) => (
                                <View key={index} className='bg-accent/20 px-4 py-2 rounded-full border border-accent/30'>
                                    <Text className='text-accent font-medium text-sm'>{genre.name}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Financial Stats */}
                    <View className='mt-6'>
                        <Text className='text-light-200 font-medium text-sm tracking-wide mb-4'>Box Office</Text>
                        <View className='flex-row'>
                            <StatCard
                                label="Budget"
                                value={movie?.budget ? `$${(movie.budget / 1_000_000).toFixed(1)}M` : 'N/A'}
                            />
                            <StatCard
                                label="Revenue"
                                value={movie?.revenue ? `$${(movie.revenue / 1_000_000).toFixed(1)}M` : 'N/A'}
                            />
                        </View>
                    </View>

                    {/* Production Companies */}
                    <View className='mt-6'>
                        <Text className='text-light-200 font-medium text-sm tracking-wide mb-3'>Production Companies</Text>
                        <View className='flex-row flex-wrap gap-2'>
                            {movie?.production_companies?.slice(0, 3).map((company, index) => (
                                <View key={index} className='bg-dark-300/40 px-4 py-3 rounded-2xl border border-dark-200/30 flex-row items-center'>
                                    {company.logo_path && (
                                        <Image
                                            source={{uri: `https://image.tmdb.org/t/p/w92${company.logo_path}`}}
                                            className='size-6 mr-2'
                                            resizeMode='contain'
                                        />
                                    )}
                                    <Text className='text-light-100 font-medium text-sm'>{company.name}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Additional spacing for floating button */}
                    <View className='h-4' />
                </View>
            </ScrollView>

            {/* Floating Back Button */}
            <TouchableOpacity
                className='absolute bottom-8 left-6 right-6 bg-accent rounded-2xl py-4 flex flex-row items-center justify-center shadow-2xl border border-accent/30'
                onPress={router.back}
                style={{
                    shadowColor: '#F59E0B',
                    shadowOffset: {width: 0, height: 8},
                    shadowOpacity: 0.3,
                    shadowRadius: 12,
                    elevation: 8
                }}
            >
                <Image source={icons.arrow} className='size-5 mr-2 rotate-180' tintColor="#fff" />
                <Text className='text-white font-bold text-lg tracking-wide'>Go Back</Text>
            </TouchableOpacity>
        </View>
    )
}

export default MovieDetails