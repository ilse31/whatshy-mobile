import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Mainlayouts from '../layouts/Mainlayouts'
import { ScrollView } from 'react-native-gesture-handler'
import Button from '../components/global/Button'
import { Formik } from 'formik'
import { ChatValue } from '../components/global/InitValue'
import { ChatValidations } from '../components/global/Validations'
import HeaderColorScheme from '../components/HeaderColorScheme'
import AsyncStorage from '@react-native-async-storage/async-storage'

const PersonalMessages = () =>
{
    const [ users, setUsers ] = useState()

    const getAsyncStorage = async () =>
    {
        try
        {
            const value = await AsyncStorage.getItem( 'users' )
            if ( value !== null )
            {
                setUsers( JSON.parse( value ) )
            }
        } catch ( e )
        {
            console.log( e );
        }
    }

    useEffect( () =>
    {
        getAsyncStorage()
    }, [] )
    const handleChat = ( values, { resetForm } ) =>
    {
        console.log( values );
        resetForm()
    }

    function getDayName ( dateStr, locale )
    {
        var date = new Date( dateStr );
        return date.toLocaleDateString( locale, { weekday: 'long' } );
    }

    return (
        <Mainlayouts>
            <View>
                <HeaderColorScheme />
            </View>
            <View className="px-5">
                <View>
                    <Text className="capitalize text-2xl font-PoppinsBold">
                        Hi { users?.username }
                    </Text>
                    <Text className="font-PoppinsMedium text-md dark:text-white">Using Personal Messages you can send message to unsaved number.</Text>
                </View>
                <View className="mt-5">
                    {/* see today and  clock */ }
                    <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center justify-end">
                            <Text className="font-PoppinsSemiBold text-xl dark:text-white">{
                                //get name day
                                new Date().toLocaleString( 'en-us', { weekday: 'long' } )
                            }</Text>
                            {
                                new Date().getHours() < 12 ?
                                    <Text className="font-PoppinsSemiBold text-xl dark:text-white">, Good Morning</Text>
                                    :
                                    <Text className="font-PoppinsSemiBold text-xl dark:text-white">, Good Afternoon</Text>
                            }
                        </View>
                    </View>
                </View>
            </View>
            <ScrollView className='dark:bg-slate-800'>
                <View className="px-5">
                    {/* <View>
                        <Text>Hot News</Text>
                        <View>
                            <ScrollView horizontal={ true } showsHorizontalScrollIndicator={ false } className="flex-1 gap-x-5">
                                <View className="w-40 h-40 bg-gray-200 rounded-lg items-center justify-center">
                                    <Text className="font-PoppinsSemiBold text-xl">1</Text>
                                </View>
                                <View className="w-40 h-40 bg-gray-200 rounded-lg items-center justify-center">
                                    <Text className="font-PoppinsSemiBold text-xl">2</Text>
                                </View>
                                <View className="w-40 h-40 bg-gray-200 rounded-lg items-center justify-center">
                                    <Text className="font-PoppinsSemiBold text-xl">2</Text>
                                </View>
                            </ScrollView>
                        </View>
                    </View> */}
                    <Formik
                        initialValues={ ChatValue }
                        validationSchema={ ChatValidations }
                        onSubmit={ handleChat }
                    >
                        { ( { handleChange, handleBlur, handleSubmit, values, errors, touched } ) => (
                            <View className="gap-y-3 w-full">
                                <View className="gap-y-4">
                                    <Text className="dark:text-white">Phone Number</Text>
                                    <TextInput
                                        placeholder='Phone Number'
                                        value={ values.phoneNumber }
                                        placeholderTextColor={ 'gray' }
                                        onChangeText={ handleChange( 'phoneNumber' ) }
                                        onBlur={ handleBlur( 'phoneNumber' ) }
                                        className='border-2 border-gray-300 w-full p-2 rounded-lg dark:text-white'
                                    />
                                    {
                                        errors.phoneNumber && touched.phoneNumber ? (
                                            <Text className="text-red-500 px-3">{ errors.phoneNumber }</Text>
                                        ) : null
                                    }
                                </View>
                                <View className="gap-y-4">
                                    <Text className="dark:text-white">Message</Text>
                                    <TextInput
                                        onchangeText={ handleChange( 'message' ) }
                                        multiline={ true }
                                        value={ values.message }
                                        placeholderTextColor={ 'gray' }
                                        onBlur={ handleBlur( 'message' ) }
                                        numberOfLines={ 10 }
                                        placeholder='Message'
                                        className='border-2 border-gray-300 p-2 rounded-lg'
                                    />
                                    {
                                        errors.message && touched.message ? (
                                            <Text className="text-red-500 px-3">{ errors.message }</Text>
                                        ) : null
                                    }
                                </View>
                                <View className="w-full items-center">
                                    <Button rounded='rounded-lg' title='Send' w={ "full" } onPress={
                                        handleSubmit
                                    } disabled={
                                        errors.phoneNumber || errors.message ? true : false
                                    } />
                                </View>
                            </View>
                        ) }
                    </Formik>
                </View>
            </ScrollView>
        </Mainlayouts>
    )
}

export default PersonalMessages