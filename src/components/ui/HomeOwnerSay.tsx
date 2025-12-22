import { IconsStar } from "@/assets/icons";
import { Review } from "@/src/lib/global-type";
import tw from "@/src/lib/tailwind";
import { formatDate } from "@/src/utils/formatDate";
import React from "react";
import { FlatList, Image, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";

type Props = {
  reviews: Review[];
  onPress?: () => void;  // Optional
};

const HomeOwnerSay = ({ reviews }: Props) => {

  return (
    <View style={tw`gap-3  flex-1`}>
      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          if (!item) {
            return <Text>Not Available</Text>;
          }

          return (
            <View style={tw`rounded-2xl  my-2 bg-white shadow-md m-1 p-4`}>
              <View style={tw`flex-row items-center justify-between`}>
                {/* Left side: Image + Name + Date */}
                <View style={tw`flex-row items-center flex-1 gap-4`}>
                  <Image
                    source={{ uri: item.user?.avatar }}
                    style={tw`w-12 h-12 rounded-full`}
                  />
                  <View>
                    <Text style={tw`text-lg text-sub_title_color font-roboto-600`}>
                      {item.user?.full_name}
                    </Text>
                    <Text style={tw`text-sm text-sub_title_color font-roboto-400`}>
                      {formatDate(item.user?.created_at)}
                    </Text>
                  </View>
                </View>

                {/* Right side: Rating */}
                <View style={tw`flex-row items-center gap-2`}>
                  <SvgXml xml={IconsStar} width={16} height={16} />
                  <Text style={tw`text-base text-title_color font-roboto-700`}>
                    {item.rating}
                  </Text>
                </View>
              </View>

              {/* Compliment / Review Text */}
              <Text style={tw`text-base text-[#696969] font-roboto-400 mt-3`}>
                {item.compliment}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default HomeOwnerSay;
