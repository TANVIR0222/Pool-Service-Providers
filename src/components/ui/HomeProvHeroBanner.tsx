import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import React from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";

interface SearchProps {
  provider_user: string;
}

const HomeProvHeroBanner = ({ provider_user }: SearchProps) => {
  const { width } = Dimensions.get("window");


  // route destination dynamic based on provider_user
  const destinations: "/home-owner/search" | "/business-provider/search" =
    provider_user === "provider_user"
      ? "/home-owner/search"
      : "/business-provider/search";

  return (
    <View style={tw`items-center px-4`}>
      <View style={tw`relative`}>
        <Image
          source={require("@/assets/images/hero-banner-images.png")}
          style={[
            tw`h-[199px] rounded-xl`,
            { width: width > 400 ? 360 : 340 }, // breakpoint logic
          ]}
          resizeMode="cover"
        />
        <Text
          style={tw`absolute text-2xl top-4 left-4 text-white font-roboto-600`}
        >
          {"Find Trusted Pool \nService \nProfessionals..."}
        </Text>
        <TouchableOpacity
          onPress={() => router.push(destinations)}
          style={tw`bg-[#00000080] p-4 left-4 w-48 bottom-4 rounded-full absolute`}
        >
          <Text style={tw`text-center text-white font-roboto-500`}>
            Get Quotes
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeProvHeroBanner;
