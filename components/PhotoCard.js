import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from "react-native-vector-icons/Ionicons"

const PhotoCard = (props) => {

    return (
        <View className=" border border-lime-600 rounded-xl justify-center items-center w-3/12 h-28 m-2">
            <TouchableOpacity onPress={props.onPress}>
                {props.img == null ?
                    <Image source={{ uri: "https://static.thenounproject.com/png/3752804-200.png" }} className="w-12 h-12 opacity-60" /> :
                    <Image source={{ uri: props.img }} className="w-28 h-28" />
                }
            </TouchableOpacity>
        </View>
    )
}

export default PhotoCard