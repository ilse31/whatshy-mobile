import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'

const Home = () =>
{
    //clear AsyncStorage
    const navigation = useNavigation()
    const [ isLogin, setisLogin ] = useState( false )
    const getAsyncStorage = async () =>
    {
        try
        {
            const data = await JSON.parse( await AsyncStorage.getItem( 'users' ) )
            console.log( data.username )
            console.log( "islogin", isLogin );
        }
        catch ( e )
        {
            console.log( e )
        }
    }

    useEffect( () =>
    {
        getAsyncStorage()
        if ( !isLogin )
        {
            navigation.navigate( 'Login' )
        }
    }, [] )
    console.log( "islogin", isLogin );
    return (
        <View>
            <Text>Home</Text>
        </View>
    )
}

export default Home