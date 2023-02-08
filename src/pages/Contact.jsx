import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Mainlayouts from '../layouts/Mainlayouts'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
const Contact = () =>
{
    const [ showDropdown, setshowDropdown ] = useState( false )

    return (
        <Mainlayouts>
            <ScrollView className='flex-1 bg-white'>
                <View className="pt-10 pb-5 px-5">
                    {/* search icon */ }
                    <View className="border-2 border-gray-300 rounded-lg p-2 flex-row w-full">
                        <AntDesign name="search1" size={ 24 } color="black" />
                        <TextInput
                            placeholder='Search'
                            className='ml-3 w-full'
                        />
                    </View>
                </View>

                <View className="flex-row justify-between h-screen items-center px-5 flex-1 z-30 h-10">
                    <Text className="text-xl font-bold">Contacts</Text>
                    {/* dropdown with option navigation */ }
                    <View className="flex-row items-center">
                        <TouchableOpacity onPress={
                            () => setshowDropdown( !showDropdown )
                        }>
                            <AntDesign name="plus" size={ 24 } color="black" />
                        </TouchableOpacity>
                        {
                            showDropdown &&
                            <View className="absolute bg-white rounded-lg shadow-lg top-10 z-30 right-0 border">
                                <View className="flex-col gap-3 p-3">
                                    <TouchableOpacity>
                                        <Text className="text-gray-400">Set Template Chat</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Text className="text-gray-400">New Contact</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }
                    </View>
                </View>

                {/* contact list */ }
                <View className="flex-row justify-between items-center px-5 py-5">
                    <View className="flex-row items-center">
                        <View className="bg-gray-300 h-12 w-12 rounded-full items-center justify-center">
                            <MaterialCommunityIcons name="account" size={ 28 } color="gray" />
                        </View>
                        <View className="ml-5">
                            <Text className="font-bold">Ilham</Text>
                            <Text className="text-gray-400">089530571642</Text>
                        </View>
                    </View>
                    <TouchableOpacity>
                        <AntDesign name="right" size={ 24 } color="black" />
                    </TouchableOpacity>
                </View>
                <View className="flex-row justify-between items-center px-5 py-5">
                    <View className="flex-row items-center">
                        <View className="bg-gray-300 h-12 w-12 rounded-full items-center justify-center">
                            <MaterialCommunityIcons name="account" size={ 28 } color="gray" />
                        </View>
                        <View className="ml-5">
                            <Text className="font-bold">Ilham</Text>
                            <Text className="text-gray-400">089530571642</Text>
                        </View>
                    </View>
                    <TouchableOpacity>
                        <AntDesign name="right" size={ 24 } color="black" />
                    </TouchableOpacity>
                </View>
                <View className="flex-row justify-between items-center px-5 py-5">
                    <View className="flex-row items-center">
                        <View className="bg-gray-300 h-12 w-12 rounded-full items-center justify-center">
                            <MaterialCommunityIcons name="account" size={ 28 } color="gray" />
                        </View>
                        <View className="ml-5">
                            <Text className="font-bold">Ilham</Text>
                            <Text className="text-gray-400">089530571642</Text>
                        </View>
                    </View>
                    <TouchableOpacity>
                        <AntDesign name="right" size={ 24 } color="black" />
                    </TouchableOpacity>
                </View>
                <View className="flex-row justify-between items-center px-5 py-5">
                    <View className="flex-row items-center">
                        <View className="bg-gray-300 h-12 w-12 rounded-full items-center justify-center">
                            <MaterialCommunityIcons name="account" size={ 28 } color="gray" />
                        </View>
                        <View className="ml-5">
                            <Text className="font-bold">Ilham</Text>
                            <Text className="text-gray-400">089530571642</Text>
                        </View>
                    </View>
                    <TouchableOpacity>
                        <AntDesign name="right" size={ 24 } color="black" />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </Mainlayouts>
    )
}

export default Contact