import { View, Text } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat, Bubble } from 'react-native-gifted-chat'
import { useRoute } from '@react-navigation/native';
import { firebase } from "../../firebaseconfig";

const MessageDetailScreen = () => {
    const [messages, setMessages] = useState([]);
    const [uid, setUid] = useState("")
    const route = useRoute()

    useEffect(() => {
        firebase.firestore().doc("chats/" + route.params.chatId)
            .onSnapshot((doc) => {
                setMessages(doc.data()?.messages ?? [])
            })
        console.log("iç mesaj çalıştı");
    }, [route.params.chatId])

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setUid(user.uid)
            }
        })
    }, [])

    const onSend = useCallback((m = []) => {
        firebase.firestore().collection("chats").doc(route.params.chatId)
            .set({
                messages: GiftedChat.append(messages, m),
            },
                { merge: true }
            )
        console.log("onSend Çalıştı")
    })

    return (
        <GiftedChat
            messages={messages.map((x) => ({ ...x, createdAt: x.createdAt?.toDate() }))}
            onSend={messages => onSend(messages)}
            user={{
                _id: uid,
            }}
            renderBubble={props => {
                return (
                    <Bubble
                        {...props}
                        wrapperStyle={{
                            left: { backgroundColor: '#ffd561' },
                            right: { backgroundColor: '#8271ff' }

                        }}
                    />
                );
            }}
        />
    )
}

export default MessageDetailScreen