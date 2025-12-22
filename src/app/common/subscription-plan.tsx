
import { IconsFree, IconsSub2, IconsSub3, IconsSub4 } from "@/assets/icons";
import GlobalLoading from "@/src/components/GlobalLoading";
import BackButton from "@/src/components/ui/BackButton";
import Wrapper from "@/src/components/Wrapper";
import tw from "@/src/lib/tailwind";
import { useUserGetProfileQuery } from "@/src/redux/authApi/authApiSlice";
import { useCreatedConnectedAccoutQuery, useGetAllSubscripeQuery, useUserBuyPlaneMutation, useUserBuyPlaneSuccessMutation } from "@/src/redux/subscriptionApi/subscriptionApi";
import { useStripe } from '@stripe/stripe-react-native';
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
    Dimensions,
    FlatList,
    NativeScrollEvent,
    NativeSyntheticEvent,
    Text,
    TouchableOpacity,
    View
} from "react-native";

import { SvgXml } from "react-native-svg";
import Toast from 'react-native-toast-message';

const { width } = Dimensions.get("window");
interface PlanColor {
    id: number;
    colors: string[];
    icon: string;
    buttonTitle: string;
}

const planColors: PlanColor[] = [
    { id: 1, colors: ["#FCD34D", "#FCA84C"], icon: IconsFree, buttonTitle: 'Use for free' },
    { id: 2, colors: ["#93C5FD", "#60A5FA"], icon: IconsSub2, buttonTitle: 'Manage plan' },
    { id: 3, colors: ["#A7F3D0", "#34D399"], icon: IconsSub3, buttonTitle: 'Manage plan' },
    { id: 4, colors: ["#96FA9A", "#4ADE80"], icon: IconsSub4, buttonTitle: 'Manage plan' },
];

