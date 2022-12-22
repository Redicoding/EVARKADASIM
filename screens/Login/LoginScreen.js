import { View, Text, SafeAreaView, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { firebase } from "../../firebaseconfig"

const LoginScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = async () => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password)
        } catch (error) {
            alert("Hatalı Kullanıcı Adı veya Şifre")
        }
    }
    return (
        <SafeAreaView className="bg-white flex-1">
            <ScrollView>
                <View className="items-center mt-14">
                    <Image
                        source={require("../../img/Icon.png")}
                        className="w-64 h-64"
                    />
                    <Text className="font-extrabold text-4xl mt-5 text-[#0292b7]">EV ARKADAŞIM</Text>
                </View>

                <View className="mt-16">
                    {/* Email */}
                    <TextInput
                        placeholder='Email Adresi'
                        onChangeText={(email) => setEmail(email)}
                        autoCorrect={false}
                        autoCapitalize='none'
                        className="border rounded-full m-2 border-gray-300 p-4 text-base"
                        keyboardType='email-address'
                    />
                    {/* Password */}
                    <TextInput
                        placeholder='Şifre'
                        onChangeText={(password) => setPassword(password)}
                        autoCorrect={false}
                        autoCapitalize='none'
                        secureTextEntry={true}
                        className="border rounded-full m-2 border-gray-300 p-4 text-base"
                    />

                    <View className="items-center">
                        {/* Button */}
                        <TouchableOpacity
                            onPress={() => loginUser(email, password)}
                            className="bg-[#0292b7] rounded-xl w-11/12 h-16 mt-4 items-center justify-center"
                        >
                            <Text className="font-bold text-xl text-white">Giriş Yap</Text>
                        </TouchableOpacity>
                        {/* Register */}
                        <View className="flex-row mt-6 items-center">
                            <Text>Henüz hesabınız  yok mu ?</Text>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("Register")}
                                className=" p-3"
                            >
                                <Text className="text-[#0292b7]">Kayıt Ol !</Text>
                            </TouchableOpacity>
                        </View>
                        {/* Forget Password */}
                        <View className="flex-row mt-6 items-center">
                            <Text>Parolanızı mı unuttunuz ?</Text>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("ForgetPassword")}
                                className=" p-3"
                            >
                                <Text className="text-[#0292b7]">Şifremi Unuttum !</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default LoginScreen