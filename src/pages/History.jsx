import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import Mainlayouts from '../layouts/Mainlayouts'

const History = () =>
{
    return (
        <Mainlayouts>
            <ScrollView className='flex-1 bg-white'>
                <View className='py-10 px-5'>
                    <View className="flex-row justify-between mb-5 items-center">
                        <Text>History Chat</Text>
                        <TouchableOpacity className="bg-[#00D7B9] px-3 py-2 rounded-lg">
                            <Text className="text-white">Delete All</Text>
                        </TouchableOpacity>
                    </View>
                    <View className='flex-row justify-between items-center mt-3 p-3 rounded border-gray-500 border'>
                        <View className="flex-row items-center">
                            <View className="">
                                <Text className="font-bold">080908908</Text>
                                <Text className="text-gray-400">089530571642</Text>
                            </View>
                        </View>
                        <View className="flex-col items-end justify-center">
                            <Text className="text-gray-400">12:00</Text>
                            <Text className="text-gray-400 ml-2">12/12/2020</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </Mainlayouts>
    )
}

export default History