import { View, Text, SafeAreaView, ScrollView, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { firebase } from "../firebaseconfig"
import IlanCard from '../components/IlanCard'
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const SearchScreen = () => {
    const [ilanlar, setIlanlar] = useState();
    const [location, setLocation] = useState("");
    const [cities, setCities] = useState([])

    useEffect(() => {
        axios.get("https://gist.githubusercontent.com/ozdemirburak/4821a26db048cc0972c1beee48a408de/raw/4754e5f9d09dade2e6c461d7e960e13ef38eaa88/cities_of_turkey.json")
            .then((response) => {
                setCities(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    useEffect(() => {
        let query = firebase.firestore().collection("ilanlar")
        query = query.where("city", "==", location)
        query.get()
            .then((snapshot) => {
                const list = []
                snapshot.forEach((doc) => {
                    const data = doc.data()
                    list.push(data)
                })
                setIlanlar(list)
            })
        console.log("SearchScreen useEffect çalıştı.")
    }, [location])


    return (
        <SafeAreaView className="flex-1 py-12">
            <View className="border rounded-xl m-2 border-gray-300 p-2 text-base w-12/12 bg-white">
                <Picker
                    placeholder='Konum Seçiniz'
                    selectedValue={location}
                    onValueChange={(itemValue, itemIndex) => {
                        setLocation(itemValue)
                    }
                    }>
                    <Picker.Item label="Konum Seçiniz" value="" />
                    {cities.map((c) => {
                        return <Picker.Item key={c.id} label={c.name} value={c.name} />
                    })}
                </Picker>
            </View>
            <ScrollView>
                {ilanlar != undefined ? ilanlar.map((ilan, index) => (
                    <IlanCard ilan={ilan} key={index} />
                )) : <Text className="text-center">Yükleniyor...</Text>}
                {location == "" ? <Text className="text-center">Ev Arkadaşı aradığın şehri seç ve sana uygun olan ilanları hemen görüntüle !</Text> : null}
            </ScrollView>
        </SafeAreaView>
    )
}

export default SearchScreen