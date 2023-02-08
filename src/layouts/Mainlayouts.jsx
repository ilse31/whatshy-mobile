import { SafeAreaView } from 'react-native'
import React from 'react'

const Mainlayouts = ( {
    children
} ) =>
{
    return (
        <SafeAreaView className='flex-1 bg-white dark:bg-slate-800 container'>
            {
                children
            }
        </SafeAreaView>
    )
}

export default Mainlayouts