import { Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'

const AnimateView = ( props ) =>
{
    const fadeAnimate = useRef( new Animated.Value( 0 ) ).current

    useEffect( () =>
    {
        Animated.timing( fadeAnimate, {
            toValue: 1,
            duration: 5000,
            useNativeDriver: true,
        } ).start();
    }, [ fadeAnimate ] )


    return (
        <Animated.View style={ {
            ...props.style,
            opacity: fadeAnimate,
        } }>
            {
                props.children
            }
        </Animated.View>
    )
}

export default AnimateView