import { View, Text, SafeAreaView, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from "react-native-vector-icons/Ionicons"

import { firebase } from "../../firebaseconfig";

const ProfileUpdateScreen = ({ route }) => {
    const navigation = useNavigation();
    const [age, setAge] = useState(route.params.user.age);
    const [gender, setGender] = useState(route.params.user.gender);
    const [name, setName] = useState(route.params.user.name);
    const [surname, setSurname] = useState(route.params.user.surname);
    const [photo, setPhoto] = useState(route.params.user.image);

    const [image, setImage] = useState(null);


    // PickImage
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    }

    async function uploadImage() {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response); // when BlobModule finishes reading, resolve with the blob
            };
            xhr.onerror = function () {
                reject(new TypeError('Network request failed')); // error occurred, rejecting
            };
            xhr.responseType = 'blob'; // use BlobModule's UriHandler
            xhr.open('GET', image, true); // fetch the blob from uri in async mode
            xhr.send(null); // no initial data
        });

        const fileName = image.substring(image.lastIndexOf('/') + 1);
        // do something with the blob, eg. upload it to firebase (API v5.6.0 below)
        const ref = firebase
            .storage()
            .ref()
            .child(fileName);
        try {
            const snapshot = await ref.put(blob);
            await snapshot.ref.getDownloadURL()
                .then((downloadUrl) => {

                    firebase.firestore().collection("users")
                        .doc(firebase.auth().currentUser.uid).update({
                            image: downloadUrl,
                        })
                        .then(() => {
                            firebase.firestore().collection("ilanlar").where("email", "==", firebase.auth().currentUser.email).get()
                                .then((snapshot) => {
                                    snapshot.forEach((doc) => {
                                        doc.ref.update({
                                            userImage: downloadUrl,
                                        })
                                    })
                                })
                        })
                }).catch((error) => {
                    console.log(error);
                })
        } catch (error) {
            console.log(error);
            alert("Fotoğraf yüklemeyi tekrar deneyiniz.")
        }
        setImage(null);

    }



    // UpdateProfile
    const updateProfile = async (age, gender, name, surname) => {
        if (image != null) uploadImage();

        if (name.length >= 2 && surname.length >= 2) {
            await firebase.firestore().collection("users")
                .doc(firebase.auth().currentUser.uid).update({
                    age: age,
                    gender: gender,
                    name: name,
                    surname: surname,
                }).then(() => {
                    firebase.firestore().collection("ilanlar").where("email", "==", firebase.auth().currentUser.email).get()
                        .then((snapshot) => {
                            snapshot.forEach((doc) => {
                                doc.ref.update({
                                    userName: name,
                                    userAge: age,
                                    userGender: gender,
                                })
                            })
                        })
                    alert("Profiliniz Başarıyla Güncellenmiştir.");
                    navigation.goBack();
                })
                .catch((error) => {
                    // The document probably doesn't exist.
                    console.error("Error updating document: ", error);
                });

        } else {
            alert("Lütfen bilgilerinizi kontrol ediniz.")
        }

    }


    // Yaş Sıralaması
    var yas = [];
    for (let i = 18; i < 100; i++) {
        yas.push(<Picker.Item label={i.toString()} value={i} key={i} />)
    }

    return (
        <SafeAreaView className="flex-1 mt-12">
            <ScrollView>
                <View className="items-center">
                    <TouchableOpacity onPress={pickImage} className=" w-52 items-center">
                        {image == null ?
                            <Image source={{ uri: photo }} className="w-40 h-40 rounded-full self-center" /> :
                            <Image source={{ uri: image }} className="w-40 h-40 rounded-full self-center" />
                        }
                        <View className="absolute bottom-0 right-4">
                            <Ionicons name="add-circle" size={40} color="#0292b7" />
                        </View>
                    </TouchableOpacity>
                </View>
                {/* Name - Surname */}

                <View className="items-center mt-10 space-y-1">
                    <Text className=" ml-5 font-bold">Ad</Text>
                    <TextInput
                        placeholder='Ad'
                        onChangeText={(name) => setName(name)}
                        value={name}
                        autoCorrect={false}
                        className="border rounded-full m-2 border-gray-300 p-4 text-base w-8/12"
                    />
                    <Text className=" ml-5 font-bold">Soyad</Text>
                    <TextInput
                        placeholder='Soyad'
                        onChangeText={(surname) => setSurname(surname)}
                        value={surname}
                        autoCorrect={false}
                        className="border rounded-full m-2 border-gray-300 p-4 text-base w-8/12"
                    />
                    {/* Picker */}
                    <Text className=" ml-5 font-bold">Yaş</Text>
                    <View className="border rounded-full m-2 border-gray-300 p-2 text-base w-8/12">
                        <Picker
                            selectedValue={age}
                            onValueChange={(itemValue, itemIndex) =>
                                setAge(itemValue)
                            }>
                            {yas}
                        </Picker>
                    </View>
                    <Text className=" ml-5 font-bold">Cinsiyet</Text>
                    <View className="border rounded-full m-2 border-gray-300 p-2 text-base w-8/12 mb-16">
                        <Picker
                            selectedValue={gender}
                            onValueChange={(itemValue, itemIndex) =>
                                setGender(itemValue)
                            }>
                            <Picker.Item label="Erkek" value="Erkek" />
                            <Picker.Item label="Kadın" value="Kadın" />
                        </Picker>
                    </View>
                    {/* Update Button */}
                    <TouchableOpacity
                        onPress={() => updateProfile(age, gender, name, surname)}
                        className="bg-[#0292b7] rounded-xl w-10/12 h-16 items-center justify-center"
                    >
                        <Text className="font-bold text-xl text-white">Profilimi Güncelle</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ProfileUpdateScreen