import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Mainlayouts from '../layouts/Mainlayouts'
import { useEffect } from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from '@expo/vector-icons';

const History = () =>
{
    const [ history, setHistory ] = useState( [] )
    const getHistory = async () =>
    {
        try
        {
            const data = await AsyncStorage.getItem( 'history' )
            if ( data !== null )
            {
                console.log( data );
                const dataParse = JSON.parse( data )
                setHistory( dataParse )
            }
            else
            {
                console.log( 'data kosong' );
            }
        } catch ( error )
        {

        }
    }

    const deleteHistory = async () =>
    {
        try
        {
            await AsyncStorage.removeItem( 'history' )
            console.log( 'data berhasil dihapus' );
        } catch ( error )
        {
            console.log( error );
        }
    }

    const deleteHistorybyId = async ( id ) =>
    {
        try
        {
            const data = await AsyncStorage.getItem( 'history' )
            if ( data !== null )
            {
                const dataParse = JSON.parse( data )
                const newData = dataParse.filter( ( item ) => item.id !== id )
                await AsyncStorage.setItem( 'history', JSON.stringify( newData ) )
                console.log( 'data berhasil dihapus' );
            }
            else
            {
                console.log( 'data kosong' );
            }
        } catch ( error )
        {
            console.log( error );
        }
    }

    useEffect( () =>
    {
        console.log( 'data effect' )
        getHistory()
    }, [] )



    return (
        <Mainlayouts>
            <ScrollView className='flex-1 bg-white'>
                <View className='py-10 px-5 '>
                    <View className="flex-row justify-between mb-5 items-center">
                        <Text>History Chat</Text>
                        <TouchableOpacity className="bg-[#00D7B9] px-3 py-2 rounded-lg" onPressIn={ () => deleteHistory() }
                        >
                            <Text className="text-white">Delete All</Text>
                        </TouchableOpacity>
                    </View>
                    <View className={ `${ history.length > 0 ? 'flex-col flex-1' : 'h-96' }` }>
                        {
                            history.length > 0 ? history.map( ( item, index ) =>
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
                            ) :
                                <View className="flex-col justify-center items-center h-full">
                                    <View className="justify-center items-center">
                                        <Text className="text-gray-400">No History</Text>
                                        <AntDesign name="inbox" size={ 24 } color="gray" />
                                    </View>
                                </View>
                        }
                    </View>
                </View>
            </ScrollView>
        </Mainlayouts >
    )
}

export default History