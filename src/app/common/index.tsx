import BackButton from "@/src/components/ui/BackButton";
import Wrapper from "@/src/components/Wrapper";
import tw from "@/src/lib/tailwind";
import { useGetAllPrivacyPolicyQuery } from "@/src/redux/tncApi/tncApi";
import React from "react";
import { ScrollView, Text, useWindowDimensions, View } from "react-native";
import RenderHTML from "react-native-render-html";

export default function TermsAndConditions() {
  const { data } = useGetAllPrivacyPolicyQuery({ page_type: 'privacy' });
  const { width } = useWindowDimensions();


  return (
    <Wrapper>
      <BackButton title="Back" />
      <View style={tw`flex-1 mt-5`}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-4`} >
          {data?.data?.content ? (
            <View>
              <RenderHTML
                contentWidth={width}
                source={{ html: data?.data?.content }}
              />
            </View>
          ) : (
            <View style={tw`h-full`}>
              <Text
                style={tw`text-center text-3xl font-DegularDisplaySemibold text-gray-200 mt-10`}
              >
                No data available
              </Text>
            </View>
          )}

        </ScrollView>

      </View>
    </Wrapper>
  );
}

