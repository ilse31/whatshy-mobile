import { View, Text } from 'react-native'
import React from 'react'
import Mainlayouts from '../layouts/Mainlayouts'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

const Account = () =>
{
    const navigate = useNavigation()
    const clearAsyncStorage = async () =>
    {
        await AsyncStorage.clear();
        navigate.navigate( "login" )
    }

    return (
        <Mainlayouts>
            <View>
                <TouchableOpacity onPress={clearAsyncStorage}>
                    <Text>Logout</Text>
                </TouchableOpacity>
            </View>

        </Mainlayouts>
    )
}

export default Account