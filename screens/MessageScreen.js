import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const MessageScreen = () => {
    return (
        <SafeAreaView className="pt-12 flex-1 bg-white">
            <Text className="text-2xl font-bold text-[#0292b7] text-center mb-4">Mesajlarım</Text>
            <TouchableOpacity className="mt-3 border-b  border-b-gray-300 py-2 flex-row">
                <Image source={require("../img/user.jpg")} className="w-20 h-20 rounded-full" />
                <View>
                    <Text className="ml-4 text-lg font-bold">Resul Dilek</Text>
                    <Text className="text-gray-400 text-sm ml-4 w-11/12">Resul kullanıcısına ilan hakkında bir soru sor</Text>
                </View>
                <Text className="absolute bottom-0 right-3 text-green-600 text-lg">✓✓</Text>
            </TouchableOpacity>
            <TouchableOpacity className="mt-3 border-b  border-b-gray-300 py-2 flex-row">
                <Image source={require("../img/Icon.png")} className="w-20 h-20 rounded-full" />
                <View>
                    <Text className="ml-4 text-lg font-bold">EV ARKADASIM</Text>
                    <Text className="text-gray-400 text-sm ml-4 w-9/12">EV ARKADASIM kullanıcısına ilan hakkında bir soru sor</Text>
                </View>
                <Text className="absolute bottom-0 right-3 text-green-600 text-lg">✓✓</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default MessageScreen