import GlobalLoading from "@/src/components/GlobalLoading";
import BackButton from "@/src/components/ui/BackButton";
import MainSlider from "@/src/components/ui/MainSlider";
import Wrapper from "@/src/components/Wrapper";
import tw from "@/src/lib/tailwind";
import { useSingleUserQuoteViewQuery } from "@/src/redux/my_quote_api/myQuoteApi";
import { useGetSingleProviderQuery } from "@/src/redux/topProvidersApi/topProvidersApi";
import { useUserSubscriptionsBuyPlaneSuccessMutation, useUseSubscriptionsBuyPlaneMutation } from "@/src/redux/user-subscriptionApi/userSubscriptionApi";
import { makeImage } from "@/src/utils/image_converter";
import { useStripe } from "@stripe/stripe-react-native";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Toast from 'react-native-toast-message';

export default function CompleteOrder() {

  const { id, pay, provider_id } = useLocalSearchParams<{
    id: string;
    pay: string;
    provider_id: string
  }>();


  const { data: user_data } = useGetSingleProviderQuery({ id: provider_id })
  const { data, isLoading } = useSingleUserQuoteViewQuery({ quote_id: id })
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [payment] = useUseSubscriptionsBuyPlaneMutation();
  const [paymentSuccess] = useUserSubscriptionsBuyPlaneSuccessMutation();
  const [isProcessing, setIsProcessing] = useState(false);



  const showToast = (type: 'success' | 'error', text1: string, text2?: string) => {
    Toast.show({ type, text1, text2, position: 'top', visibilityTime: 2000 });
  };



  const handlePlanPayment = async () => {

    setIsProcessing(true);

    const userPaymentData = { amount: Number(pay), provider_id: user_data?.provider?.id, payment_method_types: "card" };



    try {
      const res = await payment(userPaymentData).unwrap();


      const { error: initError } = await initPaymentSheet({
        merchantDisplayName: "pool-mate",
        paymentIntentClientSecret: res.client_secret,
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
        payment_intent_id: res?.payment_intent?.id,
        amount: pay,
        provider_id: user_data?.provider?.id,
        quote_id: id
      }).unwrap();




      if (successRes?.status) {
        showToast('success', 'Payment successful', 'Redirecting...');
        router.push({ pathname: '/home-owner/review-and-rating/review-and-rating', params: { id: user_data?.provider?.id, quote_id: id } })

      }
    } catch (err) {
      showToast('error', 'Payment failed', 'Try again later');
      console.log('Payment Error: ', err);
      Alert.alert("Failed to Add Account", err?.message || "Something went wrong. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };



  return isLoading ? <GlobalLoading /> : (
    <Wrapper>
      <BackButton title="Back" />
      <View style={tw` flex-1 flex-col gap-2  `}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`m-1`} >
          <View style={tw` flex-1  flex-col gap-6 `}>
            <View style={tw`items-center  bg-[#F1F1F1] p-4 rounded-2xl shadow-lg`}>
              <View
                style={tw`w-20 h-20 rounded-full bg-gray-300 items-center justify-center`}
              >

                <Image
                  source={{ uri: makeImage(user_data?.provider?.avatar) }}
                  style={tw`w-20 h-20 rounded-full`}
                />
              </View>

              {/* Custom Modal for options */}
              <View style={tw` py-1 `} >
                <Text
                  style={tw` text-title_color font-roboto-700  text-xl `}
                >
                  {user_data?.provider?.full_name}
                </Text>
              </View>

              <View style={tw` w-full flex-row  justify-between mt-6 `}>
                {/* fd */}
                <View style={tw` flex-col gap-2 `}>
                  <Text
                    style={tw` text-secondary_button_color font-roboto-400  text-base `}
                  >
                    Service Rating :
                  </Text>
                  <Text
                    style={tw` text-secondary_button_color font-roboto-400  text-base `}
                  >
                    Order Completed:
                  </Text>
                  <Text
                    style={tw` text-secondary_button_color font-roboto-400  text-base `}
                  >
                    Canceled Orders:
                  </Text>
                </View>
                {/* fd */}
                <View style={tw` flex-col gap-2 `}>
                  <Text style={tw` text-title_color font-roboto-700  text-base `}>
                    {/* {data?.provider?.average_rating} */}
                    {user_data?.provider?.average_rating}
                  </Text>
                  <Text style={tw` text-title_color font-roboto-700  text-base `}>
                    {user_data?.provider?.profile?.completed_services || 0}
                  </Text>
                  <Text style={tw` text-title_color font-roboto-700  text-base `}>
                    {data?.data?.user?.profile?.canceled_order}
                  </Text>
                </View>
              </View>
            </View>

            <View style={tw` flex-1 flex-col gap-4`}>
              <View>
                <Text style={tw`text-[#0EA5E9] text-xl  font-roboto-600`}>
                  Working in progress
                </Text>
              </View>

              <View style={tw`flex-1 flex-col gap-4`}>
                <View style={tw`  `}>
                  {/* Image */}
                  <MainSlider images={data?.data?.photos} />
                  <View style={tw`flex-1 justify-between`}>
                    {/* Description */}
                    <View style={tw`py-4`}>
                      <Text
                        style={tw`text-base text-title_color font-roboto-600 mb-4`}
                      >
                        {data?.data?.describe_issue ?? null}
                      </Text>

                      <View style={tw`flex-col gap-7`}>
                        <View>
                          <InfoRow label="Category" value={data?.data?.service} />
                          <InfoRow
                            label="Property type"
                            value={data?.data?.property_type}
                          />
                          <InfoRow label="Service date" value={data?.data?.date} />
                          <InfoRow label="Zip code" value={data?.data?.zip_code} />
                          <InfoRow
                            label="Address"
                            value={data?.data?.address}
                          />
                          {
                            data?.data?.expected_budget > 0 &&
                            <InfoRow label="Expected budget" value={`$ ${data?.data?.expected_budget}`} />
                          }
                        </View>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={tw` my-3 flex-col gap-2`}>
                  <TouchableOpacity
                    style={tw` border border-[#8F8F8F] rounded-full py-3 items-center`}
                    onPress={() =>
                      router.push({
                        pathname: "/common/[id]",
                        params: { id: user_data?.provider?.id },
                      })
                    }
                  >
                    <Text
                      style={tw`text-secondary_button_color text-lg font-roboto-600`}
                    >
                      Chat
                    </Text>
                  </TouchableOpacity>

                  {/* TODO  payment  */}
                  <TouchableOpacity
                    style={tw` bg-button_color rounded-full py-3 items-center`}
                    onPress={() => handlePlanPayment()}
                  >
                    <Text style={tw`text-white text-lg font-roboto-600`}>
                      Pay ${pay}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Chat & Quote Buttons - Fixed bottom */}

        {/* <CancelOrderModal
          setSuccessModalVisible={setSuccessModalVisible}
          successmodalVisible={successmodalVisible}
        /> */}
      </View>
    </Wrapper>
  );
}

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <View style={tw`flex-row justify-between py-1`}>
    <Text style={tw`text-secondary_button_color font-roboto-400`}>{label}</Text>
    <Text style={tw`text-title_color text-sm font-roboto-500`}>{value}</Text>
  </View>
);
