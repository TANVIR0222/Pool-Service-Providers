import { IconsNoteSure } from "@/assets/icons";
import BackButton from "@/src/components/ui/BackButton";
import Wrapper from "@/src/components/Wrapper";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

export default function FinalBidding() {


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

                {/* Bid Price Section */}
                <View style={tw`flex-col gap-2`}>
                  <Text style={tw`text-xl text-[#0EA5E9] font-roboto-500`}>
                    Your asking bid price: $586.00
                  </Text>

                  {/* Info note */}
                  <View style={tw`flex-row  items-center justify-start gap-2`}>
                    <SvgXml xml={IconsNoteSure} />
                    <Text
                      style={tw`text-sm text-secondary_button_color font-roboto-500`}
                    >
                      {`After accept by home owners you can start the\nservice.`}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          {/* Chat & Quote Buttons - Fixed bottom */}
          <View style={tw` mb-5  flex-col gap-2`}>
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
              onPress={() =>
                router.push("/business-provider/(drawer)/(tabs)/view-quotes")
              }
            >
              <Text style={tw`text-white text-lg font-roboto-600`}>
                View the quotes
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
