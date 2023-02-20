import { View, Text, ScrollView, TextInput, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import Mainlayouts from '../layouts/Mainlayouts'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { useGetPhonebookQuery } from '../services/api';
import Base64 from '../helpers/Base64';
const Contact = () =>
{
    const [ showDropdown, setshowDropdown ] = useState( false )
    const [ user, setUser ] = useState( {} )
    const [ searchValue, setsearchValue ] = useState( '' )
    const getAsyncStorage = async () =>
    {
        const users = await AsyncStorage.getItem( "users" )
        setUser( JSON.parse( users ) )
    }


    useEffect( () =>
    {
        getAsyncStorage()
    }, [] )

    const { data, refetch } = useGetPhonebookQuery( {
        id: user.id,
    } )

    console.log( data?.users_by_pk.contactlist );
    console.log( user.id );



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
                <ScrollView className="flex-1">
                    {
                        data?.users_by_pk.contactlist.map( ( item, index ) =>
                        {
                            return (
                                <View className="flex-row items-center justify-between px-5 py-3 border-b border-gray-300" key={ index }>
                                    <View className="flex-row items-center">
                                        <MaterialCommunityIcons name="account-circle" size={ 24 } color="black" />
                                        <View className="flex-col ml-3">
                                            <Text className="font-bold">{ atob( item.name ) }</Text>
                                            <Text className="text-gray-400">{ atob( item.number ) }</Text>
                                        </View>
                                    </View>
                                    <View className="flex-row items-center">
                                        <TouchableOpacity>
                                            <MaterialCommunityIcons name="message-reply-text" size={ 24 } color="black" />
                                        </TouchableOpacity>
                                        <TouchableOpacity>
                                            <MaterialCommunityIcons name="dots-vertical" size={ 24 } color="black" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        } )
                    }
                </ScrollView>
            </ScrollView>
        </Mainlayouts>
    )
}

export default Contact