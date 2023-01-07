import { View, Text, TouchableOpacity, SafeAreaView, Image, ScrollView, RefreshControl, Alert, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react'

import Ionicons from "react-native-vector-icons/Ionicons"
import Profileinfo from '../components/Profileinfo'

import { firebase } from "../firebaseconfig"
import { useNavigation } from '@react-navigation/native'

const ProfileScreen = () => {
    const navigation = useNavigation();
    const [user, setUser] = useState("");
    const [refresh, setRefresh] = useState(false)

    const verify = firebase.auth().currentUser.emailVerified;
    let text;
    let verifiedColor;
    if (verify === true) {
        text = "✓ Onaylı email"
        verifiedColor = "text-green-500"
    } else {
        text = "✕ Email Onaylanmadı"
        verifiedColor = "text-red-500"
    }

    const pullMe = () => {
        setRefresh(true)
        setTimeout(() => {
            setRefresh(false)
        }, 1000)
    }

    const about = "Bu Uygulama Resul Dilek tarafından 2022 yılında yapılmıştır."

    // firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid)
    useEffect(() => {
        firebase.firestore().collection("users")
            .doc(firebase.auth().currentUser.uid).get()
            .then((snapshot) => {
                if (snapshot.exists) {
                    setUser(snapshot.data())
                } else {
                    console.log("Böyle bir kullanıcı yok")
                }
            })
        console.log("ProfileScreen useEffect çalıştı.")

    }, [refresh])


    return (
        <SafeAreaView className="pt-12 flex-1 bg-white">
            <ScrollView refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => pullMe()} />} className="mb-12">
                <Text className="text-2xl font-bold text-[#0292b7] text-center mb-4">Profilim</Text>
                {/* Profile Tab */}
                <TouchableOpacity
                    className="p-2 py-3 flex-row items-center space-x-2 bg-slate-100 rounded-2xl"
                    onPress={() => navigation.navigate("ProfileUpdate", { user: user })}
                >
                    <Image source={{ uri: user.image }} className="w-20 h-20 rounded-full" />
                    <View className="flex-1">
                        <Text className="font-bold text-base">{user.name} {user.surname}</Text>
                        <Text className="text-[#0292b7] ">Profilimi Güncelle</Text>
                        <Text className={verifiedColor}>{text}</Text>
                    </View>
                    <Ionicons name='arrow-forward-circle-outline' size={30} style={{ marginRight: 7 }} />
                </TouchableOpacity>
                {/* İlan Ver */}
                <View className="mt-4">
                    <TouchableOpacity
                        className="flex-row items-center space-x-3 border-b border-gray-300 p-4"
                        onPress={() => navigation.navigate("UserIlan")}
                    >
                        <Ionicons name="duplicate-sharp" size={30} color="gold" />
                        <Text className="text-lg flex-1">Ev İlanlarım !</Text>
                        <Ionicons name='chevron-forward-outline' size={22} color="gold" />
                    </TouchableOpacity>
                </View>

                {/* Other */}
                <View className="mt-12">
                    <Profileinfo name="Hakkımızda" icon='information-circle-outline' about={about} />
                    <Profileinfo name="İletişim" icon='call-outline' />
                    <Profileinfo name="Gizlilik Politikası" icon='document-text-outline' />
                    <Profileinfo name="Kullanım Koşulları" icon='book-outline' />
                    <Profileinfo name="Sıkça Sorulan Sorular" icon='help-outline' />
                    {/* User Delete */}
                    {/* <TouchableOpacity
                        className="flex-row items-center space-x-3 border-b border-gray-300 p-4"
                        onPress={() => {
                            Alert.alert("Bu işlem geri alınamaz.", "Hesabınızı silmek istediğinize emin misiniz?", [{ text: "Hesabı Sil" }, { text: "Vazgeç" }])
                        }}
                    >
                        <Ionicons name="trash-outline" size={30} />
                        <Text className="text-lg flex-1">Hesabımı Sil</Text>
                        <Ionicons name='chevron-forward-outline' size={22} />
                    </TouchableOpacity> */}
                    {/* Sign Out */}
                    <TouchableOpacity
                        className="flex-row items-center space-x-3 border-b border-gray-300 p-4"
                        onPress={() => { Alert.alert("Çıkış Yap !", "Çıkış yapmak istediğinize emin misiniz?", [{ text: "Çıkış Yap", onPress: () => firebase.auth().signOut() }, { text: "Vazgeç" }]) }}
                    >
                        <Ionicons name="exit-outline" size={30} color="red" />
                        <Text className="text-lg flex-1">Çıkış Yap</Text>
                        <Ionicons name='chevron-forward-outline' size={22} color="red" />
                    </TouchableOpacity>
                </View>
                <Image source={require("../img/Icon.png")} className="w-32 h-32 self-center my-5" />
            </ScrollView>
        </SafeAreaView>
    )
}

export default ProfileScreen