const PlanCarousel = () => {
    const flatListRef = useRef<FlatList<any>>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const autoPlayInterval = useRef<NodeJS.Timeout | null>(null);
    const { data: userInfo } = useUserGetProfileQuery();

    const account = userInfo?.data?.stripe_account_id



    const { data, isLoading } = useGetAllSubscripeQuery(null);

    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [payment] = useUserBuyPlaneMutation();
    const [paymentSuccess] = useUserBuyPlaneSuccessMutation();
    const [isProcessing, setIsProcessing] = useState(false);

    // Toast helper
    const showToast = (type: 'success' | 'error', text1: string, text2?: string) => {
        Toast.show({ type, text1, text2, position: 'top', visibilityTime: 2000 });
    };


    // Auto play logic
    useEffect(() => {
        startAutoPlay();
        return stopAutoPlay;
    }, [activeIndex, data]);

    const startAutoPlay = () => {
        stopAutoPlay();
        autoPlayInterval.current = setInterval(() => {
            if (!data?.subscriptions?.length) return;
            const nextIndex = (activeIndex + 1) % data.subscriptions.length;
            flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
            setActiveIndex(nextIndex);
        }, 4000);
    };

    const stopAutoPlay = () => {
        if (autoPlayInterval.current) clearInterval(autoPlayInterval.current);
    };

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(offsetX / (width * 0.85));
        setActiveIndex(index);
    };


    const { data: accountCreated } = useCreatedConnectedAccoutQuery(null)



    const handlePlanPayment = async (planId: number | null, amount: number | null) => {


        // if (!account) {
        //     Alert.alert(
        //         "Stripe Account",
        //         "You need to create a Stripe connected account to proceed with payments.",
        //         [
        //             {
        //                 text: "Cancel",
        //                 style: "cancel",
        //             },
        //             {
        //                 text: "OK",
        //                 onPress: () => {
        //                     const res = accountCreated
        //                     if (res?.onboarding_url) {
        //                         Linking.openURL(res?.onboarding_url)
        //                             .catch(err => console.error("Failed to open URL:", err));
        //                     }
        //                 },
        //             },
        //         ],
        //         { cancelable: true }
        //     );

        //     return;
        // }




        setIsProcessing(true);

        const userPaymentData = { amount, payment_method_types: "card" };

        try {
            if (planId !== 1) {
                if (!planId || !amount || amount < 1) {
                    showToast('error', 'Invalid plan or amount', 'Please select a valid plan.');
                    return;
                }
                const res = await payment(userPaymentData).unwrap();

                const { error: initError } = await initPaymentSheet({
                    merchantDisplayName: "pool-mate",
                    paymentIntentClientSecret: res.data.client_secret,
                });

                if (initError) {
                    showToast('error', 'Error', initError.message);
                    return;
                }

                const { error: paymentError } = await presentPaymentSheet();
                if (paymentError) {
                    showToast('error', 'Error', paymentError.message);
                    return;
                }

                const successRes = await paymentSuccess({
                    payment_intent_id: res?.data?.id,
                    subscription_id: planId,
                }).unwrap();

                if (successRes?.status) {
                    showToast('success', 'Payment successful', 'Redirecting...');
                    // router.push('/home/(tabs)/landingPage');
                }
            } else {
                const successRes = await paymentSuccess({
                    subscription_id: planId,
                }).unwrap();

                if (successRes?.status) {
                    showToast('success', 'Payment successful', 'Redirecting...');
                    router.back()
                }


            }
        } catch (err) {
            showToast('error', 'Payment failed', 'Try again later');
        } finally {
            setIsProcessing(false);
        }
    };




    return isLoading ? <GlobalLoading /> : (
        <Wrapper>
            <BackButton title="Subscription plan" />
            <Text style={tw`text-secondary_button_color font-roboto-400 text-base mt-4`}>
                You have to purchase our subscription package to start bidding.
            </Text>

            <View style={tw`items-center justify-center mt-4`}>
                <FlatList
                    ref={flatListRef}
                    data={data?.subscriptions}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    snapToAlignment="center"
                    decelerationRate="fast"
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item, index }) => {
                        const colorData = planColors.find(c => c.id === item.id);
                        const colors = colorData?.colors || ["#ddd", "#aaa"];
                        const Icon = colorData?.icon;
                        const title = colorData?.buttonTitle;


                        return (
                            <View style={{ width: width * 0.85, marginHorizontal: width * 0.075, height: 320, marginVertical: width * 0.05 }}>
                                <View style={tw`items-center py-4`}>
                                    <Text style={tw`text-title_color text-xl font-roboto-500`}>
                                        {item?.plan_name}
                                    </Text>
                                    <Text style={tw`text-secondary_button_color text-base font-roboto-400 text-center mb-2`}>
                                        Subscribe to basic for get access to bidding
                                    </Text>
                                </View>

                                <LinearGradient
                                    colors={colors}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={[tw`flex-1 w-full p-6 rounded-2xl justify-between items-center`, index === activeIndex ? tw`shadow-lg` : tw`opacity-90`]}
                                >
                                    {Icon && <SvgXml xml={Icon} width={40} height={40} />}
                                    <Text style={tw`text-center text-black font-roboto-700 text-lg`}>
                                        {` $${item?.price}`}
                                    </Text>
                                    <Text style={tw`text-center text-black font-roboto-700 text-lg`}>
                                        {`Can bid ${item?.number_of_quotes} quotes`}
                                    </Text>

                                    <TouchableOpacity
                                        style={tw`rounded-full bg-white flex-row justify-center items-center py-3 w-full mt-4`}
                                        onPress={() => handlePlanPayment(item?.id, item?.price)}
                                        disabled={isProcessing}
                                    >
                                        {isProcessing ? <ActivityIndicator /> :
                                            <Text style={tw`text-center text-black font-roboto-medium text-base`}>{title}</Text>}
                                    </TouchableOpacity>
                                </LinearGradient>
                            </View>
                        );
                    }}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                />
            </View>

            <Toast />
        </Wrapper>
    );
};

export default PlanCarousel;
