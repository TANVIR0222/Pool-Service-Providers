import BackButton from "@/src/components/ui/BackButton";
import Wrapper from "@/src/components/Wrapper";
import tw from "@/src/lib/tailwind";
import { useGetAllCategoryQuery } from "@/src/redux/categoryWiseQuotesApi/categoryHomeApi";
import { makeImage } from "@/src/utils/image_converter";
import { width } from "@/src/utils/utils";
import { router } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";


export default function AllCategory() {

  const { data } = useGetAllCategoryQuery();



  return (
    <Wrapper>
      <BackButton title={"Sea all"} />
      <View style={tw`justify-center items-center flex-1  `}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* <Image
            source={require("@/assets/images/Frame.png")}
            style={[tw` rounded-xl`, { width: width > 400 ? 360 : 340 },]}
          // resizeMode="cover"
          // onLoadEnd={() => setLoading(false)}
          /> */}
          <View>
            <Image
              source={require("@/assets/images/Frame 77.png")}
              style={[
                tw`h-[150px] rounded-xl`,
                { width: width > 400 ? 360 : 320 }, // breakpoint logic
              ]}
              resizeMode="cover"
            />
            <Text
              style={tw`absolute text-2xl top-4 left-4 text-white font-roboto-600`}
            >
              {"Pool Valet service \nfeatures"}
            </Text>
            <Text
              style={tw`absolute text-sm bottom-5 left-4 text-white font-roboto-600`}
            >
              {"You can search quotes by specific categories \nwhich one you do better."}

            </Text>
          </View>
          <View style={tw`flex-row flex-wrap items-center justify-around `}>
            {data?.data?.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[tw` border border-[#F1F1F1] flex-col  gap-2 my-2  items-center rounded-2xl p-4`, { width: width > 400 ? 160 : 140 },]}
                onPress={() =>
                  router.push({
                    pathname: "/home-owner/(drawer)/(tabs)/add",
                    params: { category: item?.name }
                  })
                }
              >
                <Image
                  source={{ uri: makeImage(item?.icon) }}
                  style={tw`h-12 w-12`}
                />
                <Text style={tw`text-center text-title_color font-roboto-400`}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </Wrapper>
  );
}
