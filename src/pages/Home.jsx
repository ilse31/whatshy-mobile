import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import Mainlayouts from '../layouts/Mainlayouts'

const Home = () =>
{
    //clear AsyncStorage
    const navigation = useNavigation()
    const [ isLogin, setisLogin ] = useState( false )

    const [ numbers, setnumbers ] = useState( 0 )
    const getAsyncStorage = async () =>
    {
        try
        {
            const data = await JSON.parse( await AsyncStorage.getItem( 'users' ) )
            if ( data )
            {
                setisLogin( true )
            }
            console.log( data )
        }
        catch ( e )
        {
            console.log( e )
        }
    }

    useEffect( () =>
    {
        getAsyncStorage()
    }, [] )
    return (
        <Mainlayouts>
            <View>
                <Text>Home</Text>
            </View>
        </Mainlayouts>
    )
}

export default Home