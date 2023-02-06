import { View, Text, TextInput } from 'react-native'
import React from 'react'
import Mainlayouts from '../layouts/Mainlayouts'
import { ScrollView } from 'react-native-gesture-handler'

const PersonalMessages = () =>
{
    return (
        <Mainlayouts>
            <ScrollView className='flex-1 bg-white'
            >
                <View className='p-10'
                >
                    <Text>PersonalMessages</Text>


                </View>
            </ScrollView>
        </Mainlayouts>
    )
}

export default PersonalMessages