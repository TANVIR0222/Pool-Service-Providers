import { IconsStar } from "@/assets/icons";
import GlobalLoading from "@/src/components/GlobalLoading";
import BackButton from "@/src/components/ui/BackButton";
import Wrapper from "@/src/components/Wrapper";
import tw from "@/src/lib/tailwind";
import { useGetTopProviderQuery } from "@/src/redux/topProvidersApi/topProvidersApi";
import { makeImage } from "@/src/utils/image_converter";
import { width } from "@/src/utils/utils";
import { router } from "expo-router";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

export default function TopProviders() {


  const { data, isLoading } = useGetTopProviderQuery();



  return isLoading ? <GlobalLoading /> : (
    <Wrapper>
      <BackButton title={"Back"} />

      <View style={tw` flex-col gap-2.5 justify-center`}>
        <Image
          source={require("@/assets/images/Providers.png")}
          style={[
            tw`h-[150px] rounded-xl`,
            { width: width > 400 ? 360 : 320 }, // breakpoint logic
          ]} resizeMode="cover"
        />
        <View style={tw`absolute flex-col gap-1 top-1/4 left-6 w-full h-full`}>
          <Text style={tw` text-2xl font-roboto-700 text-white`}>
            {"List of Top Rated \nProviders."}
          </Text>
          <Text style={tw` text-sm font-roboto-500 text-white`}>
            Select your particular option to get service
          </Text>
        </View>
      </View>
      <View style={tw` py-4 `}>
        <FlatList
          data={data?.data}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.provider_id.toString()}
          renderItem={(item) => (
            <TouchableOpacity
              style={tw`rounded-2xl bg-input_bg_gray my-2`}
              onPress={() =>
                router.push({
                  pathname: `/home-owner/view-provider`,
                  params: { id: item?.item?.provider_id },
                })
              }
            >
              <View style={tw`flex-row items-center justify-between p-4`}>
                {/* Left side: Image + Name + Description */}
                <View style={tw`flex-row items-center gap-2`}>
                  <Image
                    source={{ uri: makeImage(item?.item?.provider?.avatar) }}
                    style={tw`w-12 h-12 rounded-2`}
                  />
                  <View>
                    <Text style={tw`text-lg text-title_color font-roboto-600`}>
                      {item?.item?.provider?.full_name}
                    </Text>
                  </View>
                </View>

                {/* Right side: Price */}
                <View style={tw` flex-row items-center gap-2 `}>
                  <SvgXml xml={IconsStar} />

                  <Text style={tw`text-base text-title_color font-roboto-700`}>
                    {item?.item?.average_rating}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          scrollEnabled={false}
        />
      </View>

    </Wrapper>
  );
}
