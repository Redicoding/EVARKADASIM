import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Currency from 'react-currency-formatter';
import { useNavigation } from '@react-navigation/native';

const IlanCard = () => {
    const navigation = useNavigation();
    return (
        <View className="bg-white mx-3 mb-5 p-1 rounded-lg shadow-xl">
            <TouchableOpacity onPress={() => { navigation.navigate("Ilan") }}>
                <View>
                    <Image source={require("../img/Ev.jpg")} className="w-[360] h-60 rounded-lg" />
                    <Image source={require("../img/user.jpg")} className="w-20 h-20 rounded-full absolute bottom-0" />
                    <View className="flex-row">
                        <View className="ml-24 flex-1">
                            <Text className="text-base font-bold">Resul, 22</Text>
                            <Text className="text-gray-400 text-xs">Erkek</Text>
                        </View>
                        <Text className="font-extrabold text-lg mt-1.5"><Currency quantity={1750} currency="TRY" pattern='### !' /></Text>
                    </View>
                </View>
                <Text className="m-2">AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</Text>
                <Text className="text-gray-500 ml-2">İstanbul / Bağcılar</Text>
            </TouchableOpacity>
        </View>
    )
}

export default IlanCard