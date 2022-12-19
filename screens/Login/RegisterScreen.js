import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';
import { firebase } from "../../firebaseconfig";

import { Picker } from '@react-native-picker/picker';

const RegisterScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [age, setAge] = useState(18);
    const [gender, setGender] = useState("Erkek");

    const [passwordcontrol, setPasswordcontrol] = useState('');
    const [emailcontrol, setEmailcontrol] = useState('');

    const navigation = useNavigation();

    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const registerUser = async (email, password, name, surname, age, gender, passwordcontrol, emailcontrol) => {

        if (email.match(mailFormat) != null && password.length >= 6 && name.length >= 2 && surname.length >= 2 && password === passwordcontrol && email === emailcontrol) {

            await firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(() => {
                    firebase.auth().currentUser.sendEmailVerification({
                        handleCodeInApp: true,
                        url: "https://ev-arkadasim-e0c75.firebaseapp.com",
                    })
                        .then(() => {
                            alert("Kayıt Başarılı. Lütfen mailinizi kontrol ediniz.")
                        }).catch((error) => {
                            alert(error.message)
                        })
                        .then(() => {
                            firebase.firestore().collection("users")
                                .doc(firebase.auth().currentUser.uid)
                                .set({
                                    email,
                                    name,
                                    surname,
                                    age,
                                    gender,
                                })
                        })
                        .catch((error) => {
                            alert(error.message)
                        })

                })
                .catch((error) => {
                    alert(error.message)
                })
        } else {
            alert("Lütfen bilgilerinizi kontrol ediniz.")
        }
    }

    // Yaş Sıralaması
    var yas = [];
    for (let i = 18; i < 100; i++) {
        yas.push(<Picker.Item label={i.toString()} value={i} key={i} />)
    }

    // Password - Mail  Control Color
    const controlPasswordColor = password === passwordcontrol ? "border rounded-full m-2 p-4 text-base border-green-400" : "border rounded-full m-2 p-4 text-base border-red-500"
    const controlMailColor = email === emailcontrol ? "border rounded-full m-2 p-4 text-base border-green-400" : "border rounded-full m-2 p-4 text-base border-red-500"


    return (
        <SafeAreaView>
            <Text className="text-[#0292b7] text-2xl font-bold text-center">Aramıza Katıl !</Text>
            <View className="mt-4">

                {/* Name - Surname */}
                <View className="flex-row space-x-40">
                    <Text className=" ml-7 font-bold">Ad</Text>
                    <Text className="font-bold">Soyad</Text>
                </View>
                <View className="flex-row">
                    <TextInput
                        placeholder='Ad'
                        onChangeText={(name) => setName(name)}
                        autoCorrect={false}
                        className="border rounded-full m-2 border-gray-300 p-4 text-base w-5/12"
                    />
                    <TextInput
                        placeholder='Soyad'
                        onChangeText={(surname) => setSurname(surname)}
                        autoCorrect={false}
                        className="border rounded-full m-2 border-gray-300 p-4 text-base w-6/12"
                    />
                </View>

                {/* Picker */}
                <View className="flex-row space-x-40">
                    <Text className=" ml-7 font-bold">Yaş</Text>
                    <Text className="font-bold">Cinsiyet</Text>
                </View>
                <View className="flex-row">
                    <View className="border rounded-full m-2 border-gray-300 p-2 text-base w-5/12">
                        <Picker
                            selectedValue={age}
                            onValueChange={(itemValue, itemIndex) =>
                                setAge(itemValue)
                            }>
                            {yas}
                        </Picker>
                    </View>
                    <View className="border rounded-full m-2 border-gray-300 p-2 text-base w-6/12">
                        <Picker
                            selectedValue={gender}
                            onValueChange={(itemValue, itemIndex) =>
                                setGender(itemValue)
                            }>
                            <Picker.Item label="Erkek" value="Erkek" />
                            <Picker.Item label="Kadın" value="Kadın" />
                        </Picker>
                    </View>
                </View>

                {/* Email */}
                <Text className=" ml-5 font-bold">Email Adresi</Text>
                <TextInput
                    placeholder='Email Adresi'
                    onChangeText={(email) => setEmail(email)}
                    autoCorrect={false}
                    className="border rounded-full m-2 border-gray-300 p-4 text-base"
                    keyboardType='email-address'
                />
                <Text className=" ml-5 font-bold">Email Tekrar</Text>
                <TextInput
                    placeholder='Email Adresi'
                    onChangeText={(emailcontrol) => setEmailcontrol(emailcontrol)}
                    autoCorrect={false}
                    className={controlMailColor}
                    keyboardType='email-address'
                />
                {/* Password */}
                <Text className=" ml-5 font-bold">Şifre</Text>
                <TextInput
                    placeholder='Şifre'
                    onChangeText={(password) => setPassword(password)}
                    autoCorrect={false}
                    secureTextEntry={true}
                    className="border rounded-full m-2 border-gray-300 p-4 text-base"
                />
                <Text className=" ml-5 font-bold">Şifre Tekrar</Text>
                <TextInput
                    placeholder='Şifre'
                    onChangeText={(passwordcontrol) => setPasswordcontrol(passwordcontrol)}
                    autoCorrect={false}
                    secureTextEntry={true}
                    className={controlPasswordColor}
                />
            </View>

            {/* REGISTER BUTTON */}
            <View className="items-center">
                <TouchableOpacity
                    onPress={() => registerUser(email, password, name, surname, age, gender, passwordcontrol, emailcontrol)}
                    className="bg-[#0292b7] rounded-xl w-11/12 h-16 mt-4 items-center justify-center"
                >
                    <Text className="font-bold text-xl text-white">Kayıt Ol</Text>
                </TouchableOpacity>
                <View className="flex-row mt-6 items-center">
                    <Text>Zaten bir hesabınız var mı ?</Text>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        className=" p-3"
                    >
                        <Text className="text-[#0292b7]">Giriş Yap !</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default RegisterScreen