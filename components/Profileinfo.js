import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

import Ionicons from "react-native-vector-icons/Ionicons"

import { useNavigation } from '@react-navigation/native';

const Profileinfo = ({ name, icon, about }) => {
    const navigation = useNavigation();
    return (
        <View>
            <TouchableOpacity
                className="flex-row items-center space-x-3 border-b border-gray-300 p-4"
                onPress={() => navigation.navigate("About", { name: name, icon: icon, about: about })}
            >
                <Ionicons name={icon} size={30} />
                <Text className="text-lg flex-1">{name}</Text>
                <Ionicons name='chevron-forward-outline' size={22} />
            </TouchableOpacity>
        </View>
    )
}

export default Profileinfo