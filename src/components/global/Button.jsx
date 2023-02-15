import { View, Text, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'

const Button = ( {
    onPress,
    title,
    accessibilityLabel,
    disabled,
    w = 52,
    rounded = "rounded-full",
} ) =>
{
    return (
        <TouchableOpacity activeOpacity={ 1 } onPressIn={ onPress } accessibilityLabel={ accessibilityLabel } className={ ` w-${ w } ${ disabled ? "bg-gray-200" : "hover:bg-emerald-700 bg-emerald-500  active:bg-emerald-600" } h-12 ${ rounded } items-center justify-center active:ring active:ring-offset-2` } disabled={ disabled }>
            <Text className=" text-white font-PoppinsSemiBold capitalize">{ title }</Text>
        </TouchableOpacity>
    )
}

export default Button