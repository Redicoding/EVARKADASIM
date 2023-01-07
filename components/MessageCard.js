import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { firebase } from "../firebaseconfig"
import { useNavigation } from '@react-navigation/native'

const MessageCard = ({ chat }) => {
    const navigation = useNavigation();
    const [user, setUser] = useState([]);
    const userMail = firebase.auth().currentUser.email;
    useEffect(() => {
        firebase.firestore().collection("users").where("email", "==", chat.data().users.find(x => x != userMail)).get()
            .then((user) => {
                setUser(user.docs[0].data());
                console.log("Message Card Çalıştı");
            })
    }, [])
    return (
        <View>
            <TouchableOpacity className="mt-3 border-b  border-b-gray-300 py-2 flex-row"
                onPress={() => { navigation.navigate("MessageDetail", { chatId: chat.id, userImage: user.image }) }}
                key={chat.id}
            >
                <Image source={{ uri: user.image }} className="w-20 h-20 rounded-full" />
                <View>
                    <Text className="ml-4 text-lg font-bold">{user.name} {user.surname}</Text>
                    <Text className="text-gray-400 text-sm ml-4 w-11/12">{(chat.data().messages ?? [])[0]?.text ?? "Hemen İlan Hakkında Bir Soru Sor"}</Text>
                </View>
                <Text className="absolute bottom-0 right-3 text-green-600 text-lg">✓✓</Text>
            </TouchableOpacity>
        </View>
    )
}

export default MessageCard