import { View, Text, TouchableOpacity, SafeAreaView, Image, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'

import Ionicons from "react-native-vector-icons/Ionicons"
import Profileinfo from '../components/Profileinfo'

import { firebase } from "../firebaseconfig"
import { useNavigation } from '@react-navigation/native'

const ProfileScreen = () => {
    const navigation = useNavigation();
    const [user, setUser] = useState("");

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
    }, [user])


    return (
        <SafeAreaView className="pt-12 flex-1 bg-white">
            <ScrollView>
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
                    </View>
                    <Ionicons name='arrow-forward-circle-outline' size={30} style={{ marginRight: 7 }} />
                </TouchableOpacity>
                {/* İlan Ver */}
                <View className="mt-4">
                    <Profileinfo name="Ev İlanlarım !" icon='duplicate-sharp' />
                </View>

                {/* Other */}
                <View className="mt-12">
                    <Profileinfo name="Hakkımızda" icon='information-circle-outline' />
                    <Profileinfo name="İletişim" icon='call-outline' />
                    <Profileinfo name="Gizlilik Politikası" icon='document-text-outline' />
                    <Profileinfo name="Kullanım Koşulları" icon='book-outline' />
                    <Profileinfo name="Sıkça Sorulan Sorular" icon='help-outline' />
                    <Profileinfo name="Hesabı Sil" icon='trash-outline' />
                    {/* Sign Out */}
                    <TouchableOpacity
                        className="flex-row items-center space-x-3 border-b border-gray-300 p-4"
                        onPress={() => firebase.auth().signOut()}
                    >
                        <Ionicons name="exit-outline" size={30} />
                        <Text className="text-lg flex-1">Çıkış Yap</Text>
                        <Ionicons name='chevron-forward-outline' size={22} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ProfileScreen