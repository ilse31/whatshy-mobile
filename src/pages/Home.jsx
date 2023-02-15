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

    useEffect( () =>
    {
        AsyncStorage.getItem( "users" ).then( ( value ) =>
        {
            if ( value !== null )
            {
                setisLogin( true )
            }
            else
            {
                navigation.navigate( "Login" )
            }
        } )
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