import tw from "@/src/lib/tailwind";
import { useGetAllCategoryQuery } from "@/src/redux/categoryWiseQuotesApi/categoryHomeApi";
import { makeImage } from "@/src/utils/image_converter";
import { router } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";


const HomePrevFeatures = () => {

  const { data } = useGetAllCategoryQuery();


  return (
    <View style={tw`gap-3 my-3`}>
      {/* Header */}
      <View style={tw`flex-row items-center justify-between`}>
        <Text style={tw`text-title_color text-xl font-roboto-600`}>
          Features
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/home-owner/home-view/all-category")}
        >
          <Text style={tw`text-button_color underline text-xl font-roboto-600`}>
            See all
          </Text>
        </TouchableOpacity>
      </View>

      {/* Categories List */}
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={tw`flex-row gap-3.8`}>
          {data?.data?.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={tw` border border-[#F1F1F1] flex-col gap-2 items-center rounded-2xl p-4`}
              onPress={() =>
                router.push({
                  pathname: "/home-owner/(drawer)/(tabs)/add",
                  params: { category: item?.name }, // e.g. "cleaning"
                })
              }
            >
              <Image source={{ uri: makeImage(item?.icon) }} style={tw`h-12 w-12`} />
              <Text style={tw`text-center text-title_color font-roboto-400`}>
                {item?.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default HomePrevFeatures;
