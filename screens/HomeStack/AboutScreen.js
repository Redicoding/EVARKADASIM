import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import Ionicons from "react-native-vector-icons/Ionicons"

const AboutScreen = ({ route }) => {
    return (
        <SafeAreaView className="flex-1 pt-12">
            <View className=" items-center justify-center">
                <Ionicons name={route.params.icon} size={30} />
                <Text className="text-xl border-b font-bold">{route.params.name}</Text>
            </View>
            <Text className="text-center w-full absolute bottom-2">{route.params?.about}</Text>

        </SafeAreaView>
    )
}

export default AboutScreen