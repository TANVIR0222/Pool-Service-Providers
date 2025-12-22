import { IconsStar } from "@/assets/icons";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

interface UserProp {
  id: number;
  name: string;
  image: string;
  rating: number;
  date: string;
  doc: string;
}

const userData: UserProp[] = [
  {
    id: 1,
    name: "Maxwell",
    image: "https://i.ibb.co/pvjqbkRZ/Rectangle-5043.png",
    date: "2022-01-01",
    rating: 4.8,
    doc: "From the first call to the final result, everything was smooth and stress-free. The team was knowledgeable, neat & clean respectful of my space. Truly impressed and highly recommend!",
  },
  {
    id: 2,
    name: "Liam Johnson",
    image: "https://i.ibb.co/zTkFM36k/Rectangle-5043-2.png",
    rating: 4.6,
    date: "2022-01-02",
    doc: "From the first call to the final result, everything was smooth and stress-free. The team was knowledgeable, neat & clean respectful of my space. Truly impressed and highly recommend!",
  },
  {
    id: 3,
    name: "Emma Brown",
    image: "https://i.ibb.co/pvjqbkRZ/Rectangle-5043.png",
    rating: 4.9,
    date: "2022-01-03",
    doc: "From the first call to the final result, everything was smooth and stress-free. The team was knowledgeable, neat & clean respectful of my space. Truly impressed and highly recommend!",
  },
  {
    id: 4,
    name: "Noah Smith",
    image: "https://i.ibb.co/zTkFM36k/Rectangle-5043-2.png",
    rating: 4.7,
    date: "2022-01-04",
    doc: "From the first call to the final result, everything was smooth and stress-free. The team was knowledgeable, neat & clean respectful of my space. Truly impressed and highly recommend!",
  },
  {
    id: 5,
    name: "Emma Brown",
    image: "https://i.ibb.co/pvjqbkRZ/Rectangle-5043.png",
    rating: 4.9,
    date: "2022-01-03",
    doc: "From the first call to the final result, everything was smooth and stress-free. The team was knowledgeable, neat & clean respectful of my space. Truly impressed and highly recommend!",
  },
];

const BiddingListProviders = () => {
  const renderItem = ({ item }: { item: UserProp }) => (
    <TouchableOpacity
      key={item?.id}
      style={tw`  my-2`}
      onPress={() =>
        router.push({
          pathname: `/home-owner/badding/[id]`,
          params: { id: item?.id },
        })
      }
    >
      <View
        style={tw`flex-row items-start bg-[#ECF1F6] rounded-2xl justify-between p-2`}
      >
        {/* Left side: Image + Name + Description */}
        <View style={tw`flex-col gap-4`}>
          <View style={tw`flex-row  justify-between gap-1 items-start`}>
            <View style={tw`flex-row gap-2 w-[15%] `}>
              {/* Profile Image */}
              <Image
                source={{ uri: item?.image }}
                style={tw`w-12 h-12 rounded-full `}
              />
            </View>

            <View style={tw` flex-col  gap-1 w-[60%] `}>
              {/* Name and Date */}
              <View style={tw`justify-center`}>
                <Text style={tw`text-lg text-sub_title_color font-roboto-600`}>
                  {item.name}
                </Text>
              </View>
              <View>
                <Text style={tw`text-base text-[#696969] font-roboto-400`}>
                  {item.doc.slice(0, 80)}
                </Text>
              </View>
            </View>

            <View style={tw`flex-col items-start gap-1 w-[25%]`}>
              <Text style={tw`text-base text-button_color font-roboto-700`}>
                $3999.50
              </Text>
              <View style={tw`flex-row items-center gap-1 `}>
                <SvgXml xml={IconsStar} />
                <Text style={tw`text-sm text-title_color font-roboto-500`}>
                  {item.rating}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Right side: Price */}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={tw`gap-3 flex-1 `}>
      <FlatList
        data={userData}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        // scrollEnabled={false}
      />
    </View>
  );
};

export default BiddingListProviders;
