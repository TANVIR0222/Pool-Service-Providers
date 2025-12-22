import { IconsStar } from "@/assets/icons";
import tw from "@/src/lib/tailwind";
import { formatDate } from "@/src/utils/formatDate";
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
];

const TopProviderProfile = () => {
  const renderItem = ({ item }: { item: UserProp }) => (
    <TouchableOpacity
      key={item?.id}
      style={tw`rounded-2xl`}
      // onPress={() =>
      //   router.push({
      //     pathname: `/home-owner/home-view/[id]`,
      //     params: { id: item?.id },
      //   })
      // }
    >
      <View style={tw`flex-row items-center justify-between p-4`}>
        {/* Left side: Image + Name + Description */}
        <View style={tw`flex-col gap-4`}>
          <View style={tw`flex-row  justify-between items-center`}>
            <View style={tw`flex-row gap-2`}>
              {/* Profile Image */}
              <Image
                source={{ uri: item?.image }}
                style={tw`w-12 h-12 rounded-full `}
              />

              {/* Name and Date */}
              <View style={tw`justify-center`}>
                <Text style={tw`text-lg text-sub_title_color font-roboto-600`}>
                  {item.name}
                </Text>
                <Text style={tw`text-sm text-sub_title_color font-roboto-400`}>
                  {formatDate(item?.date)}
                </Text>
              </View>
            </View>

            <View style={tw` flex-row items-center gap-2 `}>
              <SvgXml xml={IconsStar} />

              <Text style={tw`text-base text-title_color font-roboto-700`}>
                {item.rating}
              </Text>
            </View>
          </View>

          {/* Document Text */}
          <Text style={tw`text-base text-[#696969] font-roboto-400`}>
            {item.doc}
          </Text>
        </View>

        {/* Right side: Price */}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={tw`gap-2 flex-1 `}>
      <FlatList
        data={userData}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={false}
      />
    </View>
  );
};

export default TopProviderProfile;
