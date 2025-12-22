
import { IconsCloseRed } from "@/assets/icons";
import GlobalLoading from "@/src/components/GlobalLoading";
import BackButton from "@/src/components/ui/BackButton";
import MainSlider from "@/src/components/ui/MainSlider";
import VideoScreen from "@/src/components/VideoScreenAll";
import Wrapper from "@/src/components/Wrapper";
import tw from "@/src/lib/tailwind";
import { useUserGetProfileQuery } from "@/src/redux/authApi/authApiSlice";
import { useAcceptBudgetMutation, useSrtartQuotsMutation, useViewAllSingleCategoryQuery } from "@/src/redux/categoryWiseQuotesApi/categoryHomeApi";
import { useCreatedConnectedPlaneQuery } from "@/src/redux/cureent_palane/currentPalaneApi";
import { useCreatedConnectedAccoutQuery, useGetAllSubscripeQuery } from "@/src/redux/subscriptionApi/subscriptionApi";
import { makeImage } from "@/src/utils/image_converter";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, Linking, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

import { SvgXml } from "react-native-svg";

export default function ServiceDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data, isLoading } = useViewAllSingleCategoryQuery({ user_id: id });
  const [modalVisible, setModalVisible] = useState(false);

  const { data: userData } = useUserGetProfileQuery();
  const { data: accountCreated } = useCreatedConnectedAccoutQuery(null)
  const account = userData?.data?.stripe_account_id;
  const { data: subscription } = useGetAllSubscripeQuery(null);



  const { data: current_palan } = useCreatedConnectedPlaneQuery({ provider_id: userData?.data?.id })
  const [price, setPrice] = useState<number | null>(null);
  const [outline, setOutline] = useState("");
  const [startQuote, { isLoading: moreLoading }] = useSrtartQuotsMutation();

  const [accept_budget, { isLoading: acceptLoading }] = useAcceptBudgetMutation()



  const handleSubmit = async () => {
    if (price === null || isNaN(price) || price <= 0 || !outline.trim()) {
      Alert.alert("Error", "Please enter a valid price and outline");
      return;
    }


    try {
      const res = await startQuote({
        quote_id: id,
        price_offered: price,
        quote_outline: outline.trim(),
      }).unwrap();

      if (res?.status === true) {
        setModalVisible(false);
        router.push({
          pathname: "/business-provider/already-have-plan/biddingList",
          params: { quote_id: id, price: price }
        });
        setPrice(0);
        setOutline("")
      } else {
        Alert.alert("Message", res?.message || "Something went wrong");
      }
    } catch (err: any) {
      console.log("Submit error:", err);
      Alert.alert("Message", err?.data?.message || "Server error");
    }
  };


  const handleAccept = async () => {
    try {
      const res = await accept_budget({ quote_id: id }).unwrap()

      if (res?.status) {
        router.push({
          pathname: "/business-provider/already-have-plan/biddingList",
          params: { quote_id: id, price: price }
        });
      }


    } catch (error) {
      console.log(error);

    }
  }

  // created a account on stripe 
  const handleModalOpen = () => {
    if (!account) {
      Alert.alert(
        "Stripe Account",
        "You need to create a Stripe connected account to proceed with payments.",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Set Up Now",
            onPress: () => {
              const res = accountCreated
              if (res?.onboarding_url) {
                Linking.openURL(res?.onboarding_url)
                  .catch(err => console.error("Failed to open URL:", err));
              }
            },
          },
        ],
        { cancelable: true }
      );

      return;
    } else {

      setModalVisible(!modalVisible)
    }
  }





  return isLoading ? <GlobalLoading /> : (
    <Wrapper>
      <BackButton title="Back" />

      <ScrollView
        contentContainerStyle={tw`flex-grow`} // Changed from flex-1 to flex-grow for better behavior
        showsVerticalScrollIndicator={false}
      >
        <View style={tw``}>
          {data?.data?.photos?.length > 0 ? (
            <MainSlider images={data.data.photos} />
          ) : data?.data?.video ? (
            <VideoScreen source={data.data.video} />
          ) : (
            <View style={tw`flex-1 items-center justify-center`}>
              <Text>No media available</Text>
            </View>
          )}
        </View>



        <View style={tw`flex-1 justify-between`}>
          {/* Description */}
          <View style={tw`py-4`}>
            <Text style={tw`text-base text-title_color font-roboto-600 mb-4`}>
              {data?.data?.describe_issue}
            </Text>

            <View style={tw`flex-col gap-10`}>
              <View>
                <InfoRow label="Category" value={data?.data?.service} />
                <InfoRow label="Property type" value={data?.data?.property_type} />
                <InfoRow label="Service date" value={data?.data?.date} />
                <InfoRow label="Address" value={data?.data?.address} />
                {data?.data?.expected_budget > 0 && <InfoRow
                  label="Expected budget"
                  value={data?.data?.expected_budget && `$${data?.data?.expected_budget}`}
                />}
              </View>

              {/* Owner Info */}
              <View style={tw`flex-col gap-4`}>
                <Text style={tw`text-xl text-title_color font-roboto-600`}>
                  Owners information
                </Text>
                <View style={tw`flex-row items-center gap-3`}>
                  <Image
                    source={{
                      uri: makeImage(data?.data?.user?.avatar)
                    }}
                    style={tw`w-10 h-10 rounded-full`}
                  />
                  <Text
                    style={tw`text-base text-secondary_button_color font-roboto-500`}
                  >
                    {data?.data?.user?.full_name || 'Unknown User'}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {current_palan?.status === false ? <View
            style={tw`p-4 rounded-lg bg-[#A7F3D0] flex-row justify-between`}
          >
            <View>
              <Text style={tw`text-base text-[#000] font-roboto-700`}>
                Basic Plan
              </Text>
              <Text
                style={tw`text-sm text-secondary_button_color font-roboto-400`}
              >
                {`You have remains ${subscription?.subscriptions[0]?.number_of_quotes} quotes.`}
              </Text>
            </View>

            <View>
              <TouchableOpacity
                style={tw`bg-white rounded-full p-2 items-center`}
                onPress={() => router.push('/common/subscription-plan')}
              >
                <Text style={tw`text-[#003B73] text-sm font-roboto-600`}>
                  See all plans
                </Text>
              </TouchableOpacity>
            </View>
          </View> : ""}

          {/* Chat & Quote Buttons - Fixed bottom */}
          <View style={tw`py-8 flex-col gap-2`}>
            <TouchableOpacity
              style={tw`border border-[#8F8F8F] rounded-full py-3 items-center`}
              onPress={() => router.push({
                pathname: '/common/[id]',
                params: { id: data?.data?.user?.id }
              })}
            >
              <Text
                style={tw`text-secondary_button_color text-lg font-roboto-600`}
              >
                Chat
              </Text>
            </TouchableOpacity>

            {data?.data?.expected_budget > 0 &&

              <TouchableOpacity
                style={tw` ${current_palan?.status === false ? 'bg-button_color/80' : 'bg-button_color'}  rounded-full py-3 items-center`}
                disabled={current_palan?.status === false}
                onPress={() =>
                  handleAccept()
                }
              >
                <Text style={tw`text-white text-lg font-roboto-600`}>
                  {acceptLoading ? "Please wait..." : "Accept budget"}
                </Text>
              </TouchableOpacity>
            }

            <TouchableOpacity
              style={tw` ${current_palan?.status === false ? 'bg-button_color/80' : 'bg-button_color'}  rounded-full py-3 items-center`}
              disabled={current_palan?.status === false}
              onPress={() =>
                handleModalOpen()
              }
            >
              <Text style={tw`text-white text-lg font-roboto-600`}>
                {moreLoading ? "Please wait..." : "Start Quote"}
              </Text>
            </TouchableOpacity>

          </View>
        </View>
      </ScrollView>

      {/* <StartQuoteModel id={id} setModalVisible={() => setModalVisible(!modalVisible)} modalVisible={modalVisible} /> */}


      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={tw`flex-1 items-center justify-center`}>
          <View
            style={tw`w-11/12 rounded-2xl bg-white p-6 shadow-2xl elevation-5`}
          >
            {/* Header */}
            <View style={tw`flex-row items-center justify-between mb-4`}>
              <Text style={tw`text-2xl text-title_color font-roboto-600`}>
                Add your bid price
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <SvgXml xml={IconsCloseRed} />
              </TouchableOpacity>
            </View>

            {/* Form */}
            <View style={tw`gap-4`}>
              {/* Bid Price */}
              <View style={tw`gap-2`}>
                <Text style={tw`text-base text-lavel_title_color font-roboto-500`}>
                  Add your bid price
                </Text>
                <View
                  style={tw`flex-row bg-input_bg_gray items-center py-2 px-3 rounded-lg`}
                >
                  <TextInput
                    style={tw`flex-1 text-base text-title_color`}
                    placeholder="$0.00"
                    keyboardType="numeric"
                    value={price !== null ? String(price) : ""}
                    onChangeText={(text) => {
                      const numericValue = text.replace(/[^0-9.]/g, "");
                      setPrice(numericValue ? parseFloat(numericValue) : null);
                    }}
                  />
                </View>
              </View>

              {/* Quote Outline */}
              <View style={tw`gap-2`}>
                <Text style={tw`text-base text-lavel_title_color font-roboto-500`}>
                  Quote Outline
                </Text>
                <View style={tw`bg-input_bg_gray rounded-lg h-32`}>
                  <TextInput
                    style={tw`p-4 w-full h-full text-base text-title_color`}
                    placeholder="Please enter all the details of your quote..."
                    multiline
                    numberOfLines={6}
                    textAlignVertical="top"
                    placeholderTextColor="#888"
                    selectionColor="#888"
                    value={outline}
                    onChangeText={setOutline}
                  />
                </View>
              </View>

              {/* Add Button */}
              <TouchableOpacity
                style={tw`bg-button_color ${isLoading ? 'bg-button_color/50' : 'bg-button_color'} rounded-full py-3 mt-2`}
                onPress={() => handleSubmit()}
                disabled={isLoading}
              >
                <Text
                  style={tw`text-white  text-center text-lg font-roboto-600`}
                >
                  {isLoading ? "Submitting..." : "Add"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>


    </Wrapper>
  );
};

// Reusable row component
const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <View style={tw`flex-row justify-between py-1`}>
    <Text style={tw`text-secondary_button_color font-roboto-400`}>{label}</Text>
    <Text style={tw`text-title_color text-sm font-roboto-500`}>{value}</Text>
  </View>
);

