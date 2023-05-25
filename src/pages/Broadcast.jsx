import { View, Text, TextInput, Linking } from 'react-native'
import React, { useState } from 'react'
import Mainlayouts from '../layouts/Mainlayouts'
import Button from '../components/global/Button'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Broadcast = () =>
{

    const [ messages, setMessages ] = useState( '' )


    const onSubmit = async () =>
    {
        if ( messages == '' )
        {
            alert( 'Please fill the form' )
        } else
        {
            let message = messages
            let number = 'Using Broadcast Messages'
            let getMessages = message.split( '\n' ).join( "" )
            let newhistory = []
            newhistory.push( { number: number, text: getMessages, createdAt: new Date() } )
            let history = await AsyncStorage.getItem( 'history' )
            if ( history )
            {
                newhistory = [ ...JSON.parse( history ) ]
                newhistory.splice( 0, 0, { number: number, text: getMessages, createdAt: new Date() } )
            }
            AsyncStorage.setItem( 'history', JSON.stringify( newhistory ) )
            // Linking.openURL( `whatsapp://send?&text=${ message }` );
        }
    }

    return (
        <Mainlayouts>
            <View className="pt-10 pb-5 px-5">
                <View className="gap-y-8">
                    <View>
                        <Text className="font-PoppinsSemiBold text-lg">Broadcast</Text>
                        <Text className="font-Poppins">Using Broadcast Messages you can send message Bulk Number.</Text>
                    </View>
                    <View>
                        <TextInput placeholder="Messages" multiline={
                            true
                        }
                            value={ messages }
                            onChangeText={ ( value ) => setMessages( value ) }
                            numberOfLines={
                                4
                            }
                            className="border-2 border-gray-300 w-full p-2 rounded-lg" />
                    </View>
                    <View>
                        <Button title="Send" onPress={ onSubmit } rounded="rounded-xl" w={ 'w-full' } />
                    </View>
                </View>
            </View>
        </Mainlayouts>
    )
}

export default Broadcast