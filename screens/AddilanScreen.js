import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import PhotoCard from '../components/PhotoCard'
import axios from "axios";
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { firebase } from '../firebaseconfig';
import { useNavigation } from '@react-navigation/native';


const AddilanScreen = () => {
    const navigation = useNavigation();
    const [cities, setCities] = useState([]);
    const [email, setEmail] = useState("");
    const [user, setUser] = useState("");
    const [city, setCity] = useState("Adana");
    const [town, setTown] = useState("");
    const [price, setPrice] = useState(0);
    const [time, setTime] = useState("1 Yıl +");
    const [pricetime, setPricetime] = useState("Ay");
    const [age, setAge] = useState("Farketmez");
    const [gender, setGender] = useState("Farketmez");
    const [smoking, setSmoking] = useState("Evet");
    const [pet, setPet] = useState("Evet");
    const [about, setAbout] = useState("");
    const [date, setDate] = useState(new Date());
    const [img1, setImg1] = useState(null);
    const [img2, setImg2] = useState(null);
    const [img3, setImg3] = useState(null);
    const [img4, setImg4] = useState(null);
    const [img5, setImg5] = useState(null);
    const [img6, setImg6] = useState(null);
    const [url, setUrl] = useState([null, null, null, null, null, null, null]);

    useEffect(() => {
        setEmail(firebase.auth().currentUser.email);
        firebase.firestore().collection("users")
            .doc(firebase.auth().currentUser.uid).get()
            .then((snapshot) => {
                if (snapshot.exists) {
                    setUser(snapshot.data())
                } else {
                    console.log("Böyle bir kullanıcı yok")
                }
            })
    }, [])
    let x;


    // PickImage
    const pickImage = async (index, set) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        });
        if (!result.canceled) {
            uploadImage(result.assets[0].uri, index);
            set(result.assets[0].uri);
        }
    }

    const uploadImage = async (image, index) => {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function () {
                reject(new TypeError('Network request failed'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', image, true);
            xhr.send(null);
        });

        const fileName = image.substring(image.lastIndexOf('/') + 1);
        const ref = firebase
            .storage()
            .ref()
            .child(fileName);

        try {
            const snapshot = await ref.put(blob);
            await snapshot.ref.getDownloadURL()
                .then((downloadURL) => {
                    const updateState = [...url];
                    updateState[index] = downloadURL;
                    setUrl(updateState);
                    alert("FOTOĞRAF BAŞARIYLA YÜKLENDİ")
                })
        } catch (error) {
            alert("FOTOĞRAF YÜKLENEMEDi Lütfen Tekrar Deneyiniz");
        }
        blob.close();
    }

    //İlan Ekle
    const addIlan = async () => {
        if (price != 0 && about != "") {
            await firebase.firestore().collection("ilanlar")
                .doc()
                .set({
                    email: email,
                    city: city,
                    town: town,
                    price: price,
                    time: time,
                    pricetime: pricetime,
                    age: age,
                    gender: gender,
                    smoking: smoking,
                    pet: pet,
                    about: about,
                    img1: url[0],
                    img2: url[1],
                    img3: url[2],
                    img4: url[3],
                    img5: url[4],
                    img6: url[5],
                    userName: user.name,
                    userAge: user.age,
                    userGender: user.gender,
                    userImage: user.image,
                    date: date.toLocaleDateString(),
                }).catch((error) => {
                    console.log(error);
                    alert("İlan Eklenemedi !");
                })
            setImg1(null); setImg2(null); setImg3(null); setImg4(null); setImg5(null); setImg6(null);
            setUrl([null, null, null, null, null, null, null]);
            setAbout(""); setPrice(0); setTown("");
            alert("Tebrikler Yeni İlanınız Yayında!")
            navigation.goBack();
        } else {
            alert("Lütfen İlçe ve Başlık Alanlarını Doldurunuz");
        }
    }
    useEffect(() => {
        axios.get("https://gist.githubusercontent.com/ozdemirburak/4821a26db048cc0972c1beee48a408de/raw/4754e5f9d09dade2e6c461d7e960e13ef38eaa88/cities_of_turkey.json")
            .then((response) => {
                setCities(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])
    return (
        <SafeAreaView className="flex-1 pt-12 bg-white mb-12">
            <ScrollView>
                <Text className="text-2xl font-bold text-[#0292b7] text-center mb-4">Ev İlanı Ver !</Text>

                {/* Photo Card */}
                <View className="flex-row justify-center">
                    <PhotoCard onPress={() => pickImage(0, setImg1)} img={img1} />
                    <PhotoCard onPress={() => pickImage(1, setImg2)} img={img2} />
                    <PhotoCard onPress={() => pickImage(2, setImg3)} img={img3} />
                </View>
                <View className="flex-row justify-center">
                    <PhotoCard onPress={() => pickImage(3, setImg4)} img={img4} />
                    <PhotoCard onPress={() => pickImage(4, setImg5)} img={img5} />
                    <PhotoCard onPress={() => pickImage(5, setImg6)} img={img6} />
                </View>

                {/* Choose City */}
                <Text className=" ml-5 font-bold">Evin bulunduğu ili seçiniz</Text>
                <View className="border rounded-full m-2 border-gray-300 p-2 text-base w-11/12">
                    <Picker
                        selectedValue={city}
                        onValueChange={(itemValue, itemIndex) => {
                            setCity(itemValue)
                        }
                        }>
                        {cities.map((c) => {
                            return <Picker.Item key={c.id} label={c.name} value={c.name} />
                        })}
                    </Picker>
                </View>

                {/* Choose Town */}
                <View className="w-full">
                    <Text className=" ml-5 font-bold">İlçe Giriniz</Text>
                    <TextInput
                        placeholder='bkz: Kadıköy'
                        onChangeText={(town) => setTown(town)}
                        autoCorrect={false}
                        className="border rounded-full m-2 border-gray-300 p-4 text-base"
                    />
                </View>

                {/* Ilan Price */}
                <View className="flex-row">
                    <View className="w-7/12">
                        <Text className=" ml-5 font-bold">İstediğiniz Ücret</Text>
                        <TextInput
                            placeholder='TL'
                            onChangeText={(price) => setPrice(price)}
                            autoCorrect={false}
                            className="border rounded-full m-2 border-gray-300 p-4 text-base"
                            keyboardType='numeric'
                        />
                    </View>
                    <View className="border rounded-full mt-6 mb-2 mx-2 border-gray-300 p-1 text-base w-4/12">
                        <Picker
                            selectedValue={pricetime}
                            onValueChange={(itemValue, itemIndex) =>
                                setPricetime(itemValue)
                            }>
                            <Picker.Item label="Ay" value="Ay" />
                            <Picker.Item label="Gün" value="Gün" />
                        </Picker>
                    </View>
                </View>

                {/* İlan Time */}
                <Text className=" ml-5 mt-2 font-bold">Ne kadar süreliğine evine arkadaş arıyorsun?</Text>
                <View className="border rounded-full m-2 border-gray-300 p-1 text-base w-11/12">
                    <Picker
                        selectedValue={time}
                        onValueChange={(itemValue, itemIndex) =>
                            setTime(itemValue)
                        }>
                        <Picker.Item label="1 Yıl +" value="1 Yıl +" />
                        <Picker.Item label="3 ay" value="3 ay" />
                        <Picker.Item label="6 ay" value="6 ay" />
                        <Picker.Item label="1 Ay" value="1 Ay" />
                        <Picker.Item label="1 Gün" value="1 Gün" />
                    </Picker>
                </View>

                {/* Age - Gender */}
                <View className="flex-row space-x-24">
                    <Text className=" ml-5 mt-2 font-bold">Aradığın Yaş Aralığı</Text>
                    <Text className=" ml-5 mt-2 font-bold">Aradığın Cinsiyet</Text>
                </View>
                <View className="flex-row">
                    <View className="border rounded-full m-2 border-gray-300 p-1 text-base w-6/12">
                        <Picker
                            selectedValue={age}
                            onValueChange={(itemValue, itemIndex) =>
                                setAge(itemValue)
                            }>
                            <Picker.Item label="Farketmez" value="Farketmez" />
                            <Picker.Item label="18 - 25 Yaş" value="18 - 25 Yaş" />
                            <Picker.Item label="25 - 35 Yaş" value="25 - 35 Yaş" />
                            <Picker.Item label="35 - 45 Yaş" value="35 - 45 Yaş" />
                            <Picker.Item label="45 Yaş Üstü" value="45 Yaş Üstü" />
                        </Picker>
                    </View>
                    <View className="border rounded-full m-2 border-gray-300 p-1 text-base w-5/12">
                        <Picker
                            selectedValue={gender}
                            onValueChange={(itemValue, itemIndex) =>
                                setGender(itemValue)
                            }>
                            <Picker.Item label="Farketmez" value="Farketmez" />
                            <Picker.Item label="Erkek" value="Erkek" />
                            <Picker.Item label="Kadın" value="Kadın" />
                        </Picker>
                    </View>
                </View>

                {/* Pet - Smoke */}
                <View className="flex-row space-x-10">
                    <Text className=" ml-5 mt-2 font-bold">Evcil Hayvan Getirebilir mi?</Text>
                    <Text className=" ml-5 mt-2 font-bold">Sigara İçilebilir mi?</Text>
                </View>
                <View className="flex-row">
                    <View className="border rounded-full m-2 border-gray-300 p-1 text-base w-6/12">
                        <Picker
                            selectedValue={pet}
                            onValueChange={(itemValue, itemIndex) =>
                                setPet(itemValue)
                            }>
                            <Picker.Item label="Evet" value="Evet" />
                            <Picker.Item label="Hayır" value="Hayır" />
                        </Picker>
                    </View>
                    <View className="border rounded-full m-2 border-gray-300 p-1 text-base w-5/12">
                        <Picker
                            selectedValue={smoking}
                            onValueChange={(itemValue, itemIndex) =>
                                setSmoking(itemValue)
                            }>
                            <Picker.Item label="Evet" value="Evet" />
                            <Picker.Item label="Hayır" value="Hayır" />
                        </Picker>
                    </View>
                </View>
                {/* About */}
                <View className="w-full">
                    <Text className=" ml-5 font-bold">İlan Başlığı</Text>
                    <TextInput
                        placeholder='bkz: Öğrenci evime titiz ev arkadaşı arıyorum.'
                        onChangeText={(about) => setAbout(about)}
                        autoCorrect={false}
                        className="border rounded-lg m-2 border-gray-300 px-2 text-base"
                        maxLength={100}
                        multiline={true}
                        numberOfLines={4}
                    />
                </View>
                {/* Add Button */}
                <View className="items-center pb-10 mt-10">
                    <TouchableOpacity
                        onPress={() => { addIlan() }}
                        className="bg-[#0292b7] rounded-xl w-10/12 h-16 items-center justify-center"
                    >
                        <Text className="font-bold text-xl text-white">İlanı Yayınla</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default AddilanScreen