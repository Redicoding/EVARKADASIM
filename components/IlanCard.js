import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Currency from 'react-currency-formatter';
import { useNavigation } from '@react-navigation/native';

const IlanCard = ({ ilan }) => {
    const navigation = useNavigation();
    return (
        <View className="bg-white mx-3 mb-5 p-1 rounded-lg shadow-xl">
            <TouchableOpacity onPress={() => navigation.navigate("Ilan", { ilan: ilan })}>
                <View>
                    <Image source={{ uri: ilan.img1 }} className="w-[360] h-60 rounded-lg" />
                    <Image source={{ uri: ilan.userImage }} className="w-20 h-20 rounded-full absolute bottom-0" />
                    <View className="flex-row">
                        <View className="ml-24 flex-1">
                            <Text className="text-base font-bold">{ilan.userName}, {ilan.userAge}</Text>
                            <Text className="text-gray-400 text-xs">{ilan.userGender}</Text>
                        </View>
                        <Text className="font-extrabold text-lg mt-1.5"><Currency quantity={parseInt(ilan.price)} currency="TRY" pattern='### !' /></Text>
                    </View>
                </View>
                <Text className="m-2">{ilan.about}</Text>
                <Text className="text-gray-500 ml-2">{ilan.city} / {ilan.town}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default IlanCard