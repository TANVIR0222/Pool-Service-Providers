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
}

const userData: UserProp[] = [
  {
    id: 1,
    name: "Olivia Martinez",
    image: "https://i.ibb.co/pvjqbkRZ/Rectangle-5043.png",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Liam Johnson",
    image: "https://i.ibb.co/zTkFM36k/Rectangle-5043-2.png",
    rating: 4.6,
  },
  {
    id: 3,
    name: "Emma Brown",
    image: "https://i.ibb.co/pvjqbkRZ/Rectangle-5043.png",
    rating: 4.9,
  },
  {
    id: 4,
    name: "Noah Smith",
    image: "https://i.ibb.co/zTkFM36k/Rectangle-5043-2.png",
    rating: 4.7,
  },
  {
    id: 5,
    name: "Ava Davis",
    image: "https://i.ibb.co/pvjqbkRZ/Rectangle-5043.png",
    rating: 4.5,
  },
  {
    id: 6,
    name: "William Wilson",
    image: "https://i.ibb.co/zTkFM36k/Rectangle-5043-2.png",
    rating: 4.4,
  },
  {
    id: 7,
    name: "Sophia Moore",
    image: "https://i.ibb.co/pvjqbkRZ/Rectangle-5043.png",
    rating: 4.8,
  },
  {
    id: 8,
    name: "James Taylor",
    image: "https://i.ibb.co/zTkFM36k/Rectangle-5043-2.png",
    rating: 4.7,
  },
  {
    id: 9,
    name: "Isabella Anderson",
    image: "https://i.ibb.co/pvjqbkRZ/Rectangle-5043.png",
    rating: 4.9,
  },
  {
    id: 10,
    name: "Benjamin Thomas",
    image: "https://i.ibb.co/zTkFM36k/Rectangle-5043-2.png",
    rating: 4.6,
  },
];

const AllProviders = () => {
  const renderItem = ({ item }: { item: UserProp }) => (
    <TouchableOpacity
      key={item?.id}
      style={tw`rounded-2xl bg-input_bg_gray my-2`}
      onPress={() =>
        router.push({
          pathname: `/home-owner/home-view/[id]`,
          params: { id: item?.id },
        })
      }
    >
      <View style={tw`flex-row items-center justify-between p-4`}>
        {/* Left side: Image + Name + Description */}
        <View style={tw`flex-row items-center gap-2`}>
          <Image
            source={{ uri: item?.image }}
            style={tw`w-12 h-12 rounded-2`}
          />
          <View>
            <Text style={tw`text-lg text-title_color font-roboto-600`}>
              {item.name}
            </Text>
            {/* <Text
              style={tw`text-sm text-secondary_button_color font-roboto-400`}
            >
              {item.des.slice(0, 30)}...
            </Text> */}
          </View>
        </View>

        {/* Right side: Price */}
        <View style={tw` flex-row items-center gap-2 `}>
          <SvgXml xml={IconsStar} />

          <Text style={tw`text-base text-title_color font-roboto-700`}>
            {item.rating}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={tw`gap-3 flex-1 my-3`}>
      <View style={tw`flex-row items-center justify-between`}></View>

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

export default AllProviders;
