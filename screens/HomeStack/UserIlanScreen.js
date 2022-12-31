import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { firebase } from "../../firebaseconfig";
import IlanCard from '../../components/IlanCard';
const UserIlanScreen = () => {
    const [ilanlar, setIlanlar] = useState()

    useEffect(() => {
        firebase.firestore().collection("ilanlar").where("email", "==", firebase.auth().currentUser.email).get()
            .then((snapshot) => {
                const list = []
                snapshot.forEach((doc) => {
                    const data = doc.data()
                    list.push(data)
                })
                setIlanlar(list)
            })
        console.log("UserIlan useEffect çalıştı.")
    }, [])
    return (
        <SafeAreaView className="flex-1 pt-12">
            <ScrollView>
                <Text className="text-2xl font-bold text-[#0292b7] text-center mb-4">İlanlarım</Text>
                {ilanlar != undefined ? ilanlar.map((ilan, index) => (
                    <IlanCard ilan={ilan} key={index} />
                )) : <Text className="text-center">Yükleniyor...</Text>}
            </ScrollView>
        </SafeAreaView>
    )
}

export default UserIlanScreen