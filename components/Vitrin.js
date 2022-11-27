import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Currency from 'react-currency-formatter';
import { useNavigation } from '@react-navigation/native';


const Vitrin = () => {
    const navigation = useNavigation();
    return (
        <View className="bg-white m-1.5 p-1 rounded-lg shadow-xl">
            <TouchableOpacity onPress={() => navigation.navigate("Ilan")}>
                <Image source={require("../img/Ev.jpg")} className="w-36 h-36 rounded-lg" />
                <Text className="mt-2 text-base">Resul   - 22</Text>
                <Text className="text-gray-400">İstanbul / Bağcılar</Text>
                <Text className="font-extrabold text-lg mt-1.5"><Currency quantity={1750} currency="TRY" pattern='### !' /></Text>
            </TouchableOpacity>
        </View>
    )
}

export default Vitrin