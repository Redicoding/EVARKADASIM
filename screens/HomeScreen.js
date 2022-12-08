import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'

import AntDesign from "react-native-vector-icons/AntDesign"
import Vitrin from '../components/Vitrin'
import IlanCard from '../components/IlanCard'
import { useNavigation } from '@react-navigation/native'

const HomeScreen = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView className="pt-10 bg-white">
            {/* TabBar */}
            <View className="flex-row items-center mb-2 space-x-2">
                <Image
                    source={require("../img/Icon.png")}
                    className="w-14 h-14 ml-3"
                />
                <Text className="font-extrabold text-fuchsia-700">EV ARKADAŞIM</Text>
            </View>
            {/* Konum Seçme Ekranı Açılır */}
            <TouchableOpacity
                onPress={() => navigation.navigate("Location")}
                className="bg-gray-200 p-4 ml-3 mr-5 mb-3 rounded-2xl flex-row space-x-2"
            >
                <AntDesign name='enviromento' size={20} />
                <Text>Herhangi bir konum</Text>
            </TouchableOpacity>

            {/* Ana Sayfa veri geldiğinde flatlist kullan vitrin - ilan */}

            <ScrollView className="bg-gray-100 mb-32">
                {/* Vitrin - Flatlist*/}
                <Text className="font-bold text-xl mt-4 ml-3 mb-2">Vitrin Ev İlanları</Text>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className="ml-2"
                >
                    <Vitrin />
                    <Vitrin />
                    <Vitrin />
                    <Vitrin />
                </ScrollView>

                {/* Ev İlanları - FlatList*/}
                <Text className="font-bold text-xl mt-4 ml-3 mb-2">Ev İlanları</Text>
                <IlanCard />
                <IlanCard />
                <IlanCard />

            </ScrollView>

        </SafeAreaView>
    )
}

export default HomeScreen