import { View, Text, ScrollView, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import Mainlayouts from '../layouts/Mainlayouts'
import svg from '../../assets/svg'
import { Formik } from 'formik'
import { RegisterValue } from '../components/global/InitValue'
import { RegisterValidation } from '../components/global/Validations'
import { useUserRegisterMutation } from '../services/api'
import { Ionicons } from '@expo/vector-icons';
import Button from '../components/global/Button'
import { useNavigation } from '@react-navigation/native'
const Register = () =>
{
    const [ register ] = useUserRegisterMutation()
    const [ loginPass, setLoginPass ] = useState( true )
    const navigation = useNavigation()
    const handleLogin = ( values, { resetForm } ) =>
    {
        register( values ).unwrap().then( ( res ) =>
        {
            if ( res.insert_users.affected_rows === 1 )
            {
                console.log( res );
                alert( 'Register Success' )
                navigation.navigate( "Login" )
                resetForm()
            }
        }
        ).catch( ( err ) =>
        {
            console.log( err.data.error );
            alert( err.data.error )
        } )
    }
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
                        <Text className="font-PoppinsBold text-2xl">Whatshy</Text>
                    </View>
                    <View className="items-center">
                        <Text className="font-Poppins text-base">Register to your account !</Text>
                        <Text className="font-Poppins text-center">Enter the information below to continue</Text>
                    </View>
                    <Formik className="w-full" initialValues={ RegisterValue }
                        validationSchema={ RegisterValidation }
                        onSubmit={ handleLogin }
                    >
                        {
                            ( { handleChange, handleBlur, handleSubmit, values, errors, touched } ) => (
                                <View className="w-full gap-y-5 ml-10 mt-3">
                                    <View>
                                        <Text className="font-Poppins px-3">Username</Text>
                                        <TextInput value={ values.username } onChangeText={ handleChange( 'username' ) } onBlur={ handleBlur( 'username' ) } className="border w-full text-md rounded-full px-5 py-3" placeholder='Insert your Email' />
                                        { errors.username && touched.username ? (
                                            <Text className="text-red-500 px-3">{ errors.username }</Text>
                                        ) : null }
                                    </View>
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
                                        } title={ "continue" } disabled={
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
                    <Text className="font-Poppins text-center">Have an account ?</Text>
                    <Text className="font-Poppins text-center underline mb-5" onPress={ () => navigation.navigate( "Login" ) }>Login Now</Text>
                </View>
            </ScrollView>
        </Mainlayouts>
    )
}

export default Register