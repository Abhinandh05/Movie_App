import {Image, ImageBackground, Text, View, Animated, TouchableOpacity} from 'react-native';
import React, { useEffect, useRef } from 'react';
import { Tabs } from 'expo-router';
import { images } from '@/constants/images';
import { icons } from '@/constants/icons';
import { LinearGradient } from 'expo-linear-gradient';

const TabIcon = ({ focused, icon, title }: any) => {
    const scaleAnim = useRef(new Animated.Value(focused ? 1 : 0.9)).current;
    const opacityAnim = useRef(new Animated.Value(focused ? 1 : 0.7)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.spring(scaleAnim, {
                toValue: focused ? 1 : 0.9,
                useNativeDriver: true,
                tension: 100,
                friction: 7,
            }),
            Animated.timing(opacityAnim, {
                toValue: focused ? 1 : 0.7,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start();
    }, [focused]);

    if (focused) {
        return (
            <Animated.View
                style={{
                    transform: [{ scale: scaleAnim }],
                    opacity: opacityAnim,
                }}
                className="w-full h-full justify-center items-center px-2"
            >
                <LinearGradient
                    colors={['#6366F1', '#8B5CF6', '#A855F7']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                        minWidth: 100,
                        height: 44,
                        borderRadius: 22,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: 16,
                        shadowColor: '#8B5CF6',
                        shadowOffset: {
                            width: 0,
                            height: 4,
                        },
                        shadowOpacity: 0.3,
                        shadowRadius: 8,
                        elevation: 8,
                        marginTop:30,
                    }}
                >
                    <View style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        borderRadius: 12,
                        padding: 6,
                        marginRight: 8,
                    }}>
                        <Image
                            source={icon}
                            tintColor="#FFFFFF"
                            style={{ width: 16, height: 16 }}
                        />
                    </View>
                    <Text
                        style={{
                            fontSize: 13,
                            color: '#FFFFFF',
                            fontWeight: '600',
                            textAlign: 'center',
                            textShadowColor: 'rgba(0, 0, 0, 0.2)',
                            textShadowOffset: { width: 0, height: 1 },
                            textShadowRadius: 2,
                        }}
                        numberOfLines={1}
                    >
                        {title}
                    </Text>
                </LinearGradient>
            </Animated.View>
        )
    }

    return (
        <Animated.View
            style={{
                transform: [{ scale: scaleAnim }],
                opacity: opacityAnim,
            }}
            className="w-full h-full justify-center items-center"
        >
            <View style={{
                backgroundColor: 'rgba(168, 181, 219, 0.1)',
                borderRadius: 12,
                padding: 8,
                borderWidth: 1,
                borderColor: 'rgba(168, 181, 219, 0.2)',
                marginTop: 25,
            }}>
                <Image
                    source={icon}
                    tintColor="#A8B5DB"
                    style={{ width: 20, height: 20 }}
                />
            </View>
        </Animated.View>
    )
}

const TabLayout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarItemStyle: {
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                tabBarStyle: {
                    backgroundColor: 'rgba(15, 13, 35, 0.95)',
                    backdropFilter: 'blur(20px)',
                    borderTopWidth: 0,
                    marginHorizontal: 16,
                    marginBottom: 32,
                    height: 68,
                    position: 'absolute',
                    overflow: 'visible',
                    borderRadius: 34,
                    borderWidth: 1,
                    borderColor: 'rgba(99, 102, 241, 0.2)',
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    shadowColor: '#000000',
                    shadowOffset: {
                        width: 0,
                        height: 8,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 16,
                    elevation: 16,
                }
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={icons.home}
                            title="Home"
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    title: 'Search',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={icons.search}
                            title="Search"
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="saved"
                options={{
                    title: 'Saved',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={icons.save}
                            title="Saved"
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={icons.person}
                            title="Profile"
                        />
                    ),
                }}
            />

        </Tabs>
    );
};

export default TabLayout;