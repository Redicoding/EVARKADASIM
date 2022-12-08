import { View, Text, TouchableOpacity, SafeAreaView, Image } from 'react-native'
import React from 'react'

import Ionicons from "react-native-vector-icons/Ionicons"
import Profileinfo from '../components/Profileinfo'

const ProfileScreen = () => {
    return (
        <SafeAreaView className="pt-12 bg-white">
            <Text className="text-2xl font-bold text-[#0292b7] text-center mb-4">Profilim</Text>

            {/* Profile Tab */}
            <TouchableOpacity className="p-2 py-3 flex-row items-center space-x-2 bg-slate-100 rounded-2xl">
                <Image source={require("../img/user.jpg")} className="w-20 h-20 rounded-full" />
                <View className="flex-1">
                    <Text className="font-bold text-base">Resul Dilek</Text>
                    <Text className="text-[#0292b7] ">Profilimi Göster</Text>
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
                <Profileinfo name="Çıkış Yap" icon='exit-outline' />
            </View>
        </SafeAreaView>
    )
}

export default ProfileScreen