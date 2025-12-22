import BackButton from "@/src/components/ui/BackButton";
import HomeOwnerSay from "@/src/components/ui/HomeOwnerSay";
import Wrapper from "@/src/components/Wrapper";
import tw from "@/src/lib/tailwind";
import { useAcceptBidsMutation } from "@/src/redux/my_quote_api/myQuoteApi";
import { useGetSingleProviderQuery } from "@/src/redux/topProvidersApi/topProvidersApi";
import { makeImage } from "@/src/utils/image_converter";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function Providers() {
  const { id, myquots } = useLocalSearchParams<{
    id: string;
    myquots: string;
  }>();


  const { data } = useGetSingleProviderQuery({ id: id })
  const [accept_bids, { isLoading }] = useAcceptBidsMutation()





  const [successmodalVisible, setSuccessModalVisible] =
    useState<boolean>(false);


  const handleBidsControll = async () => {

    try {


      await accept_bids({ bid_id: myquots }).unwrap();
      router.replace('/home-owner/(drawer)/(tabs)/view-quotes')

      // setSuccessModalVisible(!successmodalVisible)

    } catch (err) {
      console.error(" Error accepting bid:", err);
    }
  }




  return (
    <Wrapper>
      <BackButton title="My profile" />

      <View style={tw`flex-1 flex-col gap-9 relative`} pointerEvents="box-none">
        <View style={tw`items-center  bg-[#F1F1F1] p-4 rounded-2xl shadow-lg`}>
          <View
            style={tw`w-20 h-20 rounded-full bg-gray-300 items-center justify-center`}
          >
            <Image
              source={{ uri: makeImage(data?.provider?.avatar) }}
              style={tw`w-20 h-20 rounded-full`}
            />

          </View>

          {/* Custom Modal for options */}
          <View style={tw` py-1 `} >
            <Text
              style={tw` text-title_color font-roboto-700  text-xl `}
            >
              {data?.provider?.full_name}
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
                {data?.provider?.average_rating}
              </Text>
              <Text style={tw` text-title_color font-roboto-700  text-base `}>
                {data?.provider?.profile?.completed_services}
              </Text>
              <Text style={tw` text-title_color font-roboto-700  text-base `}>
                {data?.provider?.profile?.canceled_order}
              </Text>
            </View>
          </View>
        </View>


        <View style={tw`flex-1`}>
          <Text style={tw`text-title_color text-xl font-roboto-600`}>
            What home owners say?
          </Text>

          <HomeOwnerSay reviews={data?.reviews || []} />
        </View>

        <View style={tw` py-2 flex-col gap-2`}>
          <TouchableOpacity
            style={tw` border border-[#8F8F8F] rounded-full py-3 items-center`}
            onPress={() =>
              router.push("/business-provider/(drawer)/(tabs)/chat")
            }
          >
            <Text
              style={tw`text-secondary_button_color text-lg font-roboto-600`}
            >
              Chat
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw` bg-button_color rounded-full py-3 items-center`}
            onPress={() => {
              handleBidsControll()
            }
            }
          >
            <Text style={tw`text-white text-lg font-roboto-600`}>
              Accept request
            </Text>
          </TouchableOpacity>
        </View>

        {/* <AcceptRequestModal
          setSuccessModalVisible={setSuccessModalVisible}
          successmodalVisible={successmodalVisible}
        /> */}



      </View>
    </Wrapper>
  );
}
