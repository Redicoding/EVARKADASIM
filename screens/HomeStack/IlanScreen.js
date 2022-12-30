import { View, Text, SafeAreaView, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import Currency from 'react-currency-formatter';
import React, { useEffect, useState } from 'react'



const IlanScreen = ({ route }) => {
    // const [image, setImage] = useState([
    //     route.params.ilan.img1,
    //     route.params.ilan.img2,
    //     route.params.ilan.img3,
    //     route.params.ilan.img4,
    //     route.params.ilan.img5,
    //     route.params.ilan.img6
    // ])
    const image = [
        route.params.ilan.img1,
        route.params.ilan.img2,
        route.params.ilan.img3,
        route.params.ilan.img4,
        route.params.ilan.img5,
        route.params.ilan.img6
    ]
    const { width } = Dimensions.get('window');
    const height = width * 1.3;
    return (
        <SafeAreaView className="flex-1">
            <ScrollView>
                {/* IMAGE */}
                <View>
                    <ScrollView horizontal pagingEnabled style={{ width, height }}>
                        {image.map((item, index) => (
                            item && <Image source={{ uri: item }} style={{ width, height }} key={index} />
                        ))}
                    </ScrollView>
                    <View className="absolute bottom-0 flex-row self-center space-x-1">
                        {image.map((item, index) => (
                            item && <Text className="text-white">⬤</Text>
                        ))}

                    </View>
                </View>



                {/* ILAN INFO */}
                <View className="bg-white">
                    <Text className="text-2xl font-bold text-center mt-5">{route.params.ilan.about}</Text>
                    <Text className="text-center text-gray-400 mt-2">{route.params.ilan.city} / {route.params.ilan.town}</Text>
                    <View className="flex-row items-center ml-7 mt-7">
                        <Text className="font-extrabold text-xl text-[#0292b7]"><Currency quantity={parseInt(route.params.ilan.price)} currency="TRY" pattern='### !' /></Text>
                        <Text className="text-gray-600 text-base font-bold">  / {route.params.ilan.pricetime}</Text>
                    </View>
                    {/* USER INFO */}
                    <View className="mt-8 border-b border-t border-b-gray-400 border-t-gray-400 mx-7 py-4 flex-row">
                        <Image source={{ uri: route.params.ilan.userImage }} className="w-20 h-20 rounded-full" />
                        <View>
                            <Text className="ml-4 text-lg font-bold">{route.params.ilan.userName}, {route.params.ilan.userAge}</Text>
                            <Text className="text-gray-400 text-sm ml-4">{route.params.ilan.userGender}</Text>
                        </View>
                    </View>
                    {/* ILAN DETAILS */}
                    <View className=" mt-5">
                        <Text className="text-2xl text- font-bold border-b-2 border-[#0292b7] text-center mx-7 p-2 text-[#0292b7]">İlan Detayları</Text>
                        <View className="mt-3 ml-7 flex-row">
                            <View className="flex-1">
                                <Text className="font-bold text-base">Aranan Yaş Aralığı</Text>
                                <Text className="text-[#0292b7] text-base ml-6">{route.params.ilan.age}</Text>
                            </View>
                            <View className="mr-7">
                                <Text className="font-bold text-base">Aranan Cinsiyet</Text>
                                <Text className="text-[#0292b7] text-base text-center">{route.params.ilan.gender}</Text>
                            </View>
                        </View>
                        <View className="mt-7 items-center">
                            <Text className="font-bold text-base">Evde Sigara İçilebilir mi?</Text>
                            <Text className="text-[#0292b7] text-base ">{route.params.ilan.smoking}</Text>
                        </View>
                        <View className="mt-7 items-center pb-10">
                            <Text className="font-bold text-base">Evcil Hayvan Getirilebilir mi?</Text>
                            <Text className="text-[#0292b7] text-base ">{route.params.ilan.pet}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default IlanScreen