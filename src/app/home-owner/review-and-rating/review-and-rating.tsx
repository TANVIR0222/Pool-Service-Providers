import { IconsActiveStar, IconsStars } from "@/assets/icons";
import BackButton from "@/src/components/ui/BackButton";
import Wrapper from "@/src/components/Wrapper";
import tw from "@/src/lib/tailwind";
import { useUserReviewPostMutation } from "@/src/redux/reviewApi/reviewApi";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";



export default function ReviewAndRating() {
  const [rating, setRating] = useState<number>(0);
  const [compliment, setCompliment] = useState<string>("");

  const { id, quote_id } = useLocalSearchParams<{ id: string; quote_id: string }>()

  const handleRatingPress = (value: number) => setRating(value);


  const [reviewPost, { isLoading }] = useUserReviewPostMutation();




  const handleSubmit = async () => {

    try {
      const res = await reviewPost({ provider_id: id, quote_id: quote_id, rating, compliment }).unwrap();
      if (res?.status) {
        setRating(0);
        setCompliment("");
        router.replace('/home-owner/(drawer)/(tabs)')
      }

    } catch (error) {
      console.log(error);
    }

  };

  return (
    <Wrapper>
      <BackButton title="Review & rating" />
      <View style={tw` flex-1`}>
        <View style={tw` flex-col gap-10`}>
          <View style={tw` flex-col gap-6`}>
            {/* Rating Section */}
            <View style={tw` flex-col gap-4`}>
              <Text style={tw`text-base font-roboto-600 text-title_color `}>
                How was the service?
              </Text>
              <View style={tw`flex-row items-center gap-3 mb-4`}>
                {[1, 2, 3, 4, 5].map((value) => (
                  <TouchableOpacity
                    key={value}
                    onPress={() => handleRatingPress(value)}
                    style={tw`flex-row items-center border border-gray-300 px-3 py-1 rounded-md bg-input_bg_gray`}
                  >
                    <SvgXml
                      xml={rating >= value ? IconsActiveStar : IconsStars}
                    />
                    <Text style={tw`ml-1 text-base text-black`}>{value}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Compliment Section */}
            <View style={tw` flex-col gap-4`}>
              <Text style={tw`text-base font-roboto-600 text-title_color `}>
                Any compliment?
              </Text>
              <TextInput
                style={tw`bg-input_bg_gray rounded-lg p-3 h-28 text-base text-gray-700`}
                placeholder="Extra sentence for the service providers...."
                placeholderTextColor="#888"
                multiline
                numberOfLines={5}
                textAlignVertical="top"
                value={compliment}
                onChangeText={setCompliment}
              />
            </View>
          </View>

          {/* Submit Button */}
          <View>
            <TouchableOpacity
              onPress={handleSubmit}
              style={tw`bg-button_color mt-6 py-3 rounded-full items-center`}
            >
              <Text style={tw`text-white text-base font-roboto-600`}>
                {isLoading ? "Submiting" : "Submit"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Wrapper>
  );
}
