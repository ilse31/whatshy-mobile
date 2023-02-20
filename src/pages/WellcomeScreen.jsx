import { View, Text, Image, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import Mainlayouts from '../layouts/Mainlayouts'
import svg from '../../assets/svg'
import Button from '../components/global/Button'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const WellcomeScreen = () =>
{
    const navigation = useNavigation();

    useEffect( () =>
    {
        AsyncStorage.getItem( "users" ).then( ( value ) =>
        {
            if ( value !== null )
            {
                navigation.navigate( "main" )
            }
        }
        )
    }, [] )


    return (
        <Mainlayouts>
            <View className='h-1/2 bg-emerald-500 max-h-full rounded-b-[100px] relative -z-10' >
                <View className="justify-end top-[105px] flex-1 items-center">
                    <Image className="h-52 border shadow shadow-emerald-700 w-40 absolute" source={ svg.Logo } />
                </View>
            </View>
            <View className="flex-1 justify-center items-center gap-10">
                <Text className="font-PoppinsSemiBold text-3xl">Whatshy</Text>
                <Text className="text-md font-Poppins text-center">A platform for Chat without Save Whatsapp Number</Text>
                <View className="items-center">
                    <Button title={ "Get Started" } onPress={ () => navigation.navigate( "main" ) } />
                </View>
            </View>
        </Mainlayouts >
    )
}

export default WellcomeScreen