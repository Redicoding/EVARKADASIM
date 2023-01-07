import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { firebase } from "../firebaseconfig"
import MessageCard from '../components/MessageCard'

const MessageScreen = () => {
    const navigation = useNavigation();
    const [chats, setChats] = useState([]);
    const userMail = firebase.auth().currentUser.email;
    useEffect(() => {
        firebase.firestore().collection("chats")
            .where("users", "array-contains", userMail)
            .onSnapshot((querySnapshot) => {
                setChats(querySnapshot.docs);
            })

        console.log("Message useEffect Çalıştı");
    }, [userMail])



    return (
        <SafeAreaView className="pt-12 flex-1 bg-white">
            <Text className="text-2xl font-bold text-[#0292b7] text-center mb-4">Mesajlarım</Text>
            <TouchableOpacity className="mt-3 border-b  border-b-gray-300 py-2 flex-row">
                <Image source={require("../img/Icon.png")} className="w-20 h-20 rounded-full" />
                <View>
                    <Text className="ml-4 text-lg font-bold">EV ARKADASIM</Text>
                    <Text className="text-gray-400 text-sm ml-4 w-7/12">Hemen Beğendiğin İlan Üzerinden Ev Sahiplerine Ücretsiz Mesaj Gönder !</Text>
                </View>
                <Text className="absolute bottom-0 right-3 text-green-600 text-lg"></Text>
            </TouchableOpacity>
            {chats.map((chat) => (
                <MessageCard chat={chat} key={chat.id} />
            ))}
        </SafeAreaView>
    )
}

export default MessageScreen