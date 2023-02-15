import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useColorScheme } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';

const HeaderColorScheme = () =>
{
    const { colorScheme, setColorScheme } = useColorScheme();

    const handleTheme = () =>
    {
        setColorScheme( colorScheme === "light" ? "dark" : "light" )
    }
    return (
        <View className="flex-row items-center justify-between px-5 pt-10 pb-5">
            <View className="flex-row items-center justify-start">
                <Text className="font-PoppinsSemiBold text-xl dark:text-white">Personal Messages</Text>
            </View>
            <View className="flex-row items-center justify-end">
                {/* ThemeSwitcher */ }
                <View className="flex-row items-center justify-end">
                    {
                        colorScheme === 'dark' ?
                            <TouchableOpacity onPress={ handleTheme }>
                                <Ionicons name="moon" size={ 24 } color="white" />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={ handleTheme }>
                                <Ionicons name="sunny" size={ 24 } color="black" />
                            </TouchableOpacity>
                    }
                </View>
            </View>
        </View>
    )
}

export default HeaderColorScheme