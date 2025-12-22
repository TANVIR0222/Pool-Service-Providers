import { IconsStar } from "@/assets/icons";
import tw from "@/src/lib/tailwind";
import { useGetTopProviderQuery } from "@/src/redux/topProvidersApi/topProvidersApi";
import { makeImage } from "@/src/utils/image_converter";
import { router } from "expo-router";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import GlobalLoading from "../GlobalLoading";


const TopProviders = () => {


  const { data, isLoading } = useGetTopProviderQuery();

  return isLoading ? <GlobalLoading /> : (
    <View style={tw`gap-3 flex-1 my-3`}>
      <View style={tw`flex-row items-center justify-between`}>
        <Text style={tw`text-title_color text-xl font-roboto-600`}>
          Top Providers
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/home-owner/home-view/top-providers")}
        >
          <Text style={tw`text-button_color underline text-xl font-roboto-600`}>
            See all
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={data?.data}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.provider_id.toString()}
        renderItem={(item) => {

          return (
            <TouchableOpacity
              style={tw`rounded-2xl bg-input_bg_gray my-2`}
              onPress={() =>
                router.push({
                  pathname: `/home-owner/view-provider`,
                  params: { id: item?.item?.provider?.id },
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
          )
        }}
        scrollEnabled={false}
      />
    </View>
  );
};

export default TopProviders;
