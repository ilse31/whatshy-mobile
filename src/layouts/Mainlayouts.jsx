import { SafeAreaView } from 'react-native'
import React from 'react'

const Mainlayouts = ( {
    children
} ) =>
{
    return (
        <SafeAreaView className='flex-1 dark:bg-slate-800 bg-white container'>
            {
                children
            }
        </SafeAreaView>
    )
}

export default Mainlayouts