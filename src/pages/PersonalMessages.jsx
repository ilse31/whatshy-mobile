import { View, Text, TextInput, TouchableOpacity, StyleSheet, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import Mainlayouts from '../layouts/Mainlayouts'
import { ScrollView } from 'react-native-gesture-handler'
import Button from '../components/global/Button'
import { Formik } from 'formik'
import { ChatValue } from '../components/global/InitValue'
import { ChatValidations } from '../components/global/Validations'
import HeaderColorScheme from '../components/HeaderColorScheme'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import { weatherConditions } from '../helpers/weatherCondition'
import * as Yup from "yup";

const PersonalMessages = () =>
{
    const [ users, setUsers ] = useState()
    const [ value, setValue ] = useState( "Pucakwangi" )
    const [ weather, setWeather ] = useState()
    const api = {
        key: "4f8e795dcd6dbf7b9f5276bff095ffc1",
        base: "https://api.openweathermap.org/data/2.5/"
    }

    const getWeather = async () =>
    {
        await fetch( `${ api.base }weather?q=${ value }&units=metric&APPID=${ api.key }` )
            .then( res => res.json() )
            .then( result =>
            {
                setWeather( result )
                console.log( result );
            } ).catch( e => console.log( e ) )
    }

    let initValue = {
        phoneNumber: "",
        messages: "",
    }
    const phoneRegExp = /^(\+62|62)8[1-9][0-9]{6,9}$/;

    const validate = Yup.object().shape( {
        phoneNumber: Yup.string()
            .required( "Phone Number Required" )
            .max( 15 )
            .min( 13 )
            .matches( phoneRegExp, "Phone number is not valid, using 62 or +62" ),
        message: Yup.string().required( "Please Enter your message" ),
    } );


    const dateBuilder = ( d ) =>
    {
        let months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]
        let days = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ]

        let day = days[ d.getDay() ];
        let date = d.getDate();
        let month = months[ d.getMonth() ];
        let year = d.getFullYear();

        return `${ day } ${ date } ${ month } ${ year }`
    }

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
        // search()
        getWeather()
        getAsyncStorage()
    }, [] )
    const handleChat = ( values ) =>
    {
        alert( "Message Sent" )
        console.log( values );

    }


    return (
        <Mainlayouts>
            <ScrollView className="my-10">
                <View className="px-5">
                    <View className="mb-5">
                        <View className="border-2 border-gray-300 rounded-lg p-2 justify-around flex-row w-full">
                            <TextInput
                                value={ value }
                                onChangeText={ ( text ) => setValue( text ) }
                                placeholder='Search'
                                placeholderTextColor={ 'gray' }
                                className='ml-3 w-full'
                            />
                            <TouchableOpacity onPress={ getWeather } className=" pr-5">
                                <AntDesign name="search1" size={ 24 } color="black" />
                            </TouchableOpacity>
                        </View>
                        <View className="flex-col mt-2">
                            {
                                typeof weather != "undefined" ? (
                                    <View className="flex-row justify-between flex-row w-full">
                                        <View className="flex-row flex-col">
                                            <Text className="text-md font-PoppinsMedium capitalize">{ weather.name }</Text>
                                            <Text className="text-2xl font-PoppinsMedium capitalize">{ Math.round( weather.main.temp ) }°c</Text>
                                            <Text className="text-md font-PoppinsMedium capitalize">{ weather.weather[ 0 ].main }</Text>
                                        </View>
                                        <View className="flex-row flex-col">
                                            <Text className="text-md font-PoppinsMedium capitalize">{ dateBuilder( new Date() ) }</Text>
                                            <MaterialCommunityIcons name={ weatherConditions[ weather.weather[ 0 ].main ].icon } size={ 50 } color={ weatherConditions[ weather.weather[ 0 ].main ].color } />
                                        </View>
                                    </View>
                                ) : ( <Text className="text-2xl font-PoppinsBold capitalize">Loading...</Text> )
                            }
                        </View>
                    </View>
                    <View>
                        <Text className="capitalize text-2xl font-PoppinsBold dark:text-white">
                            Hi { users?.username }
                        </Text>
                        <Text className="font-PoppinsMedium text-md dark:text-white">Using Personal Messages you can send message to unsaved number.</Text>
                    </View>
                </View>
                <View className="px-5">
                    <View className='dark:bg-slate-800'>
                        <Formik className="w-full"
                            initialValues={ initValue }
                            validationSchema={ validate }
                            onSubmit={ ( values ) => handleChat( values ) }
                        >
                            { ( { handleChange, handleBlur, handleSubmit, values, errors, touched } ) => (
                                <View className="gap-y-3 w-full">
                                    <View className="gap-y-4">
                                        <Text className="dark:text-white">Phone Number</Text>
                                        <TextInput
                                            placeholder='Phone Number'
                                            value={ values.phoneNumber }
                                            keyboardType='phone-pad'
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
                                            placeholder='Chat Message'
                                            value={ values.messages }
                                            keyboardType='default'
                                            placeholderTextColor={ 'gray' }
                                            onChangeText={ handleChange( 'messages' ) }
                                            onBlur={ handleBlur( 'messages' ) }
                                            className='border-2 border-gray-300 w-full p-2 rounded-lg dark:text-white'
                                        />
                                        {
                                            errors.messages && touched.messages ? (
                                                <Text className="text-red-500 px-3">{ errors.messages }</Text>
                                            ) : null
                                        }
                                    </View>
                                    <View className="gap-y-4">
                                        <Button title="Send" onPress={ handleSubmit } disabled={
                                            errors.phoneNumber || errors.messages ? true : false
                                        } rounded="rounded-xl" w={ 'w-full' } />
                                    </View>
                                </View>
                            ) }
                        </Formik>
                    </View >
                </View>
            </ScrollView>
        </Mainlayouts >
    )
}

export default PersonalMessages