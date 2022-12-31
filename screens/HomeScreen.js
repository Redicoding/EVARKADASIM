import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView, FlatList, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'

import AntDesign from "react-native-vector-icons/AntDesign"
import Vitrin from '../components/Vitrin'
import IlanCard from '../components/IlanCard'
import { useNavigation } from '@react-navigation/native'

import { firebase } from "../firebaseconfig"

const HomeScreen = () => {
    const navigation = useNavigation();
    const [ilanlar, setIlanlar] = useState();
    const [onecikanlar, setOnecikanlar] = useState();
    const [refresh, setRefresh] = useState(false);
    // const verify = firebase.auth().currentUser.emailVerified;
    // if (verify === false) {
    //     alert("Lütfen mailinizi doğrulayınız.")
    //     firebase.auth().signOut()
    // }
    const pullMe = () => {
        setRefresh(true)
        setTimeout(() => {
            setRefresh(false)
        }, 1000)
    }
    useEffect(() => {
        firebase.firestore().collection("ilanlar").get()
            .then((snapshot) => {
                const list = []
                snapshot.forEach((doc) => {
                    const data = doc.data()
                    list.push(data)
                })
                setIlanlar(list)
            })
        firebase.firestore().collection("ilanlar").orderBy("price").limit(5).get()
            .then((snapshot) => {
                const list2 = []
                snapshot.forEach((doc) => {
                    const data2 = doc.data()
                    list2.push(data2)
                })
                setOnecikanlar(list2)
            })
        console.log("HomeScreen useEffect çalıştı.")
    }, [refresh])
    return (
        <SafeAreaView className="pt-10 bg-white flex-1">
            {/* TabBar */}
            <View className="flex-row items-center mb-2 space-x-2">
                <Image
                    source={require("../img/Icon.png")}
                    className="w-14 h-14 ml-3"
                />
                <Text className="font-extrabold text-base text-[#0292b7]">EV ARKADAŞIM</Text>
            </View>
            {/* Konum Seçme Ekranı Açılır */}
            <TouchableOpacity
                onPress={() => navigation.navigate("Search")}
                className="bg-gray-200 p-4 ml-3 mr-5 mb-3 rounded-2xl flex-row space-x-2"
            >
                <AntDesign name='enviromento' size={20} />
                <Text>Herhangi bir konum</Text>
            </TouchableOpacity>

            {/* vitrin - ilan */}

            <ScrollView className="bg-gray-100 mb-10" refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => pullMe()} />}>
                {/* Vitrin */}
                <Text className="font-bold text-xl mt-4 ml-3 mb-2">Öne Çıkan İlanlar</Text>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className="ml-2"
                >
                    {onecikanlar != undefined ? onecikanlar.map((ilan, index) => (
                        <Vitrin ilan={ilan} key={index} />
                    )) : <Text className="text-center">Yükleniyor...</Text>}
                </ScrollView>

                {/* Ev İlanları */}
                <Text className="font-bold text-xl mt-4 ml-3 mb-2">Ev İlanları</Text>
                {ilanlar != undefined ? ilanlar.map((ilan, index) => (
                    <IlanCard ilan={ilan} key={index} />
                )) : <Text className="text-center">Yükleniyor...</Text>}
                {/* {ilanlar != undefined ? <FlatList
                    data={ilanlar}
                    className="ml-2"
                    renderItem={({ item }) => (
                        <IlanCard ilan={item} />
                    )}
                /> : <Text>Yükleniyor...</Text>} */}

            </ScrollView>

        </SafeAreaView>
    )
}

export default HomeScreen