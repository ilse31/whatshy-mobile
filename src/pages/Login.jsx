
import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Image, ScrollView, Text, TextInput, View } from 'react-native'
import svg from '../../assets/svg'
import Button from '../components/global/Button'
import Mainlayouts from '../layouts/Mainlayouts'
import { LoginValidation } from '../components/global/Validations'
import { LoginValue } from '../components/global/InitValue'
import { Ionicons } from '@expo/vector-icons';
import { useUserLoginMutation } from '../services/api'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ( { navigation } ) =>
{
    const [ loginPass, setLoginPass ] = useState( true )
    const [ isLoading, setisLoading ] = useState( false )
    // const navigation = useNavigation();
    const [ login ] = useUserLoginMutation()

    const AsyncStorages = async () =>
    {
        await AsyncStorage.setItem( 'firstlaunched', "false" )
    }

    const handleLogin = ( values, { resetForm } ) =>
    {
        setisLoading( true )
        login( values ).unwrap().then( ( res ) =>
        {
            if ( res.users.length === 1 )
            {
                console.log( res );
                alert( 'Login Success' )
                navigation.navigate( 'main' )
                setisLoading( false )
                AsyncStorage.setItem( "users", JSON.stringify( res.users[ 0 ] ) )
                resetForm()
            }
        } ).catch( ( err ) =>
        {
            console.log( err.data.error );
            alert( 'Login Failed' )
        } )
    }


    useEffect( () =>
    {
        AsyncStorages()
    }, [] )


    return (
        <Mainlayouts>
            <ScrollView className="flex-1 bg-white">
                <View className='items-center justify-start flex-1 bg-white gap-x-10 p-10'>
                    <View className="items-center justify-center">
                        <Image
                            className="w-40 h-40 border shadow shadow-lg"
                            source={
                                svg.Logo
                            }
                        />
                        <Text className="font-PoppinsBold text-2xl">Whashy</Text>
                    </View>
                    <View className="items-center">
                        <Text className="font-Poppins text-base">Login to your account !</Text>
                        <Text className="font-Poppins text-center">Enter the information while you Registering</Text>
                    </View>
                    <Formik className="w-full" initialValues={ LoginValue }
                        validationSchema={ LoginValidation }
                        onSubmit={ handleLogin }
                    >
                        {
                            ( { handleChange, handleBlur, handleSubmit, values, errors, touched } ) => (
                                <View className="w-full gap-y-5 ml-10 mt-3">
                                    <View>
                                        <Text className="font-Poppins px-3">Email</Text>
                                        <TextInput value={ values.email } onChangeText={ handleChange( 'email' ) } onBlur={ handleBlur( 'email' ) } className="border w-full text-md rounded-full px-5 py-3" placeholder='Insert your Email' />
                                        { errors.email && touched.email ? (
                                            <Text className="text-red-500 px-3">{ errors.email }</Text>
                                        ) : null }
                                    </View>
                                    <View>
                                        <Text className="font-Poppins px-3 text-md">Password</Text>
                                        <View className="border border-gray-500 w-full text-md rounded-full px-5 py-3 justify-between flex-row">
                                            <TextInput secureTextEntry={ loginPass ? true : false } value={ values.password } onChangeText={ handleChange( 'password' ) } onBlur={ handleBlur( 'password' ) } className="" placeholder='Insert your Password' />
                                            {
                                                loginPass ? (
                                                    <Ionicons onPress={ () => setLoginPass( false ) } name="eye-off" size={ 24 } color="black" />
                                                ) : (
                                                    <Ionicons onPress={ () => setLoginPass( true ) } name="eye" size={ 24 } color="black" />
                                                )
                                            }
                                        </View>
                                        { errors.password && touched.password ? (
                                            <Text className="text-red-500 px-3">{ errors.password }</Text>
                                        ) : null }
                                    </View>
                                    <View className="items-center w-full">
                                        <Button onPress={
                                            handleSubmit
                                        } title={ isLoading ? "Loading" : "Continue" } disabled={
                                            errors.email || errors.password ? true : false &&
                                                values.email === '' || values.password === '' ? true : false
                                        } w="full" />
                                    </View>
                                </View>
                            )
                        }
                    </Formik>
                </View>
                <View className="gap-5">
                    <Text className="font-Poppins text-center">Don't have an account ?</Text>
                    <Text className="font-Poppins text-center underline mb-5" onPress={ () => navigation.navigate( "Register" ) }>Register Now</Text>
                </View>
            </ScrollView>
        </Mainlayouts>
    )
}

export default Login