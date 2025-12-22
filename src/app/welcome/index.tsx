import { storage } from '@/src/lib/mmkvStorage';
import tw from '@/src/lib/tailwind';
import { BlurView } from 'expo-blur';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';

export default function Index() {
    const [userRole, setUserRole] = useState<string>("");

    const handleRole = async (role: string): Promise<void> => {

        // set user role
        const userRole = role === 'serviceProvider' ? '2' : '1'
        // set local storage 
        storage.set('role', userRole)
        // navigate
        router.push('/auth')
    }




    return (
        <ImageBackground
            source={require("@/assets/images/Onboarding-image.jpg")}
            style={tw`flex-1`}
        >
            <View style={tw`flex-1 flex-col items-end justify-end py-20 px-4`}>
                <BlurView
                    intensity={40} // backdrop-filter: blur(16px)-এর সমান strength
                    tint="dark"
                    style={[
                        tw`px-4 py-8 flex-col gap-6`, // layout আগের মতোই রাখলাম
                        {
                            borderRadius: 24,
                            backgroundColor: 'rgba(49, 49, 49, 0.20)', // background: rgba(...)
                            overflow: 'hidden', // যাতে borderRadius properly apply হয়
                        },
                    ]}
                >

                    <View style={tw` items-center flex-col gap-2`}>
                        <Text style={tw`text-white text-2xl font-bold`}>
                            Welcome to Pool Valet
                        </Text>
                        <Text style={tw`text-white text-sm text-center`}>
                            Whether re a pool professional offering expert service or a
                            homeowner seeking trusted care, Pool Valet connects you with what
                            matters — quality, convenience, and peace of mind.
                        </Text>
                    </View>

                    <View style={tw`flex-col gap-4`}>
                        <TouchableOpacity
                            style={tw`bg-blue_color p-4 text-xl font-semibold rounded-full`}
                            onPress={() => handleRole('homeOwner')}
                        >
                            <Text style={tw`text-center text-text_white`}>
                                Continue as Home Owner
                            </Text>
                        </TouchableOpacity>


                        <TouchableOpacity
                            style={tw`bg-white p-4  text-xl font-semibold  rounded-full`}
                            onPress={() => handleRole('serviceProvider')}
                        // onPress={() => router?.push('/home-owner')}
                        >
                            <Text style={tw` text-center text-title_color`}>
                                Continue as Service Provider
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text
                            style={tw`text-white text-sm underline text-center `}
                        >
                            Continue as Guest Home Owner
                        </Text>
                    </View>
                </BlurView>
            </View>
        </ImageBackground>
    )
}