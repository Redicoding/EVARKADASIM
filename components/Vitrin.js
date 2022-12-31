import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Currency from 'react-currency-formatter';
import { useNavigation } from '@react-navigation/native';
import Ionicons from "react-native-vector-icons/Ionicons"


const Vitrin = ({ ilan }) => {
    const navigation = useNavigation();
    return (
        <View className="bg-white m-1.5 p-1 rounded-lg shadow-xl">
            <TouchableOpacity onPress={() => navigation.navigate("Ilan", { ilan: ilan })}>
                <View className="absolute top-0 right-0 z-10">
                    <Ionicons name='star-sharp' size={20} color="gold" />
                </View>
                <Image source={{ uri: ilan.img1 }} className="w-36 h-36 rounded-lg" />
                <Text className="mt-2 text-base">{ilan.userName}  - {ilan.userAge}</Text>
                <Text className="text-gray-400">{ilan.city} / {ilan.town}</Text>
                <Text className="font-extrabold text-lg mt-1.5"><Currency quantity={parseInt(ilan.price)} currency="TRY" pattern='### !' /></Text>
            </TouchableOpacity>
        </View>
    )
}

export default Vitrin