import { IconsNoteSure } from "@/assets/icons";
import GlobalLoading from "@/src/components/GlobalLoading";
import BackButton from "@/src/components/ui/BackButton";
import MainSlider from "@/src/components/ui/MainSlider";
import Wrapper from "@/src/components/Wrapper";
import tw from "@/src/lib/tailwind";
import { useCancelCompleteProviderMutation, useViewSingleBrowseCodeQuery } from "@/src/redux/myServicesApi/myServicesApi";
import { makeImage } from "@/src/utils/image_converter";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

const ProcessViewScreen = () => {
  const { id, bid_id } = useLocalSearchParams<{ id: string; bid_id: string }>();
  const { data, isLoading } = useViewSingleBrowseCodeQuery({ quote_id: id });

  const [bids_complete] = useCancelCompleteProviderMutation()



  const handleComlete = async () => {

    try {

      await bids_complete({ bid_id: bid_id }).unwrap()
      router.replace('/business-provider/(drawer)/(tabs)/view-quotes')
    } catch (error) {
      console.log(error);

    }

  }


  return isLoading ? <GlobalLoading /> : (
    <Wrapper>
      <BackButton title="Back" />

      <ScrollView
        style={tw`flex-1`}
        contentContainerStyle={tw` pb-3`} // 
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled
      >
        {/* Image Slider */}
        <MainSlider
          images={data?.data?.photos}
        />

        <View style={tw`flex-1 justify-between`}>
          {/* Description */}
          <View style={tw`py-4`}>
            <Text style={tw`text-base text-title_color font-roboto-600 mb-4`}>
              {data?.data?.describe_issue}
            </Text>

            <View style={tw`flex-col gap-7`}>
              <View>
                <InfoRow label="Category" value={data?.data.service} />
                <InfoRow label="Property type" value={data?.data.property_type} />
                <InfoRow label="Service date" value={data?.data.date} />
                <InfoRow label="Address" value={data?.data.address} />
                {data?.data.expected_budget > 0 && <InfoRow
                  label="Expected budget"
                  value={data?.data.expected_budget && `$${data?.data?.expected_budget}`}
                />}
              </View>

              {/* Owner Info */}
              <View style={tw`flex-col gap-6`}>
                <Text style={tw`text-xl text-title_color font-roboto-600`}>
                  Owners information
                </Text>
                <View style={tw` flex-row justify-between items-center `}>
                  <View style={tw`flex-col gap-4`}>
                    <View style={tw`flex-row items-center gap-3`}>
                      <Image
                        source={{
                          uri: makeImage(data.data.user?.avatar)
                        }}
                        style={tw`w-10 h-10 rounded-full`}
                      />
                      <Text
                        style={tw`text-base text-secondary_button_color font-roboto-500`}
                      >
                        {data.data.user?.full_name || 'Unknown User'}
                      </Text>
                    </View>
                  </View>
                  <View>
                    <TouchableOpacity
                      style={tw` bg-button_color rounded-full p-2 items-center`}
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

                {/* Bid Price Section */}
                <View style={tw`flex-col gap-2`}>
                  <Text style={tw`text-xl text-[#0EA5E9] font-roboto-500`}>
                    Home owner accept your bid request.
                  </Text>

                  {/* Info note */}
                  <View style={tw`flex-row  items-center justify-start gap-2`}>
                    <SvgXml xml={IconsNoteSure} />
                    <Text
                      style={tw`text-sm text-secondary_button_color font-roboto-500`}
                    >
                      {`After complete the service mark as complete.`}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          {/* Chat & Quote Buttons - Fixed bottom */}
          <View style={tw` my-5  flex-col gap-2`}>
            <TouchableOpacity
              style={tw` bg-button_color rounded-full py-3 items-center`}
              // onPress={() =>
              //   router.push("/business-provider/(drawer)/(tabs)/chat")
              // }
              onPress={() => handleComlete()}
            >
              <Text style={tw`text-white text-lg font-roboto-600`}>
                Mark as complete
              </Text>
            </TouchableOpacity>
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

export default ProcessViewScreen;
