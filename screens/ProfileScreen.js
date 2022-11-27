import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const ProfileScreen = () => {
    const navigation = useNavigation();
    return (
        <View>
            <TouchableOpacity onPress={() => navigation.navigate("Ilan")}>
                <Text>Ilana Yolla</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ProfileScreen