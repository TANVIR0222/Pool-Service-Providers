import BackButton from "@/src/components/ui/BackButton";
import Wrapper from "@/src/components/Wrapper";
import tw from "@/src/lib/tailwind";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function ViewQuot() {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const params = useLocalSearchParams<{ id: string }>();

  return (
    <Wrapper>
      <BackButton title="Back" />

      <ScrollView
        contentContainerStyle={tw`flex-1`}
        showsVerticalScrollIndicator={false}
      >
        {/* Image */}
        <Image
          source={require("@/assets/images/rectangle-banner.png")}
          style={tw`w-full h-40 rounded-xl`}
          resizeMode="cover"
        />

        <View style={tw`flex-1 justify-between`}>
          {/* Description */}
          <View style={tw`py-4`}>
            <Text style={tw`text-base text-title_color font-roboto-600 mb-4`}>
              I need a cleaner to clean my swimming pool which are 34 meters
              long.
            </Text>

            <View style={tw`flex-col gap-7`}>
              <View>
                <InfoRow label="Category" value="Pool Cleaning" />
                <InfoRow label="Property type" value="Commercial Property" />
                <InfoRow label="Service date" value="12/04/2026" />
                <InfoRow label="Service time" value="02:00 PM" />
                <InfoRow label="Address" value="3/2 Los Angeles, USA" />
                <InfoRow label="Expected budget" value="$7346.00" />
              </View>

              {/* Owner Info */}
              <View style={tw`flex-col gap-6`}>
                <View style={tw`flex-col gap-4`}>
                  <Text style={tw`text-xl text-title_color font-roboto-600`}>
                    Owners information
                  </Text>
                  <View style={tw`flex-row items-center gap-3`}>
                    <Image
                      source={{
                        uri: "https://i.ibb.co/9LzTwfc/Ellipse-21.png",
                      }}
                      style={tw`w-10 h-10 rounded-full`}
                    />
                    <Text
                      style={tw`text-base text-secondary_button_color font-roboto-500`}
                    >
                      Julian Alvarej
                    </Text>
                  </View>
                </View>

                <View
                  style={tw` p-4 rounded-lg bg-[#A7F3D0] flex-row justify-between`}
                >
                  <View>
                    <Text style={tw`text-base  text-[#000] font-roboto-700`}>
                      Basic Plan
                    </Text>
                    <Text
                      style={tw`text-sm text-secondary_button_color font-roboto-400`}
                    >
                      You have remains 5 quotes.
                    </Text>
                  </View>

                  <View>
                    <TouchableOpacity
                      style={tw` bg-white rounded-full  p-2 items-center`}
                    >
                      <Text style={tw`text-[#003B73] text-sm font-roboto-600`}>
                        See all plans
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
          {/* Chat & Quote Buttons - Fixed bottom */}
          <View style={tw` mb-5  flex-col gap-2`}>
            <TouchableOpacity
              style={tw` border border-[#8F8F8F] rounded-full py-3 items-center`}
            >
              <Text
                style={tw`text-secondary_button_color text-lg font-roboto-600`}
              >
                Chat
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={tw` bg-button_color rounded-full py-3 items-center`}
              onPress={() =>
                router.push("/business-provider/already-have-plan/biddingList")
              }
            >
              <Text style={tw`text-white text-lg font-roboto-600`}>
                Start quote
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Wrapper>
  );
}

// Reusable row component
const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <View style={tw`flex-row justify-between py-1`}>
    <Text style={tw`text-secondary_button_color font-roboto-400`}>{label}</Text>
    <Text style={tw`text-title_color text-sm font-roboto-500`}>{value}</Text>
  </View>
);
