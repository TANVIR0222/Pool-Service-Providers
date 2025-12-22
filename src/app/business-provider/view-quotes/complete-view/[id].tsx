
import { IconsStar } from "@/assets/icons";
import GlobalLoading from "@/src/components/GlobalLoading";
import BackButton from "@/src/components/ui/BackButton";
import MainSlider from "@/src/components/ui/MainSlider";
import VideoScreen from "@/src/components/VideoScreenAll";
import Wrapper from "@/src/components/Wrapper";
import tw from "@/src/lib/tailwind";
import { useGetProviderRatingQuery, useViewSingleBrowseCodeQuery } from "@/src/redux/myServicesApi/myServicesApi";
import { makeImage } from "@/src/utils/image_converter";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

const CompleteViewScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading } = useViewSingleBrowseCodeQuery({ quote_id: id });

  const quote = data?.data; // shorthand for easier access

  const { data: ratingData } = useGetProviderRatingQuery({ quote_id: id })





  if (!quote) {
    return (
      <Wrapper>
        <BackButton title="Back" />
        <View style={tw`flex-1 justify-center items-center`}>
          <Text style={tw`text-base text-red-500`}>No data found.</Text>
        </View>
      </Wrapper>
    );
  }



  return isLoading ? <GlobalLoading /> : (
    <Wrapper>
      <BackButton title="Back" />

      <ScrollView
        contentContainerStyle={tw`flex-1`}
        showsVerticalScrollIndicator={false}
      >
        {/* Main Slider */}

        {
          quote.photos ? (
            <MainSlider images={quote.photos} />
          ) : data?.data?.video ? (
            <VideoScreen source={quote.photos} />
          ) : null
        }

        <View style={tw`flex-1 justify-between`}>
          {/* Description */}
          <View style={tw`py-4`}>
            <Text style={tw`text-base text-title_color font-roboto-600 mb-4`}>
              {quote.describe_issue || "No description provided."}
            </Text>

            <View style={tw`flex-col gap-7`}>
              <View>
                <InfoRow label="Category" value={quote.service || "N/A"} />
                <InfoRow label="Property type" value={quote.property_type || "N/A"} />
                <InfoRow label="Service date" value={quote.date || "N/A"} />
                <InfoRow label="Address" value={quote.address || "N/A"} />
                {quote.expected_budget && quote.expected_budget > 0 && (
                  <InfoRow
                    label="Expected budget"
                    value={`$${quote.expected_budget}`}
                  />
                )}
              </View>

              {data?.data?.is_paid === 0 ?
                <View style={tw`flex-col gap-6`}>
                  <Text style={tw`text-xl text-title_color font-roboto-600`}>
                    Owner's information
                  </Text>
                  <View style={tw`flex-row justify-between items-end`}>
                    <View style={tw`flex-col gap-4`}>
                      <View style={tw`flex-row items-center gap-3`}>
                        <Image
                          source={{
                            uri: makeImage(quote.user?.avatar),
                          }}
                          style={tw`w-10 h-10 rounded-full`}
                        />
                        <Text style={tw`text-base text-secondary_button_color font-roboto-500`}>
                          {quote.user?.full_name || "Unknown User"}
                        </Text>
                      </View>
                    </View>
                    <View>
                      <TouchableOpacity
                        style={tw`bg-button_color rounded-full p-2 items-center`}
                        onPress={() => router.push({
                          pathname: '/common/[id]',
                          params: { id: data?.data?.user?.id }
                        })}
                      >
                        <Text style={tw`text-white text-sm font-roboto-600`}>
                          Send message
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={tw`flex-col gap-2`}>
                    <Text style={tw`text-xl text-[#0EA5E9] font-roboto-500`}>
                      Payment not clear yet.
                    </Text>
                  </View>
                </View>
                : <View style={tw`flex-col gap-6`}>
                  <Text style={tw`text-xl text-title_color font-roboto-600`}>
                    Home owners rating
                  </Text>
                  <View style={tw`flex-row  w-14 justify-center rounded items-center gap-1 bg-[#FFC1071A]`}>
                    <View style={tw``}>
                      <SvgXml xml={IconsStar} />
                    </View>
                    <Text style={tw`text-xl text-[#FFC107] font-roboto-500`}>
                      {ratingData?.data?.rating}
                    </Text>

                  </View>

                  <View style={tw`flex-col gap-2`}>
                    <Text style={tw`text-xl text-title_color  font-roboto-500`}>
                      Additional sentence
                    </Text>
                    <Text style={tw`text-base text-sub_title_color  font-roboto-500`}>
                      {ratingData?.data?.compliment}
                    </Text>
                  </View>
                </View>}
            </View>
          </View>
        </View>
      </ScrollView>
    </Wrapper>
  );
};

// Reusable row component
const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <View style={tw`flex-row justify-between py-1`}>
    <Text style={tw`text-secondary_button_color font-roboto-400`}>{label}</Text>
    <Text style={tw`text-title_color text-sm font-roboto-500`}>{value}</Text>
  </View>
);

export default CompleteViewScreen;

