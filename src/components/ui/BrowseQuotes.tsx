import tw from "@/src/lib/tailwind";
import { makeImage } from "@/src/utils/image_converter";
import { router } from "expo-router";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

interface QuoteItem {
  id: number | string;
  image?: string;
  full_name?: string;
  average_rating?: number;
  avatar: string | null

}

interface Props {
  data: QuoteItem[];
}

const BrowseQuotes: React.FC<Props> = ({ data }) => {


  return (
    <View style={tw`gap-3 flex-1 my-3`}>
      <FlatList
        data={data}
        renderItem={({ item }) => {

          return (
            <TouchableOpacity
              style={tw`rounded-2xl bg-input_bg_gray my-2`}
              onPress={() =>
                // router.push(`/business-provider/view-user-quotes/${item?.id}`)
                router.push({
                  pathname: `/home-owner/home-view/[id]`,
                  params: { id: item?.id },
                })
              }
            >
              <View style={tw`flex-row items-center justify-between p-4`}>
                {/* Left side: Image + Name */}
                <View style={tw`flex-row items-center gap-2`}>
                  {item.image ? (
                    <Image
                      source={{ uri: makeImage(item?.avatar) }}
                      style={tw`w-12 h-12 rounded-2`}
                    />
                  ) : (
                    <View style={tw`w-12 h-12 rounded-2 bg-gray-300`} />
                  )}
                  <View>
                    <Text style={tw`text-lg text-title_color font-roboto-600`}>
                      {item?.full_name || "Unknown"}
                    </Text>
                  </View>
                </View>

                {/* Right side: Price */}
                <Text style={tw`text-lg text-button_color font-roboto-700`}>
                  {item.average_rating ?? "Added rating "}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default BrowseQuotes;
