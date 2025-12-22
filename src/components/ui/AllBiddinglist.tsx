import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

type UserProp = {
  name: string;
  image: string;
  id: number;
  price: number;
  des: string;
};

const userData: UserProp[] = [
  {
    id: 1,
    name: "Olivia Martinez",
    image: "https://i.ibb.co/pvjqbkRZ/Rectangle-5043.png",
    price: 5423.0,
    des: "I need pool cleaner for clean....",
  },
  {
    id: 2,
    name: "Liam Johnson",
    image: "https://i.ibb.co/zTkFM36k/Rectangle-5043-2.png",
    price: 5423.0,
    des: "Looking for someone to maintain my pool regularly.",
  },
  {
    id: 3,
    name: "Emma Brown",
    image: "https://i.ibb.co/pvjqbkRZ/Rectangle-5043.png",
    price: 5423.0,
    des: "Pool cleaning service required once a week.",
  },
  {
    id: 4,
    name: "Noah Smith",
    image: "https://i.ibb.co/zTkFM36k/Rectangle-5043-2.png",
    price: 5423.0,
    des: "Urgently need pool cleaner for a party tomorrow.",
  },
  {
    id: 5,
    name: "Ava Davis",
    image: "https://i.ibb.co/pvjqbkRZ/Rectangle-5043.png",
    price: 5423.0,
    des: "Clean the pool and check the filter system.",
  },
  {
    id: 6,
    name: "William Wilson",
    image: "https://i.ibb.co/zTkFM36k/Rectangle-5043-2.png",
    price: 5423.0,
    des: "Monthly pool cleaning with chemical balance check.",
  },
  {
    id: 7,
    name: "Sophia Moore",
    image: "https://i.ibb.co/pvjqbkRZ/Rectangle-5043.png",
    price: 5423.0,
    des: "Need cleaning and leaf removal service.",
  },
  {
    id: 8,
    name: "William Wilson",
    image: "https://i.ibb.co/zTkFM36k/Rectangle-5043-2.png",
    price: 5423.0,
    des: "Monthly pool cleaning with chemical balance check.",
  },
];
const AllBiddinglist = () => {
  const renderItem = ({ item }: { item: UserProp }) => (
    <TouchableOpacity
      key={item?.id}
      style={tw`rounded-2xl bg-input_bg_gray my-1`}
      onPress={() =>
        router.push(`/business-provider/view-user-quotes/${item?.id}`)
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
            <Text
              style={tw`text-sm text-secondary_button_color font-roboto-400`}
            >
              {item.des.slice(0, 30)}...
            </Text>
          </View>
        </View>

        {/* Right side: Price */}
        <Text style={tw`text-lg text-button_color font-roboto-700`}>
          ${item.price}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={tw`gap-3 flex-1 my-3`}>
      <FlatList
        data={userData}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default AllBiddinglist;
