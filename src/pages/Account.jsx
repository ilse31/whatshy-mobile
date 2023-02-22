import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { BackHandler } from 'react'
import Mainlayouts from '../layouts/Mainlayouts'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import svg from '../../assets/svg'
import { AntDesign } from '@expo/vector-icons';
import { useEffect } from 'react'
import { useState } from 'react'

const Account = () =>
{
    const navigate = useNavigation()

    const RemoveUser = async () =>
    {
        await AsyncStorage.clear()
        navigate.navigate( "Login" )
    }

    const [ users, setUsers ] = useState()
    useEffect( () =>
    {
        AsyncStorage.getItem( "users" ).then( res =>
        {
            setUsers( JSON.parse( res ) )
        } )
    }, [] )


    return (
        <Mainlayouts>
            <Image
                style={ { position: "absolute", alignSelf: "center" } }
                source={ svg.circleIL }
            />
            <View className="pt-10 pb-5 px-5">
                <View className="justify-between flex-row items-center">
                    <Text className="text-2xl font-bold text-center text-white font-PoppinsBold">Account</Text>
                    <TouchableOpacity onPressIn={
                        () => RemoveUser()
                    }>
                        <AntDesign name="logout" size={ 24 } color="white" />
                    </TouchableOpacity>
                </View>
                <View className="items-center mt-5">
                    <Image source={ svg.fotoProfile } />
                    <Text className="text-2xl font-PoppinsBold mt-5 capitalize">{ users?.username }</Text>
                </View>
                <View
                    style={ {
                        backgroundColor: "rgba(0, 215, 185, 0.4)",
                        borderRadius: 16,
                        width: "100%",
                    } }>
                    <View style={ { padding: 20 } }>
                        <Text
                            className="text-sm font-PoppinsMedium">
                            Email
                        </Text>
                        <Text
                            className="text-sm font-PoppinsMedium">
                            { users?.email }
                        </Text>
                    </View>
                </View>
            </View>
        </Mainlayouts >
    )
}

export default Account