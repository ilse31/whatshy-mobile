import { View, Text, ScrollView, TextInput, TouchableOpacity, FlatList, Linking } from 'react-native'
import React, { useState, useCallback, useRef, useMemo } from 'react'
import Mainlayouts from '../layouts/Mainlayouts'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import * as Yup from 'yup';
import { useAddPhonebookMutation, useDeletePhonebookMutation, useGetPhonebookQuery } from '../services/api';
import
{
    BottomSheetModal,
    BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { Formik } from 'formik';
const Contact = () =>
{
    let addContactval = {
        number: '',
        name: ''
    }

    const phoneRegExp = /^(\+62|62)8[1-9][0-9]{6,9}$/;


    const validationContact = Yup.object().shape( {
        number: Yup.string()
            .required( "Phone Number Required" )
            .max( 15 )
            .min( 13 )
            .matches( phoneRegExp, "Phone number is not valid, using 62 or +62" ),
        name: Yup.string().required( "Please Enter your Name" ),
    } );


    const bottomSheetRef = useRef( BottomSheetModal );
    const bottonSheetContact = useRef( BottomSheetModal );
    const snapPoints = useMemo( () => [ "20%", "90%" ], [] );
    const handlePresentModalPress = useCallback( () =>
    {
        bottomSheetRef.current.present();
    }, [] );

    const handlePresentModalContact = useCallback( () =>
    {
        bottonSheetContact.current.present();
    }, [] );

    const [ showDropdown, setshowDropdown ] = useState( false )
    const [ user, setUser ] = useState( {} )
    const [ searchValue, setsearchValue ] = useState( '' )
    const [ chatTemplate, setchatTemplate ] = useState( 'Hi Halo' )


    const [ deleteContact ] = useDeletePhonebookMutation()
    const { data, refetch } = useGetPhonebookQuery( {
        id: user.id,
    } )
    const [ addcontact ] = useAddPhonebookMutation()

    const getAsyncStorage = async () =>
    {
        try
        {
            const users = await AsyncStorage.getItem( 'users' )
            setUser( JSON.parse( users ) )
        } catch ( error )
        {
            console.log( error );
        }
    }

    const handleAddcontact = ( values ) =>
    {
        addContactval = {
            number: btoa( values.number ),
            name: btoa( values.name ),
            user_id: user.id
        }
        console.log( addContactval );
        alert( 'Add Contact Success' )
        addcontact( addContactval )
        refetch()
    }

    const handleDelete = ( e, id ) =>
    {
        deleteContact( { id: id } )
        e.preventDefault();
        refetch()
        alert( 'Delete Success' )
    }
    const handleSend = async ( e, number ) =>
    {
        if ( !chatTemplate )
        {
            alert( 'Please Fill Chat Template' )
            return
        }
        let messages = chatTemplate
        let getMessages = messages.split( '\n' ).join( "" )
        let newhistory = []
        newhistory.push( { number: number, text: getMessages, createdAt: new Date() } )
        let history = await AsyncStorage.getItem( 'history' )
        if ( history )
        {
            newhistory = [ ...JSON.parse( history ) ]
            newhistory.splice( 0, 0, { number: number, text: getMessages, createdAt: new Date() } )
        }
        AsyncStorage.setItem( 'history', JSON.stringify( newhistory ) )
        Linking.openURL( `whatsapp://send?text=${ getMessages }&phone=${ number }` )
        e.preventDefault();
    }


    useEffect( () =>
    {
        getAsyncStorage()
    }, [] )


    return (
        <Mainlayouts>
            <BottomSheetModalProvider>
                <ScrollView className='flex-1 bg-white'>
                    <View className="pt-10 pb-5 px-5">
                        {/* search icon */ }
                        <View className="border-2 border-gray-300 rounded-lg p-2 flex-row w-full">
                            <AntDesign name="search1" size={ 24 } color="black" />
                            <TextInput
                                placeholder='Search'
                                value={ searchValue }
                                onChangeText={ ( value ) => setsearchValue( value ) }
                                className='ml-3 w-full'
                            />
                        </View>
                    </View>


                    <BottomSheetModal
                        ref={ bottomSheetRef }
                        index={ 1 }
                        enablePanDownToClose={ true }
                        snapPoints={ snapPoints }
                    >
                        <View className="flex-col p-5">
                            <Text className="text-xl font-bold">Set Template Chat</Text>
                            <TextInput
                                placeholder='Type your message'
                                value={ chatTemplate }
                                onChangeText={ ( value ) => setchatTemplate( value ) }
                                className='border-2 border-gray-300 rounded-lg p-2 mt-5 w-full'
                                multiline={ true }
                                numberOfLines={ 5 }
                            />
                            <TouchableOpacity onPress={ handlePresentModalPress }>
                                <Text className="text-blue-400 mt-5">Save</Text>
                            </TouchableOpacity>
                        </View>
                    </BottomSheetModal>


                    <BottomSheetModal
                        ref={ bottonSheetContact }
                        index={ 1 }
                        enablePanDownToClose={ true }
                        snapPoints={ snapPoints }
                    >
                        <View className="flex-col p-5">
                            <Text className="text-xl font-bold">Add New Contact</Text>
                            <Formik
                                initialValues={ {
                                    number: '',
                                    name: ''
                                } }
                                validationSchema={ validationContact }
                                onSubmit={ ( values ) => handleAddcontact( values ) }
                            >
                                { ( { handleChange, handleBlur, handleSubmit, values, errors, touched } ) => (
                                    <View className="flex-col mt-5">
                                        <Text className="text-gray-400">Phone Number</Text>
                                        <TextInput
                                            placeholder='Phone Number'
                                            value={ values.number }
                                            keyboardType='number-pad'
                                            onChangeText={ handleChange( 'number' ) }
                                            onBlur={ handleBlur( 'number' ) }
                                            className='border-2 border-gray-300 rounded-lg p-2 mt-2 w-full'
                                        />
                                        { errors.number && touched.number && (
                                            <Text className="text-red-500">{ errors.number }</Text>
                                        ) }
                                        <Text className="text-gray-400 mt-5">Name</Text>
                                        <TextInput
                                            placeholder='Name'
                                            value={ values.name }
                                            onChangeText={ handleChange( 'name' ) }
                                            onBlur={ handleBlur( 'name' ) }
                                            className='border-2 border-gray-300 rounded-lg p-2 mt-2 w-full'
                                        />
                                        { errors.name && touched.name && (
                                            <Text className="text-red-500">{ errors.name }</Text>
                                        ) }
                                        <TouchableOpacity onPress={ handleSubmit }>
                                            <Text className="text-blue-400 mt-5">Save</Text>
                                        </TouchableOpacity>
                                    </View>
                                ) }
                            </Formik>
                        </View>
                    </BottomSheetModal>



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
                                <View className="absolute bg-white rounded-lg shadow-lg top-5 z-30 right-0 border">
                                    <View className="flex-col gap-3 p-3">
                                        <TouchableOpacity onPressIn={
                                            handlePresentModalPress
                                        }>
                                            <Text className="text-gray-400">Set Template Chat</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPressIn={
                                            handlePresentModalContact
                                        }>
                                            <Text className="text-gray-400">New Contact</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            }



                        </View>
                    </View>
                    <ScrollView className="flex-1">
                        {
                            data?.users_by_pk.contactlist.filter( ( name ) =>
                            {
                                let dataEncode = atob( name.name )
                                return dataEncode.toLowerCase().includes( searchValue.toLowerCase() )
                            } ).map( ( item, index ) =>
                            {
                                return (
                                    <View className="flex-row flex-1 items-center justify-between px-5 py-3 border-b border-gray-300" key={ index }>
                                        <View className="flex-row items-center">
                                            <MaterialCommunityIcons name="account-circle" size={ 24 } color="black" />
                                            <View className="flex-col ml-3">
                                                <Text className="font-bold">{ atob( item.name ) }</Text>
                                                <Text className="text-gray-400">{ atob( item.number ) }</Text>
                                            </View>
                                        </View>
                                        <View className="flex-row items-center">
                                            <TouchableOpacity className="relative z-20" onPressIn={
                                                ( e ) => handleSend( e, atob( item.number ) )
                                            }>
                                                <Text className="text-blue-400 -z-50">Send</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPressIn={
                                                ( e ) => handleDelete( e, item.id )
                                            }>
                                                <Text className="text-blue-400 ml-3 -z-20">Delete</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity>
                                                <Text className="text-blue-400 ml-3 -z-10">Edit</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )
                            } )
                        }
                    </ScrollView>
                </ScrollView>
            </BottomSheetModalProvider>
        </Mainlayouts >
    )
}

export default Contact