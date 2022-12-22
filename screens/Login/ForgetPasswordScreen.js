import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { firebase } from "../../firebaseconfig";

const ForgetPasswordScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");

    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const changePassword = () => {
        if (email.match(mailFormat) != null) {
            firebase.auth().sendPasswordResetEmail(email)
                .then(() => {
                    alert("Şifre sıfırlama maili gönderildi.")
                    navigation.goBack();
                })
                .catch((error) => {
                    alert("Böyle bir kullanıcı mevcut değil.")
                })
        } else {
            alert("Lütfen geçerli bir mail adresi giriniz.")
        }

    }

    return (
        <SafeAreaView className="flex-1 justify-center">
            <TextInput
                placeholder='Email Adresi'
                onChangeText={(email) => setEmail(email)}
                autoCorrect={false}
                autoCapitalize='none'
                className="border rounded-full m-2 border-gray-300 p-4 text-base"
                keyboardType='email-address'
            />
            <View className="items-center">
                <TouchableOpacity
                    onPress={() => changePassword()}
                    className="bg-[#0292b7] rounded-xl w-8/12 h-14 mt-10 items-center justify-center"
                >
                    <Text className="font-bold text-xl text-white">Sıfırlama Maili Gönder</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

export default ForgetPasswordScreen